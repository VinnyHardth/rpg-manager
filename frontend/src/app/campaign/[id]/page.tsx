"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { cardData } from "@src/mocks/campaign.mocks";

interface Card {
  id: number;
  name: string;
  description: string;
  system: string;
  bannerUrl: string;
  iconUrl: string;
}

const CardDetail = () => {
  const { id } = useParams();
  const cardId = parseInt(id as string, 10);

  // Encontre o card correspondente aos dados mock
  const card: Card | undefined = cardData.find((card) => card.id === cardId);

  if (!card) {
    return <div>Card não encontrado.</div>;
  }

  return (
    <div>
      <h1>{card.name}</h1>
      {/* Utilize o componente Image para otimização */}
      <div style={{ position: "relative", width: "100%", height: "320px" }}>
        <Image
          src={card.bannerUrl}
          alt={card.name}
          layout="fill" // Preenche o contêiner com a imagem
          objectFit="cover" // Ajusta a imagem para cobrir o contêiner
        />
      </div>
      <p>{card.description}</p>
      <p>
        <strong>Sistema:</strong> {card.system}
      </p>
      <div style={{ position: "relative", width: "60px", height: "60px" }}>
        <Image
          src={card.iconUrl}
          alt={`${card.name} icon`}
          layout="fill" // Preenche o contêiner com a imagem
          objectFit="cover" // Ajusta a imagem para cobrir o contêiner
        />
      </div>
    </div>
  );
};

export default CardDetail;
