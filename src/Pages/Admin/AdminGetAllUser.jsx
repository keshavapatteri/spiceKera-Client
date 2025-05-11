
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../Config/AxiosInstance';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Skeleton,
  Box,
  Chip,
  TextField,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as AddressIcon,
  Person as PersonIcon
} from '@mui/icons-material';

export const AdminGetAllUser = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/admin/AllUser");
      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    (user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.email?.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4 
      }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          User Management
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search users..."
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
            }}
            variant="outlined"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Tooltip title="Refresh">
            <IconButton onClick={fetchUsers}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {error && (
        <Box sx={{ 
          backgroundColor: 'error.light', 
          color: 'error.contrastText', 
          p: 2, 
          mb: 3, 
          borderRadius: 1 
        }}>
          {error}
        </Box>
      )}

      {loading ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
          {[...Array(6)].map((_, index) => (
            <Card key={index}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Box sx={{ ml: 2 }}>
                    <Skeleton variant="text" width={120} />
                    <Skeleton variant="text" width={180} />
                  </Box>
                </Box>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : filteredUsers.length > 0 ? (
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: 3 
        }}>
          {filteredUsers.map((user) => (
            <Card key={user._id} elevation={3}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                }
                title={user.name}
                subheader={
                  <Chip 
                    size="small" 
                    label="Active" 
                    color="success" 
                    sx={{ mt: 0.5 }} 
                  />
                }
              />
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <EmailIcon color="action" sx={{ mr: 1.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
                {user.phonenumber && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <PhoneIcon color="action" sx={{ mr: 1.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {user.phonenumber}
                    </Typography>
                  </Box>
                )}
                {user.address && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AddressIcon color="action" sx={{ mr: 1.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {user.address}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '50vh',
          textAlign: 'center'
        }}>
          <PersonIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No users found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            {searchTerm ? 'Try a different search term' : 'No users in the system yet'}
          </Typography>
        </Box>
      )}
    </Box>
  );
};