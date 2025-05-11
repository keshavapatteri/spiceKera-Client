import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../Config/AxiosInstance';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Chip, 
  Divider, 
  Grid, 
  Paper, 
  CircularProgress,
  Alert,
  Stack,
  Breadcrumbs,
  Link,
  Container
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Delete,
  CalendarToday,
  Update,
  Category,
  Description,
  AttachMoney,
  LocalOffer,
  Image
} from '@mui/icons-material';

export const AdminProductGetById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/admin/getProductById/${id}`);
        setProduct(response.data.data);
      } catch (error) {
      
        setError(error.response?.data?.message || 'Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

 
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} variant="outlined">
          Go Back
        </Button>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>Product not found</Typography>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} variant="outlined">
          Go Back
        </Button>
      </Container>
    );
  }

  return (

    <Container maxWidth="lg" sx={{ py: 4 }} className='min-h-screen'>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2 }}
          variant="text"
        >
          Back to Products
        </Button>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link 
            underline="hover" 
            color="inherit" 
            onClick={() => navigate('/admin/products')}
            sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
          >
            Products
          </Link>
          <Typography color="text.primary">{product.title}</Typography>
        </Breadcrumbs>
        <Typography variant="h4" component="h1" fontWeight={600}>
          Product Details
        </Typography>
      </Box>

      {/* Main Content */}
      <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
        <Grid container>
          {/* Image Column */}
          <Grid item xs={12} md={5} sx={{ borderRight: { md: '1px solid' }, borderColor: { md: 'divider' } }}>
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              {product.image ? (
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.title}
                  sx={{ 
                    maxHeight: 400,
                    width: '100%',
                    objectFit: 'contain',
                    borderRadius: 1
                  }}
                />
              ) : (
                <Paper
                  elevation={0}
                  sx={{
                    height: 300,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'background.default'
                  }}
                >
                  <Image color="disabled" sx={{ fontSize: 60, mb: 2 }} />
                  <Typography color="text.secondary">No image available</Typography>
                </Paper>
              )}
            </Box>
          </Grid>

          {/* Details Column */}
          <Grid item xs={12} md={7}>
            <CardContent sx={{ p: 4 }}>
              {/* Product Title and Category */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" component="h2" fontWeight={600} gutterBottom>
                  {product.title}
                </Typography>
                <Chip
                  icon={<Category fontSize="small" />}
                  label={product.category}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              </Box>

              {/* Pricing Information */}
              <Box sx={{ mb: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="h6" color="primary.main" fontWeight={600}>
                    ₹{product.price}
                  </Typography>
                  {product.mrp && product.mrp > product.price && (
                    <>
                      <Typography variant="body1" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                        ₹{product.mrp}
                      </Typography>
                      <Chip 
                        label={`${Math.round(100 - (product.price / product.mrp * 100))}% OFF`} 
                        color="error" 
                        size="small"
                      />
                    </>
                  )}
                </Stack>
              </Box>

              {/* Description */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Description
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {product.description}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Meta Information */}
              <Grid container spacing={2} sx={{ mb: 15 }}>
                <Grid item xs={12} sm={6}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <CalendarToday color="action" fontSize="small" />
                      <Typography variant="subtitle2" color="text.secondary">
                        Created Date
                      </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {new Date(product.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Update color="action" fontSize="small" />
                      <Typography variant="subtitle2" color="text.secondary">
                        Last Updated
                      </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {new Date(product.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

             
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};