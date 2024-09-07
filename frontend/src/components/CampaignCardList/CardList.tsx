import { Box } from "@mui/material";
import CampaignCard from "./CardItem"; // Componente de card individual
import CardSkeleton from "./CardSkeleton"; // Esqueleto do card para carregamento

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

const CardList: React.FC<CardListProps> = ({ cards, loading }) => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {loading
        ? [...Array(6)].map((_, index) => <CardSkeleton key={index} />)
        : cards.map((card) => (
            <CampaignCard
              key={card.id}
              id={card.id}
              name={card.name}
              description={card.description}
              system={card.system}
              bannerUrl={card.bannerUrl}
              iconUrl={card.iconUrl}
            />
          ))}
    </Box>
  );
};

export default CardList;
