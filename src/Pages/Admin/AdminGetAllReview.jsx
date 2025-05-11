import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../Config/AxiosInstance';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  CircularProgress,
  Alert,
  Chip,
  Divider,
  Stack,
  Paper,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Grid,
  Tooltip
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Star as StarIcon,
  CalendarToday as DateIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  MoreVert as MoreVertIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Restaurant as RestaurantIcon
} from '@mui/icons-material';

export const AdminGetAllReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/admin/allReview');
        setReviews(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleDeleteClick = (review) => {
    setReviewToDelete(review);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axiosInstance.delete(`/admin/ByReview/${reviewToDelete._id}`);
      setReviews(reviews.filter(review => review._id !== reviewToDelete._id));
      setDeleteDialogOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting review");
    }
  };

  const filteredReviews = reviews.filter(review =>
    (review.title && review.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (review.reviewText && review.reviewText.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (review.userId?.name && review.userId.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '50vh'
      }}>
        <CircularProgress size={80} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 3, borderRadius: 2 }}>
        <Typography variant="body1" fontWeight="medium">{error}</Typography>
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', sm: 'center' },
        mb: 4,
        gap: 2
      }}>
        <Typography variant="h4" component="h1" sx={{ 
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5
        }}>
          <StarIcon color="primary" fontSize="large" />
          Customer Reviews
          <Chip 
            label={`${reviews.length} ${reviews.length === 1 ? 'review' : 'reviews'}`} 
            color="primary" 
            size="small" 
            sx={{ ml: 1 }} 
          />
        </Typography>

        <TextField
          size="small"
          placeholder="Search reviews..."
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
          }}
          variant="outlined"
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 250 }}
        />
      </Box>

      {/* Reviews List */}
      {filteredReviews.length === 0 ? (
        <Paper sx={{ 
          p: 6, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          textAlign: 'center',
          minHeight: '40vh',
          bgcolor: 'background.paper',
          borderRadius: 3
        }}>
          <RestaurantIcon sx={{ 
            fontSize: 60, 
            color: 'text.disabled', 
            mb: 2,
            opacity: 0.6
          }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No reviews found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {searchTerm ? 'Try adjusting your search query' : 'No customer reviews available yet'}
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredReviews.map((review) => (
            <Grid item xs={12} key={review._id}>
              <Card sx={{ 
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 24px rgba(0,0,0,0.1)'
                }
              }}>
                <CardContent>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 2
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Avatar sx={{ 
                        bgcolor: 'primary.main', 
                        width: 56, 
                        height: 56,
                        fontSize: '1.5rem'
                      }}>
                        {review.userId?.name?.charAt(0)?.toUpperCase() || <PersonIcon />}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="medium">
                          {review.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {review.userId?.name || 'Anonymous Customer'}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Tooltip title="Delete Review">
                        <IconButton
                          onClick={() => handleDeleteClick(review)}
                          color="error"
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <IconButton size="small">
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating
                      value={review.rating}
                      readOnly
                      precision={0.5}
                      icon={<StarIcon fontSize="inherit" color="primary" />}
                      emptyIcon={<StarIcon fontSize="inherit" />}
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={`${review.rating}/5`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>

                  <Typography variant="body1" paragraph sx={{ 
                    mb: 2,
                    p: 2,
                    bgcolor: 'action.hover',
                    borderRadius: 2,
                    fontStyle: 'italic'
                  }}>
                    "{review.reviewText}"
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        icon={<DateIcon fontSize="small" />}
                        label={new Date(review.createdAt).toLocaleDateString()}
                        size="small"
                        variant="outlined"
                      />
                      <Tooltip title="Review ID">
                        <Chip
                          label={`ID: ${review._id.substring(0, 6)}...`}
                          size="small"
                          variant="outlined"
                        />
                      </Tooltip>
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Helpful">
                        <IconButton size="small" color="success">
                          <ThumbUpIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Not Helpful">
                        <IconButton size="small" color="error">
                          <ThumbDownIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </CardContent>
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
        <DialogTitle sx={{ bgcolor: 'error.light', color: 'error.contrastText' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DeleteIcon />
            Confirm Review Deletion
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <DialogContentText>
            You are about to permanently delete this review by <strong>{reviewToDelete?.userId?.name || 'anonymous'}</strong>.
            This action cannot be undone.
          </DialogContentText>
          {reviewToDelete && (
            <Paper elevation={0} sx={{ 
              p: 2, 
              mt: 2, 
              bgcolor: 'background.default',
              borderRadius: 1
            }}>
              <Typography variant="subtitle2" color="text.secondary">Review Content:</Typography>
              <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                "{reviewToDelete.reviewText}"
              </Typography>
            </Paper>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setDeleteDialogOpen(false)} 
            variant="outlined"
            sx={{ mr: 2 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Delete Permanently
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};