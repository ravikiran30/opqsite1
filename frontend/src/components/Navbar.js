import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem, IconButton, Box, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../images/opq-logo.png';
import { Link } from 'react-router-dom';

const menuItems = [
  {
    title: 'Home',
    link: '/'
  },
  {
    title: 'About Us',
    link: '/aboutus'
  },
  {
    title: 'Courses',
    link:'/courses'
    // submenu: [
    //   {
    //     title: 'Full Stack Developer Course',
    //     link: '/courses/2'
    //   },
    //   {
    //     title: 'DevOps Bootcamp',
    //     link: '/courses/1'
    //   }
      // {
      //   title: 'AWS Cloud Practitioner',
      //   link: '/courses/3'
      // }
    // ]
  },
  // {
  //   title: 'Workshop',
  //   link: '/workshop'
  // },
  {
    title: 'Blogs',
    link: '/blog'
  },
  {
    title: 'Contact',
    submenu: [
      {
        title: 'Contact Us',
        link: '/contact/contactus'
      },
      {
        title: 'FAQs',
        link: '/contact/faqs'
      }
    ]
  }
];

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentSubmenu, setCurrentSubmenu] = useState(null);

  const handleMenuOpen = (event, submenu = null) => {
    setAnchorEl(event.currentTarget);
    setCurrentSubmenu(submenu);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentSubmenu(null);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <AppBar position='sticky' sx={{ background:'#ffffff', color:'#000000' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <IconButton size='large' aria-label='logo' component={Link} to='/' sx={{ padding: 0 }}>
            <img src={logo} alt="logo" style={{ width: 250, height: 50 }} />
          </IconButton>
        </Box>

        {/* For mobile view */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton onClick={handleDrawerOpen} color='inherit'>
            <MenuIcon />
          </IconButton>
          <Drawer anchor='left' open={drawerOpen} onClose={handleDrawerClose}>
            <List>
              {menuItems.map((item, index) => (
                <div key={index}>
                  {item.submenu ? (
                    <ListItemButton onClick={(event) => handleMenuOpen(event, item.submenu)}>
                      <ListItemText primary={item.title} />
                      <ExpandMoreIcon />
                    </ListItemButton>
                  ) : (
                    <ListItemButton component={Link} to={item.link} onClick={handleDrawerClose}>
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  )}
                  {item.submenu && (
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl && currentSubmenu === item.submenu)}
                      onClose={handleMenuClose}
                      MenuListProps={{ onMouseLeave: handleMenuClose }}
                    >
                      {item.submenu.map((subItem, subIndex) => (
                        <MenuItem key={subIndex} component={Link} to={subItem.link} onClick={handleMenuClose}>
                          {subItem.title}
                        </MenuItem>
                      ))}
                    </Menu>
                  )}
                </div>
              ))}
              <ListItemButton component={Link} to='/login' onClick={handleDrawerClose}>
                <ListItemText primary='Login' />
              </ListItemButton>
            </List>
          </Drawer>
        </Box>

        {/* For desktop view */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, spaceX: 4 }}>
          {menuItems.map((item, index) => (
            <div key={index} onMouseLeave={handleMenuClose}>
              <Button
                color="inherit"
                component={item.submenu ? 'div' : Link}
                to={item.submenu ? null : item.link}
                onMouseEnter={(event) => handleMenuOpen(event, item.submenu)}
                endIcon={item.submenu ? <ExpandMoreIcon /> : null}
              >
                {item.title}
              </Button>
              {item.submenu && (
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl && currentSubmenu === item.submenu)}
                  onClose={handleMenuClose}
                  MenuListProps={{ onMouseLeave: handleMenuClose }}
                >
                  {item.submenu.map((subItem, subIndex) => (
                    <MenuItem key={subIndex} component={Link} to={subItem.link} onClick={handleMenuClose}>
                      {subItem.title}
                    </MenuItem>
                  ))}
                </Menu>
              )}
            </div>
          ))}
          {/* <Button variant="contained" component={Link} to='/login'>
            Login
          </Button> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
