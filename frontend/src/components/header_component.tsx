'use client';
import { Logout } from '@mui/icons-material';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import { EUserRole } from '~/constant/enum/user.enum';
import routePath from '~/constant/routePath';
import { userContext } from '~/context/UserContext';
import useLogout from '~/hooks/auth/useLogout';
import SearchComponent from './search_component';

const HeaderComponent = () => {
  const { isLogin: auth, data } = useContext(userContext);
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { mutate } = useLogout();
  const handleLogout = () => {
    mutate();
    handleClose();
  };

  return (
    <div className="flex items-center bg-white border-b-2 border-gray-200 sticky top-0 z-20 h-20">
      <div className="w-1/6 sm:ml-10 ml-3 sm:w-1/3">
        <Link className="items-center flex w-fit" href={'/'}>
          <Image src={'/images/CodePro.png'} width={40} height={40} alt="Logo" className="rounded-full" />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              marginLeft: 4,
            }}
          >
            CODEPRO
          </Typography>
        </Link>
      </div>
      <div className="w-4/6 sm:w-1/3">
        <SearchComponent></SearchComponent>
      </div>
      <div className="w-1/6 sm:mr-10 mr-0.5 sm:w-1/3">
        {auth ? (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip title="Open profile">
              <IconButton onClick={handleClick} sx={{ p: 0, justifyContent: 'flex-end' }}>
                <Avatar alt="Remy Sharp" src={data ? data.avatar : '/images/avatar.jpeg'} />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
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
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem
                onClick={() => {
                  router.push(routePath.EDIT);
                  handleClose();
                }}
              >
                <Avatar /> Tài khoản của tôi
              </MenuItem>
              {data?.role === EUserRole.Admin && (
                <MenuItem onClick={() => router.push(routePath.COURSE_STATISTIC)}>
                  <ListItemIcon>
                    <AnalyticsOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  Thống kê
                </MenuItem>
              )}
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Đăng xuất
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <div>
            <div className="hidden sm:block">
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link href="/login" className="font-medium hover:underline ">
                  <Button color="secondary" variant="outlined" sx={{ textTransform: 'none', marginRight: 3 }}>
                    Đăng nhập
                  </Button>
                </Link>
                <Link href="/register" className="font-medium hover:underline ">
                  <Button color="inherit" variant="outlined" sx={{ textTransform: 'none' }}>
                    Đăng ký
                  </Button>
                </Link>
              </Box>
            </div>
            <div className="block md:hidden">
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  slotProps={{
                    paper: {
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
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <Link href="/register" className="font-medium hover:underline ">
                    <MenuItem onClick={handleClose}>Đăng ký</MenuItem>
                  </Link>
                  <Link href="/login" className="font-medium hover:underline ">
                    <MenuItem onClick={handleClose}>Đăng nhập</MenuItem>
                  </Link>
                </Menu>
              </Box>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default HeaderComponent;
