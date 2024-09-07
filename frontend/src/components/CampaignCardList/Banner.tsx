// components/CardDetail/Banner.tsx
import { Typography, Box } from "@mui/material";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import theme from "@src/theme/theme";

// Banner container e componentes de estilização
const BannerContainer = styled("div")({
  width: "100%",
  height: 140,
  position: "relative",
  overflow: "hidden",
  borderTopRightRadius: "32px",
  borderTopLeftRadius: "32px",
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
  alignItems: "center", // Ajustado para centralizar o conteúdo
  boxSizing: "border-box",
});

const IconContainer = styled("div")({
  position: "relative",
  top: "15%", // Ajustado para centralizar verticalmente
  left: "5%",
  width: "80px",
  height: "80px",
  borderRadius: "10px",
  overflow: "hidden",
  transform: "translateY(-50%)",
  border: "3px solid white",
  backgroundColor: "white",
});

// Banner component
interface BannerProps {
  bannerUrl: string;
  iconUrl: string;
  name: string;
}

const Banner: React.FC<BannerProps> = ({ bannerUrl, iconUrl, name }) => {
  return (
    <BannerContainer>
      <BannerImage
        src={bannerUrl}
        alt={name}
        fill
        priority // Adiciona a prioridade para a imagem de banner
        sizes="(max-width: 600px) 100vw, 50vw" // Ajuste os valores conforme necessário
      />
      <Overlay>
        <IconContainer>
          <Image
            src={iconUrl}
            alt={`${name} icon`}
            fill
            priority
            sizes="(max-width: 600px) 50px, 80px" // Ajuste os valores conforme necessário
          />
        </IconContainer>
        <Typography
          variant="h6"
          component="div"
          marginLeft={5}
          color={theme.palette.text.primary}
        >
          {name}
        </Typography>
      </Overlay>
    </BannerContainer>
  );
};

export default Banner;
