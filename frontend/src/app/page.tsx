"use client";
import * as React from "react";
import CardList from "@src/components/CardList/CardList";
import { cardData } from "@src/mocks/campaign.mocks";

const App = () => {
  // Simular um estado de carregamento (se necessário)
  const [loading, setLoading] = React.useState(true);

  // Simular a conclusão do carregamento após 2 segundos
  React.useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <div>
      <CardList cards={cardData} loading={loading} />
    </div>
  );
};

export default App;
