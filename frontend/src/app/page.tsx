"use client";
import * as React from "react";

import { Box } from "@mui/material";
import { cardData } from "@src/mocks/campaign.mocks";

import CardList from "@src/components/CampaignCardList/CardList";

const App = () => {
  // Simular um estado de carregamento (se necessário)
  const [loading, setLoading] = React.useState(true);

  // Simular a conclusão do carregamento após 2 segundos
  React.useEffect(() => {
    setTimeout(() => setLoading(false), 0);
  }, []);

  return (
    <Box>
      <CardList cards={cardData} loading={loading} />
    </Box>
  );
};

export default App;
