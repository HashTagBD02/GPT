const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['survey', 'game', 'app', 'video', 'offer', 'social', 'signup']
  },
  category: {
    type: String,
    required: true,
    enum: ['entertainment', 'finance', 'shopping', 'social', 'productivity', 'education', 'health', 'travel']
  },
  reward: {
    type: Number,
    required: true,
    min: 0.01
  },
  currency: {
    type: String,
    default: 'USD',
    enum: ['USD', 'EUR', 'GBP', 'BTC', 'ETH']
  },
  timeEstimate: {
    type: Number, // in minutes
    required: true,
    min: 1
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy'
  },
  requirements: {
    minLevel: {
      type: Number,
      default: 1
    },
    countries: [{
      type: String // ISO country codes
    }],
    ageMin: {
      type: Number,
      default: 13
    },
    ageMax: {
      type: Number,
      default: 99
    },
    deviceType: [{
      type: String,
      enum: ['desktop', 'mobile', 'tablet']
    }],
    previousTasks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    }]
  },
  provider: {
    name: {
      type: String,
      required: true
    },
    apiEndpoint: {
      type: String
    },
    credentials: {
      type: Object,
      default: {}
    }
  },
  content: {
    url: {
      type: String
    },
    instructions: {
      type: String
    },
    questions: [{
      question: String,
      type: {
        type: String,
        enum: ['text', 'multiple_choice', 'rating', 'boolean']
      },
      options: [String],
      required: {
        type: Boolean,
        default: true
      }
    }],
    media: [{
      type: {
        type: String,
        enum: ['image', 'video', 'audio']
      },
      url: String,
      duration: Number // in seconds for video/audio
    }]
  },
  limits: {
    maxCompletions: {
      type: Number,
      default: null // null means unlimited
    },
    currentCompletions: {
      type: Number,
      default: 0
    },
    maxCompletionsPerUser: {
      type: Number,
      default: 1
    },
    cooldownPeriod: {
      type: Number, // in hours
      default: 0
    }
  },
  status: {
    type: String,
    enum: ['active', 'paused', 'expired', 'completed'],
    default: 'active'
  },
  featured: {
    type: Boolean,
    default: false
  },
  priority: {
    type: Number,
    default: 0 // higher numbers = higher priority
  },
  tags: [{
    type: String,
    trim: true
  }],
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  stats: {
    views: {
      type: Number,
      default: 0
    },
    starts: {
      type: Number,
      default: 0
    },
    completions: {
      type: Number,
      default: 0
    },
    completionRate: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0
    },
    totalRatings: {
      type: Number,
      default: 0
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Indexes
taskSchema.index({ type: 1 });
taskSchema.index({ category: 1 });
taskSchema.index({ status: 1 });
taskSchema.index({ featured: 1 });
taskSchema.index({ priority: -1 });
taskSchema.index({ reward: -1 });
taskSchema.index({ 'requirements.countries': 1 });
taskSchema.index({ startDate: 1, endDate: 1 });

// Virtual for isActive
taskSchema.virtual('isActive').get(function() {
  const now = new Date();
  return this.status === 'active' && 
         (!this.endDate || this.endDate > now) &&
         (!this.limits.maxCompletions || this.limits.currentCompletions < this.limits.maxCompletions);
});

// Method to check if user can complete task
taskSchema.methods.canUserComplete = function(user) {
  // Check level requirement
  if (user.level < this.requirements.minLevel) {
    return { canComplete: false, reason: 'Level requirement not met' };
  }

  // Check country requirement
  if (this.requirements.countries.length > 0 && !this.requirements.countries.includes(user.country)) {
    return { canComplete: false, reason: 'Country not supported' };
  }

  // Check age requirement
  if (user.dateOfBirth) {
    const age = Math.floor((Date.now() - user.dateOfBirth.getTime()) / (1000 * 60 * 60 * 24 * 365));
    if (age < this.requirements.ageMin || age > this.requirements.ageMax) {
      return { canComplete: false, reason: 'Age requirement not met' };
    }
  }

  // Check if task is active
  if (!this.isActive) {
    return { canComplete: false, reason: 'Task is not active' };
  }

  return { canComplete: true };
};

// Method to increment completion stats
taskSchema.methods.incrementCompletion = function() {
  this.stats.completions += 1;
  this.limits.currentCompletions += 1;
  this.stats.completionRate = (this.stats.completions / this.stats.starts) * 100;
  return this.save();
};

// Method to increment start stats
taskSchema.methods.incrementStart = function() {
  this.stats.starts += 1;
  this.stats.completionRate = (this.stats.completions / this.stats.starts) * 100;
  return this.save();
};

// Method to add rating
taskSchema.methods.addRating = function(rating) {
  const totalScore = this.stats.averageRating * this.stats.totalRatings;
  this.stats.totalRatings += 1;
  this.stats.averageRating = (totalScore + rating) / this.stats.totalRatings;
  return this.save();
};

module.exports = mongoose.model('Task', taskSchema);