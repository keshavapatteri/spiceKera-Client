import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../Config/AxiosInstance';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Divider,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Restaurant as RestaurantIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Schedule as ScheduleIcon,
  ArrowBack as BackIcon,
  Edit as EditIcon,
  Star as StarIcon
} from '@mui/icons-material';

export const AdminRestaurantGetById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/admin/RestuarantById/${id}`);
        setRestaurant(response.data.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching restaurant data');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!restaurant) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <RestaurantIcon sx={{ fontSize: 60, color: 'text.disabled' }} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          No restaurant found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Button
        startIcon={<BackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back to Restaurants
      </Button>

      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'primary.main',
                mr: 3,
                fontSize: '2rem'
              }}
            >
              {restaurant.restaurantname.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1">
                {restaurant.restaurantname}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Chip
                  label="Active"
                  color="success"
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  ID: {restaurant._id}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  Basic Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <LocationIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Address"
                      secondary={restaurant.address || "Not specified"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PhoneIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Phone Number"
                      secondary={restaurant.phonenumber || "Not specified"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary={restaurant.email || "Not specified"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <ScheduleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Working Hours"
                      secondary={restaurant.workingtime || "Not specified"}
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  Additional Details
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Cuisine Type
                    </Typography>
                    <Typography>
                      {restaurant.cuisineType || "Not specified"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Average Rating
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <StarIcon color="warning" sx={{ mr: 0.5 }} />
                      <Typography>
                        {restaurant.averageRating || "Not rated yet"}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Description
                    </Typography>
                    <Typography>
                      {restaurant.description || "No description available"}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

    </Box>
  );
};