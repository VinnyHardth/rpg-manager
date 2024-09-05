import * as React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";

interface CardData {
  id: number;
  name: string;
  description: string;
  system: string;
  bannerUrl: string;
  iconUrl: string;
}

interface CardListProps {
  cards: CardData[];
}

const Banner = styled("img")(({ theme }) => ({
  width: "100%", // Faz com que a imagem se ajuste ao tamanho do card
  height: 140,
  objectFit: "cover", // Mantém a proporção da imagem sem distorcer
}));

const ProfileIcon = styled("div")(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: "50%",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: 10,
  left: 10,
  border: `3px solid ${theme.palette.background.paper}`,
  backgroundColor: theme.palette.background.default,
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

const CardContainer = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(2),
  position: "relative", // Necessário para o posicionamento do ProfileIcon
}));

const CardList = ({ cards }: CardListProps) => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {cards.map((card) => (
        <CardContainer key={card.id}>
          <Banner
            src={card.bannerUrl} // URL da imagem do banner
            alt={`${card.name} Banner`} // Texto alternativo para acessibilidade
          />
          <CardContent>
            <ProfileIcon>
              <Image
                src={"/assets/images/image.png"}
                alt={`${card.name} Icon`}
                width={60}
                height={60}
              />
            </ProfileIcon>

            <Typography variant="h6" component="div">
              {card.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {card.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {card.system}
            </Typography>
          </CardContent>
        </CardContainer>
      ))}
    </Box>
  );
};

export default CardList;
