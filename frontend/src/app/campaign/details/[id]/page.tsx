"use client";
import { Button, Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { cardData } from "@src/mocks/campaign.mocks";
import Banner from "@src/components/CampaignDetails/Banner";
import CardInfo from "@src/components/CampaignDetails/CardInfo";
import CardDescription from "@src/components/CampaignDetails/CardDescription";
import { styled } from "@mui/material/styles";
import theme from "@src/theme/theme";

interface Card {
  id: number;
  name: string;
  description: string;
  system: string;
  bannerUrl: string;
  iconUrl: string;
}

const CardContainer = styled("div")({
  maxWidth: "1000px",
  margin: "0 auto",
  paddingTop: "20px",
});

const Content = styled("div")({
  paddingTop: "5%",
  paddingLeft: "5%",
  paddingRight: "5%",
  minHeight: "62vh",
  marginTop: "-5%",
  backgroundColor: theme.palette.background.paper,
});

const Header = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: "16px",
  justifyContent: "space-between",
});

const CardDetail = () => {
  const { id } = useParams();
  const cardId = parseInt(id as string, 10);

  const card: Card | undefined = cardData.find((card) => card.id === cardId);

  if (!card) {
    return <div>Card não encontrado.</div>;
  }

  return (
    <CardContainer>
      <Banner
        bannerUrl={card.bannerUrl}
        iconUrl={card.iconUrl}
        name={card.name}
      />
      <Content>
        <Header>
          <Typography
            variant="h4"
            component="div"
            color={theme.palette.text.primary}
          >
            {card.name}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: "-8%" }}
          >
            Participar
          </Button>
        </Header>
        <CardInfo system={card.system} createdAt="xx/xx/xxxx" />
        <CardDescription description={card.description} />
      </Content>
    </CardContainer>
  );
};

export default CardDetail;
