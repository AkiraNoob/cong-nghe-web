"use client";
import { Logout, Settings } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Image from 'next/image';
import React from 'react';
import SearchComponent from './search_component';
const HeaderComponent: React.FC = () => {
  const [auth, setAuth] = React.useState(true);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSearch = (query: String) => {
    // Xử lý logic tìm kiếm dựa trên query
    console.log('Perform search with query:', query);
  };
  return (
    <div className='flex items-center bg-white border-b-2 border-gray-200 sticky top-0 z-20 h-20'>
      <div className='items-center w-1/3 flex ml-10'>
        <Image
          className='rounded-sm'
          src="/images/CodePro.png"
          alt="Mô tả hình ảnh"
          width={50}
          height={50}
        />
        <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              marginLeft: 4
            }}
          >
            CODEPRO
        </Typography>
      </div>
      <div className='w-1/3 hidden md:block'>
        <SearchComponent onSearch={handleSearch}></SearchComponent>
      </div>
      <div className='w-1/3 hidden md:block mr-10'>
        {auth ? (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
            <Tooltip title="Open profile">
              <IconButton onClick={handleClick} sx={{ p: 0, justifyContent: 'flex-end'}}>
                <Avatar alt="Remy Sharp" src="/images/avatar.jpeg" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose}>
                <Avatar /> My account
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ):(
        <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
            <Button color="secondary" variant="outlined" sx={{ textTransform: 'none', marginRight: 3}}>Đăng nhập</Button>
            <Button color="inherit" variant= "outlined" sx={{ textTransform: 'none'}}>Đăng ký</Button>
        </Box>
        )}
      </div>
    </div>
      
  );
};
export default HeaderComponent;

