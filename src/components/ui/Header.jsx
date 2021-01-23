import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { AppBar, Button, IconButton, List, ListItem, ListItemText, Menu, MenuItem, SwipeableDrawer, Tab, Tabs, Toolbar, useMediaQuery, useTheme } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },

  tab: {
    // width : "100vh",
    marginLeft: "auto",
  },
  tabButton: {
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 0,
  },
  menu: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    borderRadius: "0px"
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1
    }
  },
  drawer :{
    padding :100
  },

}));

export default function Header() {
  const [routeValue, setRouteValue] = React.useState(0);
  const [activeIndex, setActiveIndex] = React.useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(false);

  const theme = useTheme()

  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const classes = useStyles();




  const handleRouteChange = (e, newValue) => {
    setRouteValue(newValue);
  };

  const handleMenuClose = e => {
    setAnchorEl(null);
    setOpenMenu(false);
  };
  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i);
  };
  const handleMenuOpen = e => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
    console.log(e)
  }

  const routes = [
    { name: "Home", link: "/", activeIndex: 0 },
    { name: "Service", link: "/service", activeIndex: 1 ,
    mouseOver: event => handleMenuOpen(event)
  },
    { name: "About", link: "/about", activeIndex: 2 },
  ];

  const menuOptions = [
    { name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0 },
    {
      name: "Custom Software Development",
      link: "/customsoftware",
      activeIndex: 1,
      selectedIndex: 1
    },
    {
      name: "iOS/Android App Development",
      link: "/mobileapps",
      activeIndex: 1,
      selectedIndex: 2
    },
    {
      name: "Website Development",
      link: "/websites",
      activeIndex: 1,
      selectedIndex: 3
    },
   
  ];

  const tabs =(
    <>
      <Tabs
            className={classes.tab}
            value={routeValue}
            onChange={handleRouteChange}
          >
            {routes.map((route, i) => (
              <Tab
                component={Link}
                label={route.name}
                key={`${route.name}`}
                to={route.link}
                onMouseOver  = {route.mouseOver}
              />
            ))}

            <Button className={classes.tabButton} variant="contained">
              hey
            </Button>
            <Menu id = 'simple-menu'
            anchorEl = {anchorEl}
            open ={openMenu}
            onClose = {handleMenuClose}
            MenuListProps = {{
              onMouseLeave : handleMenuClose
            }}
            classes = {{paper :classes.menu}}
            elevation = {0}
            >
              {menuOptions.map((option, i) => (
                <MenuItem
                key={`${option}${i}`}
                className = {classes.menuItem}
                component = {Link}
                to = {option.link}
                onClick = {event => {
                  handleMenuItemClick(event , i);
                  setRouteValue(1);
                  handleMenuClose();
                }}
                selected = {i === selectedIndex && routeValue === 1 }
                >
                  {option.name}
                </MenuItem>
              ))}
            </Menu>
          </Tabs>
    </>
  )
  const drawer = (
    <>
    <SwipeableDrawer
    open ={openDrawer}
    onOpen = {() => setOpenDrawer(true)}
    onClose = { () => setOpenDrawer(false)}
    classes = {{paper : classes.drawerPaper}}
    className = {classes.drawer}
    >
      <div className = {classes.toolbarMargin}></div>
     <List disablePadding
     
     >
       {routes.map((route , i) => (
          <ListItem
          key = {`${route}`}
          divider
          button
          component = {Link}
          
          to = {route.link}
          onClick = {() => {setOpenDrawer(false); setRouteValue(route.activeIndex)}}
         
          >
          <ListItemText disableTypography>
           {route.name}
          </ListItemText>
          </ListItem>
       ))}
     
     </List>
     
    </SwipeableDrawer>
      <IconButton
      style = {{marginLeft : "auto"}}
      className={classes.drawerIconContainer}
      onClick={() => setOpenDrawer(!openDrawer)}
      disableRipple
    >
     X
    </IconButton>
    </>
  )

  return (
    <>
      <AppBar>
        <Toolbar disableGutters>
      {matches ? drawer : tabs}
       
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </>
  );
}
