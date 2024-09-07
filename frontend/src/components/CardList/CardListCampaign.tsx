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
  borderTopRightRadius: 32,
  borderTopLeftRadius: 32,
});

const CardContainer = styled(Card)(({ theme }) => ({
  maxWidth: 635,
  minWidth: 635,
  display: "flex",
  flexDirection: "column",
  borderTopRightRadius: 32,
  borderTopLeftRadius: 32,
  margin: theme.spacing(2),
  position: "relative",
  opacity: 0,
  animation: `${fadeIn} 0.5s forwards`,
  height: "auto", // Ensure container height adapts to content
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  background: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(20,25,43,))",
  color: theme.palette.text.secondary,
  padding: theme.spacing(2),
  boxSizing: "border-box", // Ensure padding and border are included in the element's total width and height
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
            <Link
              href={`/campaign/${card.id}`}
              sx={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <BannerContainer>
                <BannerImage
                  src={card.bannerUrl}
                  alt={card.name}
                  layout="fill"
                  objectFit="cover"
                />
                <Overlay>
                  <IconContainer>
                    <Image
                      src={card.iconUrl}
                      alt={`${card.name} icon`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </IconContainer>
                  <Typography
                    variant="h6"
                    component="div"
                    marginLeft={5}
                    color={theme.palette.text.primary}
                  >
                    {card.name}
                  </Typography>
                </Overlay>
              </BannerContainer>
              <CardContentStyled>
                <Box>
                  <Typography variant="body2" color="white" sx={{ flex: 1 }}>
                    {card.description}
                  </Typography>
                  <Typography variant="body2" color="white">
                    {card.system}
                  </Typography>
                </Box>
              </CardContentStyled>
            </Link>
          </CardContainer>
        ))
      )}
    </Box>
  );
};

export default CardList;

const Overlay = styled("div")({
  position: "absolute",
  bottom: "0",
  left: "0",
  right: "0",
  height: "60px",
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: "32px",
  borderTopRightRadius: "32px",
  display: "flex",
  alignItems: "left",
  justifyContent: "left",
  boxSizing: "border-box",
});

const BannerImage = styled(Image)({
  borderTopLeftRadius: "32px",
  borderTopRightRadius: "32px",
});

const IconContainer = styled("div")({
  position: "relative",
  top: "5%",
  left: "5%",
  width: "80px",
  height: "80px",
  borderRadius: "10px",
  overflow: "hidden",
  transform: "translateY(-50%)",
  border: "3px solid white",
  backgroundColor: "white",
});
