import { IconButton, Typography, Box, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import theme from "@src/theme/theme";
import SearchBar from "./SearchBar";

// Definição das props aceitas pelo componente AppBarContent
interface AppBarContentProps {
  toggleDrawer: (open: boolean) => () => void;
  handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMobileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  mobileMenuId: string;
  menuId: string;
  secondaryColor: string;
  drawerOpen: boolean;
}

export default function AppBarContent({
  toggleDrawer,
  handleProfileMenuOpen,
  handleMobileMenuOpen,
  mobileMenuId,
  menuId,
  secondaryColor,
  drawerOpen,
}: AppBarContentProps) {
  const renderDrawerButton = () => (
    <IconButton
      size="large"
      edge="start"
      aria-label="open drawer"
      onClick={toggleDrawer(true)}
      sx={{
        color: secondaryColor,
        mr: 2,
        backgroundColor: drawerOpen
          ? theme.palette.primary.light
          : "transparent",
      }}
    >
      <MenuIcon sx={{ color: secondaryColor }} />
    </IconButton>
  );

  const renderDesktopIcons = () => (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
      {" "}
      <IconButton
        size="large"
        aria-label="show 4 new mails"
        sx={{ color: secondaryColor }}
      >
        <Badge badgeContent={4} color="error">
          <MailIcon sx={{ color: secondaryColor }} />
        </Badge>
      </IconButton>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        sx={{ color: secondaryColor }}
      >
        <Badge badgeContent={17} color="error">
          <NotificationsIcon sx={{ color: secondaryColor }} />
        </Badge>
      </IconButton>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        sx={{ color: secondaryColor }}
      >
        <AccountCircle sx={{ color: secondaryColor }} />
      </IconButton>
    </Box>
  );

  const renderMobileMenuButton = () => (
    <Box sx={{ display: { xs: "flex", md: "none" } }}>
      {" "}
      <IconButton
        size="large"
        aria-label="show more"
        aria-controls={mobileMenuId}
        aria-haspopup="true"
        onClick={handleMobileMenuOpen}
        sx={{ color: secondaryColor }}
      >
        <MoreIcon sx={{ color: secondaryColor }} />
      </IconButton>
    </Box>
  );

  return (
    <>
      {renderDrawerButton()}

      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ display: { xs: "none", sm: "block" }, color: secondaryColor }}
      >
        RPG-M
      </Typography>

      <SearchBar />

      <Box sx={{ flexGrow: 1 }} />

      {renderDesktopIcons()}

      {renderMobileMenuButton()}
    </>
  );
}
