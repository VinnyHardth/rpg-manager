import { Menu, MenuItem } from "@mui/material";

interface ProfileMenuProps {
  anchorEl: null | HTMLElement;
  isMenuOpen: boolean;
  handleMenuClose: () => void;
  secondaryColor: string;
}

export default function ProfileMenu({
  anchorEl,
  isMenuOpen,
  handleMenuClose,
  secondaryColor,
}: ProfileMenuProps) {
  return (
    <Menu
      color={secondaryColor}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );
}
