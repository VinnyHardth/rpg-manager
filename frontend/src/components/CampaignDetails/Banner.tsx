// components/CardDetail/Banner.tsx
import Image from "next/image";
import { styled } from "@mui/material/styles";
import theme from "@src/theme/theme";

const BannerContainer = styled("div")({
  position: "relative",
  width: "100%",
  height: "320px",
  overflow: "hidden",
  borderTopLeftRadius: "32px",
  borderTopRightRadius: "32px",
});

const BannerImage = styled(Image)({
  position: "absolute",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  objectFit: "cover",
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
  top: "-5%",
  left: "5%",
  width: "120px",
  height: "120px",
  borderRadius: "10px",
  overflow: "hidden",
  transform: "translateY(-50%)",
  border: "3px solid white",
  backgroundColor: "white",
});

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
        priority
        sizes="(max-width: 600px) 100vw, 50vw" // Ajuste o valor de acordo com suas necessidades
      />
      <Overlay>
        <IconContainer>
          <Image
            src={iconUrl}
            alt={`${name} icon`}
            fill
            sizes="(max-width: 600px) 50px, 120px" // Ajuste o valor de acordo com suas necessidades
          />
        </IconContainer>
      </Overlay>
    </BannerContainer>
  );
};

export default Banner;
