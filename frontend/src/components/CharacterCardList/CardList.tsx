import React from "react";
import { Grid } from "@mui/material";
import CardItem from "./CardItem";

interface CardProps {
  id: number;
  name: string;
  description: string;
  bannerUrl: string;
}

interface CardListProps {
  cards: CardProps[];
}

const CardList: React.FC<CardListProps> = ({ cards }) => {
  return (
    <>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={4} key={card.id}>
          <CardItem
            name={card.name}
            description={card.description}
            bannerUrl={card.bannerUrl}
          />
        </Grid>
      ))}
    </>
  );
};

export default CardList;
