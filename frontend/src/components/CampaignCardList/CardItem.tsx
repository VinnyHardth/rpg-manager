import { Card, CardContent, Typography, Link, Box } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import Banner from "./Banner"; // Componente do banner
import theme from "@src/theme/theme";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const CardContainer = styled(Card)(({ theme }) => ({
  maxWidth: 635,
  minWidth: 635,
  display: "flex",
  flexDirection: "column",
  borderTopRightRadius: 32,
  borderTopLeftRadius: 32,
  margin: theme.spacing(2),
  position: "relative",
  opacity: 0,
  animation: `${fadeIn} 0.5s forwards`,
  height: "auto",
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  background: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(20,25,43,))",
  color: theme.palette.text.secondary,
  padding: theme.spacing(2),
  boxSizing: "border-box",
}));

// Componente CampaignCard
interface CampaignCardProps {
  id: number;
  name: string;
  description: string;
  system: string;
  bannerUrl: string;
  iconUrl: string;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
  id,
  name,
  description,
  system,
  bannerUrl,
  iconUrl,
}) => {
  return (
    <CardContainer>
      <Link
        href={`/campaign/details/${id}`}
        sx={{
          textDecoration: "none",
          color: "inherit",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Banner */}
        <Banner bannerUrl={bannerUrl} iconUrl={iconUrl} name={name} />

        {/* Conteúdo */}
        <CardContentStyled>
          <Box>
            <Typography variant="body2" color="white" sx={{ flex: 1 }}>
              {description}
            </Typography>
            <Typography variant="body2" color="white">
              {system}
            </Typography>
          </Box>
        </CardContentStyled>
      </Link>
    </CardContainer>
  );
};

export default CampaignCard;
