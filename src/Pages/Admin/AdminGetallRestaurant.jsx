import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../Config/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Chip,
  TextField,
  Grid,
  Alert,
  Divider,
  Stack,
  Paper,
  CardActions,
  Tooltip
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Restaurant as RestaurantIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Schedule as ScheduleIcon,
  LocationOn as LocationIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Visibility as VisibilityIcon,
  Star as StarIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';

export const AdminGetallRestaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/admin/allRestaurant');
      setRestaurants(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch restaurants");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (restaurant) => {
    setRestaurantToDelete(restaurant);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axiosInstance.delete(`/admin/restaurant/${restaurantToDelete._id}`);
      setRestaurants(prev => prev.filter(r => r._id !== restaurantToDelete._id));
      setDeleteDialogOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete restaurant");
    }
  };

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.restaurantname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Restaurant Management
          <Chip 
            label={`${restaurants.length} ${restaurants.length === 1 ? 'restaurant' : 'restaurants'}`} 
            color="primary" 
            size="small" 
            sx={{ ml: 2, fontSize: '0.8rem' }} 
          />
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            size="small"
            placeholder="Search restaurants..."
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
            }}
            variant="outlined"
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ minWidth: 250 }}
          />
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={fetchRestaurants}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Refresh Data
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate('/admin/add-restaurant')}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Add Restaurant
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress size={60} />
        </Box>
      ) : filteredRestaurants.length === 0 ? (
        <Paper sx={{ 
          p: 6, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          textAlign: 'center',
          minHeight: '50vh'
        }}>
          <RestaurantIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No restaurants found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {searchTerm ? 'Try adjusting your search query' : 'Add your first restaurant to get started'}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/admin/add-restaurant')}
            startIcon={<RestaurantIcon />}
          >
            Add Restaurant
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredRestaurants.map((rest) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={rest._id}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                }
              }}>
                <CardHeader
                  avatar={
                    <Avatar 
                      sx={{ 
                        bgcolor: 'primary.main',
                        width: 48,
                        height: 48,
                        fontSize: '1.2rem'
                      }}
                    >
                      {rest.restaurantname.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  title={
                    <Typography variant="h6" noWrap>
                      {rest.restaurantname}
                    </Typography>
                  }
                  subheader={
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      <Chip 
                        label="Verified" 
                        size="small" 
                        color="success"
                        icon={<StarIcon fontSize="small" />}
                      />
                    </Stack>
                  }
                  action={
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  }
                  sx={{ pb: 1 }}
                />
                <CardContent sx={{ flexGrow: 1, pt: 0 }}>
                  <Stack spacing={1.5}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <LocationIcon color="action" sx={{ mt: 0.5, mr: 1.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        {rest.address || "Address not specified"}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PhoneIcon color="action" sx={{ mr: 1.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        {rest.phonenumber || "Phone not provided"}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <EmailIcon color="action" sx={{ mr: 1.5 }} />
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {rest.email || "Email not provided"}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ScheduleIcon color="action" sx={{ mr: 1.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        {rest.workingtime || "Hours not specified"}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                  <Tooltip title="View Details">
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/byIdRestaurant/${rest._id}`)}
                      color="primary"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Box>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/admin/restaurant/edit/${rest._id}`)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(rest)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Restaurant Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to permanently delete <strong>{restaurantToDelete?.restaurantname}</strong>. 
            This will remove all associated data including menu items and reviews. 
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteDialogOpen(false)} 
            color="inherit"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error"
            startIcon={<DeleteIcon />}
            variant="contained"
          >
            Delete Permanently
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};