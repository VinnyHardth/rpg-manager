"use client";
import * as React from "react";
import CardList from "@src/components/CardList/CardList";
import { cardData } from "@src/mocks/campaign.mocs";

const App = () => {
  return (
    <div>
      <CardList cards={cardData} />
    </div>
  );
};

export default App;
