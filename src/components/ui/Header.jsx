import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { AppBar, Button, Menu, MenuItem, Tab, Tabs, Toolbar } from "@material-ui/core";
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
}));

export default function Header() {
  const [routeValue, setRouteValue] = React.useState(0);
  const [activeIndex, setActiveIndex] = React.useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(false);
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
    }
  ];

  return (
    <>
      <AppBar>
        <Toolbar disableGutters>
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
            elevation = {0}
            >
              {menuOptions.map((option, i) => (
                <MenuItem
                key={`${option}${i}`}
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
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </>
  );
}
