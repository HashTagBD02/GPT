import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  AccountBalanceWallet,
  TrendingUp,
  Star,
  Assignment,
  Person,
  Refresh,
  MonetizationOn,
  EmojiEvents,
  SportsEsports,
  Poll,
  GetApp,
  PlayArrow,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../context/AuthContext';

interface TaskStats {
  totalTasks: number;
  completedToday: number;
  weeklyEarnings: number;
  pendingTasks: number;
}

interface RecentActivity {
  id: string;
  type: 'task_completed' | 'referral_earned' | 'payment_received' | 'level_up';
  description: string;
  amount?: number;
  timestamp: string;
}

interface QuickTask {
  id: string;
  title: string;
  reward: number;
  type: string;
  timeEstimate: number;
  difficulty: string;
}

const Dashboard: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [taskStats, setTaskStats] = useState<TaskStats>({
    totalTasks: 0,
    completedToday: 0,
    weeklyEarnings: 0,
    pendingTasks: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [quickTasks, setQuickTasks] = useState<QuickTask[]>([]);
  const [loading, setLoading] = useState(false);

  // Sample data for charts
  const weeklyData = [
    { day: 'Mon', earnings: 12.50 },
    { day: 'Tue', earnings: 18.30 },
    { day: 'Wed', earnings: 25.80 },
    { day: 'Thu', earnings: 15.20 },
    { day: 'Fri', earnings: 32.10 },
    { day: 'Sat', earnings: 28.60 },
    { day: 'Sun', earnings: 22.40 },
  ];

  const taskTypeData = [
    { name: 'Surveys', value: 45, color: '#8884d8' },
    { name: 'Games', value: 25, color: '#82ca9d' },
    { name: 'Apps', value: 20, color: '#ffc658' },
    { name: 'Videos', value: 10, color: '#ff7300' },
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // In a real app, these would be separate API calls
      // For now, we'll use mock data
      setTaskStats({
        totalTasks: 156,
        completedToday: 8,
        weeklyEarnings: 154.90,
        pendingTasks: 12,
      });

      setRecentActivity([
        {
          id: '1',
          type: 'task_completed',
          description: 'Completed survey: "Product Feedback"',
          amount: 2.50,
          timestamp: '2024-01-15T10:30:00Z',
        },
        {
          id: '2',
          type: 'referral_earned',
          description: 'Earned referral bonus from user123',
          amount: 5.00,
          timestamp: '2024-01-15T09:15:00Z',
        },
        {
          id: '3',
          type: 'level_up',
          description: 'Reached Level 5!',
          timestamp: '2024-01-14T16:45:00Z',
        },
        {
          id: '4',
          type: 'task_completed',
          description: 'Downloaded and tested app: "Fitness Tracker"',
          amount: 3.75,
          timestamp: '2024-01-14T14:20:00Z',
        },
      ]);

      setQuickTasks([
        {
          id: '1',
          title: 'Quick Survey: Shopping Habits',
          reward: 1.50,
          type: 'survey',
          timeEstimate: 5,
          difficulty: 'easy',
        },
        {
          id: '2',
          title: 'Play Game: Puzzle Quest',
          reward: 2.25,
          type: 'game',
          timeEstimate: 10,
          difficulty: 'easy',
        },
        {
          id: '3',
          title: 'Watch Video: Product Demo',
          reward: 0.75,
          type: 'video',
          timeEstimate: 3,
          difficulty: 'easy',
        },
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'task_completed':
        return <Assignment color="primary" />;
      case 'referral_earned':
        return <Person color="secondary" />;
      case 'payment_received':
        return <MonetizationOn color="success" />;
      case 'level_up':
        return <EmojiEvents color="warning" />;
      default:
        return <Star />;
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'survey':
        return <Poll color="primary" />;
      case 'game':
        return <SportsEsports color="secondary" />;
      case 'app':
        return <GetApp color="info" />;
      case 'video':
        return <PlayArrow color="warning" />;
      default:
        return <Assignment />;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  // Calculate level progress
  const currentLevelEarnings = user ? user.totalEarned % 100 : 0;
  const levelProgress = (currentLevelEarnings / 100) * 100;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.firstName}! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's your earnings overview and available tasks.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Earnings Overview */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Earnings Overview</Typography>
              <IconButton onClick={fetchDashboardData} disabled={loading}>
                <Refresh />
              </IconButton>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={6} md={3}>
                <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccountBalanceWallet sx={{ mr: 1 }} />
                      <Box>
                        <Typography variant="h5">${user?.balance.toFixed(2) || '0.00'}</Typography>
                        <Typography variant="caption">Current Balance</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={6} md={3}>
                <Card sx={{ bgcolor: 'secondary.main', color: 'white' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TrendingUp sx={{ mr: 1 }} />
                      <Box>
                        <Typography variant="h5">${user?.totalEarned.toFixed(2) || '0.00'}</Typography>
                        <Typography variant="caption">Total Earned</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={6} md={3}>
                <Card sx={{ bgcolor: 'warning.main', color: 'white' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <EmojiEvents sx={{ mr: 1 }} />
                      <Box>
                        <Typography variant="h5">{user?.level || 1}</Typography>
                        <Typography variant="caption">Current Level</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={6} md={3}>
                <Card sx={{ bgcolor: 'info.main', color: 'white' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Assignment sx={{ mr: 1 }} />
                      <Box>
                        <Typography variant="h5">{taskStats.completedToday}</Typography>
                        <Typography variant="caption">Tasks Today</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>

          {/* Weekly Earnings Chart */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Weekly Earnings
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`$${value}`, 'Earnings']} />
                <Bar dataKey="earnings" fill="#2196f3" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>

          {/* Task Distribution */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Task Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={taskTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {taskTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Level Progress */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Level Progress
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                {user?.level || 1}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Level {user?.level || 1}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={levelProgress} 
                  sx={{ mt: 1 }}
                />
                <Typography variant="caption" color="text.secondary">
                  ${currentLevelEarnings.toFixed(2)} / $100.00
                </Typography>
              </Box>
            </Box>
            <Typography variant="caption" color="text.secondary">
              ${(100 - currentLevelEarnings).toFixed(2)} until next level
            </Typography>
          </Paper>

          {/* Quick Tasks */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Tasks
            </Typography>
            <List>
              {quickTasks.map((task) => (
                <ListItem key={task.id} sx={{ px: 0 }}>
                  <ListItemIcon>
                    {getTaskIcon(task.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={task.title}
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Chip label={`$${task.reward}`} color="primary" size="small" />
                        <Chip label={`${task.timeEstimate}m`} size="small" />
                        <Chip 
                          label={task.difficulty} 
                          color={task.difficulty === 'easy' ? 'success' : 'warning'} 
                          size="small" 
                        />
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
            <Button variant="contained" fullWidth sx={{ mt: 2 }}>
              View All Tasks
            </Button>
          </Paper>

          {/* Recent Activity */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <List>
              {recentActivity.map((activity) => (
                <ListItem key={activity.id} sx={{ px: 0 }}>
                  <ListItemIcon>
                    {getActivityIcon(activity.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.description}
                    secondary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" color="text.secondary">
                          {formatTimeAgo(activity.timestamp)}
                        </Typography>
                        {activity.amount && (
                          <Chip 
                            label={`+$${activity.amount}`} 
                            color="success" 
                            size="small" 
                          />
                        )}
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;