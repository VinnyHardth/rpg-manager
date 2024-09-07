"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { alpha, styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";

// Estilizando o Fab para exibir apenas o contorno
const OutlinedFab = styled(Fab)(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.light}`, // Cor e espessura do contorno
  backgroundColor: "transparent", // Torna o fundo transparente
  color: theme.palette.primary.light, // Cor do ícone
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.2), // Adiciona um leve fundo ao passar o mouse
  },
  height: 76, // Ajusta a altura do botão
  width: 76, // Ajusta a largura do botão
}));

export default function FABCreateCampaign() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/campaign/create");
  };

  return (
    <Box
      sx={{
        position: "fixed", // Define a posição como fixa para manter o componente no mesmo lugar
        bottom: 16, // Ajusta a distância do fundo da tela
        right: 16, // Ajusta a distância da borda direita da tela
      }}
    >
      <OutlinedFab aria-label="add" onClick={handleClick}>
        <AddIcon />
      </OutlinedFab>
    </Box>
  );
}
