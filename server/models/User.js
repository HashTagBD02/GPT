const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    default: ''
  },
  balance: {
    type: Number,
    default: 0,
    min: 0
  },
  totalEarned: {
    type: Number,
    default: 0,
    min: 0
  },
  level: {
    type: Number,
    default: 1,
    min: 1
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  referralCode: {
    type: String,
    unique: true,
    sparse: true
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  referralEarnings: {
    type: Number,
    default: 0
  },
  country: {
    type: String,
    default: ''
  },
  dateOfBirth: {
    type: Date
  },
  phoneNumber: {
    type: String,
    default: ''
  },
  paymentMethods: [{
    type: {
      type: String,
      enum: ['paypal', 'crypto', 'giftcard'],
      required: true
    },
    address: {
      type: String,
      required: true
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  }],
  preferences: {
    notifications: {
      email: { type: Boolean, default: true },
      browser: { type: Boolean, default: true }
    },
    taskTypes: [{
      type: String,
      enum: ['surveys', 'games', 'apps', 'videos', 'offers']
    }]
  },
  stats: {
    tasksCompleted: { type: Number, default: 0 },
    surveysCompleted: { type: Number, default: 0 },
    gamesPlayed: { type: Number, default: 0 },
    appsDownloaded: { type: Number, default: 0 },
    videosWatched: { type: Number, default: 0 },
    offersCompleted: { type: Number, default: 0 },
    loginStreak: { type: Number, default: 0 },
    lastLoginDate: { type: Date }
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ referralCode: 1 });
userSchema.index({ isActive: 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Generate referral code before saving
userSchema.pre('save', function(next) {
  if (!this.referralCode) {
    this.referralCode = this.username.toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase();
  }
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Add earnings method
userSchema.methods.addEarnings = function(amount) {
  this.balance += amount;
  this.totalEarned += amount;
  
  // Level up logic (every $100 earned)
  const newLevel = Math.floor(this.totalEarned / 100) + 1;
  if (newLevel > this.level) {
    this.level = newLevel;
  }
  
  return this.save();
};

// Remove sensitive data when converting to JSON
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);