import * as React from "react";
import { Card, CardContent, Typography, Box, Link } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import Image from "next/image";
import CardSkeleton from "../Card/CardSkeletonCampaign";
import theme from "@src/theme/theme";

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
  loading: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const BannerContainer = styled("div")({
  width: "100%",
  height: 140,
  position: "relative",
  overflow: "hidden",
  borderRadius: 0,
});

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
}));

const CardContainer = styled(Card)(({ theme }) => ({
  maxWidth: 635,
  minWidth: 635,
  margin: theme.spacing(2),
  position: "relative",
  opacity: 0, // Inicialmente invisível
  animation: `${fadeIn} 0.5s forwards`, // Animação de desvanecimento
}));

const CardList = ({ cards, loading }: CardListProps) => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {loading ? (
        <>
          {[...Array(6)].map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </>
      ) : (
        cards.map((card) => (
          <CardContainer key={card.id}>
            <Link href={`/campaign/${card.id}`}>
              <BannerContainer>
                <Image
                  src={card.bannerUrl}
                  alt={`${card.name} Banner`}
                  fill // Preenche o contêiner
                  style={{ objectFit: "cover" }} // Ajusta a imagem para cobrir o contêiner
                  sizes="(max-width: 600px) 100vw, 50vw" // Ajuste o tamanho da imagem com base na tela
                  priority
                />
              </BannerContainer>
              <CardContent>
                <ProfileIcon>
                  <Image
                    src={card.iconUrl}
                    alt={`${card.name} Icon`}
                    width={60}
                    height={60}
                    priority
                  />
                </ProfileIcon>
                <Typography
                  variant="h6"
                  component="div"
                  color={theme.palette.text.primary}
                >
                  {card.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.system}
                </Typography>
              </CardContent>
            </Link>
          </CardContainer>
        ))
      )}
    </Box>
  );
};

export default CardList;
