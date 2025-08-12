import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  MonetizationOn,
  Assignment,
  SportsEsports,
  Poll,
  GetApp,
  PlayArrow,
  Star,
  TrendingUp,
  Security,
  Speed,
  Group,
  CheckCircle,
} from '@mui/icons-material';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Assignment color="primary" />,
      title: 'Complete Surveys',
      description: 'Share your opinions and get paid for market research surveys.',
      reward: '$0.50 - $5.00',
    },
    {
      icon: <SportsEsports color="secondary" />,
      title: 'Play Games',
      description: 'Enjoy fun mobile games and earn rewards while playing.',
      reward: '$1.00 - $10.00',
    },
    {
      icon: <GetApp color="info" />,
      title: 'Download Apps',
      description: 'Try new apps and services to earn instant rewards.',
      reward: '$0.25 - $3.00',
    },
    {
      icon: <PlayArrow color="warning" />,
      title: 'Watch Videos',
      description: 'Watch short videos and advertisements to earn points.',
      reward: '$0.10 - $1.00',
    },
  ];

  const benefits = [
    {
      icon: <MonetizationOn />,
      title: 'Multiple Payment Options',
      description: 'PayPal, Bitcoin, gift cards, and more',
    },
    {
      icon: <Security />,
      title: 'Secure & Trusted',
      description: 'SSL encrypted and verified by thousands of users',
    },
    {
      icon: <Speed />,
      title: 'Fast Payouts',
      description: 'Low minimum payout threshold starting at $0.50',
    },
    {
      icon: <Group />,
      title: 'Referral Program',
      description: 'Earn $5 for every friend you refer',
    },
  ];

  const stats = [
    { label: 'Active Users', value: '100K+' },
    { label: 'Total Paid Out', value: '$2.5M+' },
    { label: 'Available Tasks', value: '1000+' },
    { label: 'Countries Supported', value: '50+' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      avatar: 'S',
      rating: 5,
      text: 'I\'ve earned over $500 in just 3 months! The tasks are easy and payments are always on time.',
      location: 'United States',
    },
    {
      name: 'Mike Chen',
      avatar: 'M',
      rating: 5,
      text: 'Great platform for earning extra income. The variety of tasks keeps it interesting.',
      location: 'Canada',
    },
    {
      name: 'Emma Wilson',
      avatar: 'E',
      rating: 5,
      text: 'Perfect for students! I earn enough to cover my coffee expenses and more.',
      location: 'United Kingdom',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 12,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                Earn Money Online with Simple Tasks
              </Typography>
              <Typography variant="h5" paragraph>
                Complete surveys, play games, watch videos, and download apps to earn real money.
                Join thousands of users earning extra income daily!
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{ px: 4 }}
                >
                  Start Earning Now
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Button>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip label="$0.50 minimum payout" color="secondary" />
                <Chip label="Instant payments" variant="outlined" />
                <Chip label="No fees" variant="outlined" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 3,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  💰 Earning Potential
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: 'secondary.main' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="$10-50 per day for active users"
                      secondary="Complete 10-20 tasks daily"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: 'secondary.main' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="$5 referral bonus"
                      secondary="For each friend you invite"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: 'secondary.main' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Level up rewards"
                      secondary="Unlock higher paying tasks"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 6, bgcolor: 'grey.50' }}>
        <Container>
          <Grid container spacing={4} textAlign="center">
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Typography variant="h3" color="primary" fontWeight="bold">
                  {stat.value}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {stat.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" textAlign="center" gutterBottom>
          How It Works
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" paragraph>
          Choose from various types of tasks and start earning immediately
        </Typography>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                <CardContent>
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: 'transparent',
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {feature.description}
                  </Typography>
                  <Chip
                    label={feature.reward}
                    color="primary"
                    variant="outlined"
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container>
          <Typography variant="h3" textAlign="center" gutterBottom>
            Why Choose RewardHub?
          </Typography>
          
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: 'primary.main',
                    }}
                  >
                    {benefit.icon}
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" textAlign="center" gutterBottom>
          What Our Users Say
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%', p: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{testimonial.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {testimonial.location}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} sx={{ color: 'warning.main' }} />
                    ))}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    "{testimonial.text}"
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container textAlign="center">
          <Typography variant="h3" gutterBottom>
            Ready to Start Earning?
          </Typography>
          <Typography variant="h6" paragraph>
            Join thousands of users and start earning money today!
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/register')}
            sx={{ px: 6, py: 2, fontSize: '1.2rem' }}
          >
            Create Free Account
          </Button>
          <Typography variant="body2" sx={{ mt: 2, opacity: 0.8 }}>
            No credit card required • Free to join • Start earning immediately
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;