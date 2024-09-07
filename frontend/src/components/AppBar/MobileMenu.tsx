import { Menu, MenuItem, IconButton, Badge } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";

interface MobileMenuProps {
  mobileMoreAnchorEl: null | HTMLElement;
  isMobileMenuOpen: boolean;
  handleMobileMenuClose: () => void;
  handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  secondaryColor: string;
}

export default function MobileMenu({
  mobileMoreAnchorEl,
  isMobileMenuOpen,
  handleMobileMenuClose,
  handleProfileMenuOpen,
  secondaryColor,
}: MobileMenuProps) {
  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 4 new mails"
          sx={{ color: secondaryColor }}
        >
          <Badge badgeContent={4} color="error">
            <MailIcon sx={{ color: secondaryColor }} />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          sx={{ color: secondaryColor }}
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon sx={{ color: secondaryColor }} />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          sx={{ color: secondaryColor }}
        >
          <AccountCircle sx={{ color: secondaryColor }} />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
}
