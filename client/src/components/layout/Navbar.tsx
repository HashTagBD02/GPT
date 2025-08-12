import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Badge,
  Chip,
  Divider,
  ListItemIcon,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  AccountCircle,
  Dashboard,
  Assignment,
  Person,
  Payment,
  Logout,
  MonetizationOn,
  Menu as MenuIcon,
  Close,
  Star,
  Group,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <Dashboard /> },
    { label: 'Tasks', path: '/tasks', icon: <Assignment /> },
    { label: 'Referrals', path: '/referrals', icon: <Group /> },
    { label: 'Payments', path: '/payments', icon: <Payment /> },
  ];

  const isCurrentPath = (path: string) => location.pathname === path;

  // Don't show navbar on landing, login, and register pages for non-authenticated users
  if (!user && ['/', '/login', '/register'].includes(location.pathname)) {
    return null;
  }

  const userMenuItems = [
    {
      label: 'Profile',
      icon: <Person />,
      onClick: () => {
        handleMenuClose();
        navigate('/profile');
      },
    },
    {
      label: 'Payments',
      icon: <Payment />,
      onClick: () => {
        handleMenuClose();
        navigate('/payments');
      },
    },
    { type: 'divider' },
    {
      label: 'Logout',
      icon: <Logout />,
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {/* Logo/Brand */}
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              flexGrow: 1, 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
            onClick={() => navigate(user ? '/dashboard' : '/')}
          >
            <MonetizationOn />
            RewardHub
          </Typography>

          {user ? (
            <>
              {/* Desktop Navigation */}
              {!isMobile && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 3 }}>
                  {navigationItems.map((item) => (
                    <Button
                      key={item.path}
                      color={isCurrentPath(item.path) ? 'secondary' : 'inherit'}
                      startIcon={item.icon}
                      onClick={() => navigate(item.path)}
                      sx={{
                        fontWeight: isCurrentPath(item.path) ? 'bold' : 'normal',
                      }}
                    >
                      {item.label}
                    </Button>
                  ))}
                </Box>
              )}

              {/* User Balance */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 2 }}>
                <Chip
                  icon={<MonetizationOn />}
                  label={`$${user.balance.toFixed(2)}`}
                  color="secondary"
                  variant="filled"
                />
                <Badge badgeContent={user.level} color="warning">
                  <Star color="action" />
                </Badge>
              </Box>

              {/* Mobile Menu Button */}
              {isMobile && (
                <IconButton
                  color="inherit"
                  onClick={() => setMobileMenuOpen(true)}
                  sx={{ mr: 1 }}
                >
                  <MenuIcon />
                </IconButton>
              )}

              {/* User Avatar & Menu */}
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar 
                  src={user.avatar} 
                  alt={user.firstName}
                  sx={{ width: 32, height: 32 }}
                >
                  {user.firstName[0].toUpperCase()}
                </Avatar>
              </IconButton>
            </>
          ) : (
            <>
              {/* Guest Navigation */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button color="inherit" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button 
                  variant="outlined" 
                  color="inherit" 
                  onClick={() => navigate('/register')}
                >
                  Sign Up
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            @{user?.username}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Chip 
              label={`Level ${user?.level}`} 
              size="small" 
              color="primary" 
            />
          </Box>
        </Box>
        <Divider />
        {userMenuItems.map((item, index) => 
          item.type === 'divider' ? (
            <Divider key={`divider-${index}`} />
          ) : (
            <MenuItem key={item.label} onClick={item.onClick}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {item.label}
            </MenuItem>
          )
        )}
      </Menu>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
            mt: 8,
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Menu</Typography>
          <IconButton onClick={() => setMobileMenuOpen(false)}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {navigationItems.map((item) => (
            <ListItem 
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{ 
                cursor: 'pointer',
                bgcolor: isCurrentPath(item.path) ? 'action.selected' : 'transparent',
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText 
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: isCurrentPath(item.path) ? 'bold' : 'normal',
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;