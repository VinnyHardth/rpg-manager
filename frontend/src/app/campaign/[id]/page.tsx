"use client";
import Image from "next/image";
import { Button, Box, Typography, Grid, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { cardData } from "@src/mocks/campaign.mocks";
import { useParams } from "next/navigation";
import theme from "@src/theme/theme";
import CardListCharacters from "@src/components/CardList/CardListCharacters";
import { playerCharacters } from "@src/mocks/characters.mocks";
import HorizontalScrollContainerWithHover from "@src/components/Container/HorizontalScrollContainer";
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
    <CardContainer>
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
        </Overlay>
      </BannerContainer>
      <Content>
        <Header justifyContent={"space-between"}>
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

        <Box
          display="flex"
          flexDirection="column"
          sx={{ marginBottom: "16px" }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} sm={3}>
              <Typography component="div" color={theme.palette.text.primary}>
                <strong>Sistema:</strong> {card.system}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Typography component="div" color={theme.palette.text.primary}>
                <strong>Idioma:</strong> Português
              </Typography>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Typography component="div" color={theme.palette.text.primary}>
                <strong>Plataforma:</strong> Discord
              </Typography>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Typography component="div" color={theme.palette.text.primary}>
                <strong>Criado em:</strong> xx/xx/xxxx
              </Typography>
            </Grid>
          </Grid>

          <Divider
            sx={{
              borderColor: theme.palette.primary.light,
              width: "100%",
              margin: "16px 0",
            }}
          />

          <Typography
            component="div"
            color={theme.palette.text.primary}
            marginTop={1}
          >
            {card.description}
          </Typography>
          <Divider
            sx={{
              borderColor: theme.palette.primary.light,
              width: "95%",
              margin: "16px 0",
              alignSelf: "center",
            }}
          />

          <Typography
            variant="h4"
            component="div"
            color={theme.palette.text.primary}
          >
            Personagens:
          </Typography>
          <HorizontalScrollContainerWithHover />
          {/* <Box padding={1000}></Box> */}
        </Box>
      </Content>
    </CardContainer>
  );
};

export default CardDetail;

// Styled Components
const CardContainer = styled("div")({
  maxWidth: "1000px",
  margin: "0 auto",
  paddingTop: "20px",
});

const BannerContainer = styled("div")({
  position: "relative",
  width: "100%",
  height: "320px",
  overflow: "hidden",
});

const BannerImage = styled(Image)({
  borderTopLeftRadius: "32px",
  borderTopRightRadius: "32px",
});

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
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
});

const IconContainer = styled("div")({
  position: "absolute",
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
});
