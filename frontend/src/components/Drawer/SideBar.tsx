import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useTheme } from "@mui/material/styles";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CustomDrawer({ open, onClose }: DrawerProps) {
  const theme = useTheme();

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        backgroundColor: theme.palette.background.paper, // Cor de fundo do Drawer
        color: theme.palette.text.primary, // Cor do texto no Drawer
        height: "100%", // Certifica-se de que o Drawer ocupe toda a altura
      }}
      role="presentation"
      onClick={onClose}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton sx={{ color: theme.palette.text.primary }}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton sx={{ color: theme.palette.text.primary }}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          top: 64, // Ajusta o topo do Drawer para aparecer abaixo da Navbar
          zIndex: (theme) => theme.zIndex.drawer + 1, // Garante que o Drawer esteja acima de outros elementos
          backgroundColor: theme.palette.background.paper, // Cor de fundo do Drawer
          boxShadow: theme.shadows[8], // Adiciona uma sombra para destacar o Drawer
        },
      }}
      ModalProps={{
        BackdropProps: {
          // style: {
          //   backgroundColor: "transparent", // Remove o escurecimento do fundo
          // },
        },
      }}
    >
      {DrawerList}
    </Drawer>
  );
}
