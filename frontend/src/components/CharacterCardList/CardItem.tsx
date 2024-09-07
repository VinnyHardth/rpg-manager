import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";

interface CardItemProps {
  name: string;
  description: string;
  bannerUrl: string;
}

const CardItem: React.FC<CardItemProps> = ({
  name,
  description,
  bannerUrl,
}) => {
  return (
    <StyledCard>
      <ImageWrapper>
        <Image
          src={bannerUrl}
          alt={name}
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
        />
      </ImageWrapper>
      <ContentWrapper>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {name}
          </Typography>
        </CardContent>
      </ContentWrapper>
    </StyledCard>
  );
};

export default CardItem;

const StyledCard = styled(Card)({
  maxWidth: 200,
  minWidth: 200,
  minHeight: 300,
  maxHeight: 300,
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  position: "relative", // Para permitir o posicionamento absoluto
});

const ImageWrapper = styled(Box)({
  width: "100%",
  height: 250, // Ajuste conforme necessário para a altura da imagem
  position: "relative",
});

const ContentWrapper = styled(Box)({
  flexGrow: 1, // Para preencher o espaço restante
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end", // Alinha o conteúdo ao fundo
  background: "rgba(0, 0, 0, 0.5)", // Fundo escuro com transparência
  marginBottom: -15, // Remove o espaçamento inferior
});
