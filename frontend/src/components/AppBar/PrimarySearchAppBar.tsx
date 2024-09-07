"use client";
import { Box, AppBar, Toolbar } from "@mui/material";
import React from "react";
import CustomDrawer from "@src/components/Drawer/SideBar";
import AppBarContent from "./AppBarContent";
import MobileMenu from "./MobileMenu";
import ProfileMenu from "./ProfileMenu";
import theme from "@src/theme/theme";

const secondaryColor = theme.palette.text.primary;

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget); // Abre o Mobile Menu corretamente
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 2,
          top: 0,
        }}
      >
        <Toolbar>
          <AppBarContent
            toggleDrawer={toggleDrawer}
            handleProfileMenuOpen={handleProfileMenuOpen}
            handleMobileMenuOpen={handleMobileMenuOpen}
            mobileMenuId={mobileMenuId}
            menuId={menuId}
            secondaryColor={secondaryColor}
            drawerOpen={drawerOpen}
          />
        </Toolbar>
      </AppBar>

      <MobileMenu
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        handleProfileMenuOpen={handleProfileMenuOpen}
        secondaryColor={secondaryColor}
      />

      <ProfileMenu
        anchorEl={anchorEl}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        secondaryColor={secondaryColor}
      />

      <CustomDrawer open={drawerOpen} onClose={toggleDrawer(false)} />
    </Box>
  );
}
