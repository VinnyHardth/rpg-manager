import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

interface CardProps {
  id: number;
  name: string;
  description: string;
  bannerUrl: string;
}

interface CardListProps {
  cards: CardProps[];
}

const CardListCharacters = ({ cards }: CardListProps) => {
  return (
    <>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={4} key={card.id}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" component="div">
                {card.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      ))}
    </>
  );
};

export default CardListCharacters;

const StyledCard = styled(Card)({
  maxWidth: 345,
  minHeight: 200,
  margin: "0 auto",
});
