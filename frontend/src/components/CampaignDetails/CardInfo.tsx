// components/CardDetail/CardInfo.tsx
import { Box, Grid, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "@src/theme/theme";

const InfoGrid = styled(Grid)({
  marginBottom: "16px",
});

const InfoTypography = styled(Typography)({
  color: theme.palette.text.primary,
});

interface CardInfoProps {
  system: string;
  createdAt: string;
}

const CardInfo: React.FC<CardInfoProps> = ({ system, createdAt }) => {
  return (
    <Box display="flex" flexDirection="column">
      <Divider
        sx={{
          borderColor: theme.palette.primary.light,
          width: "100%",
          margin: "15px 0",
        }}
      />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={3}>
          <InfoTypography as="div">
            <strong>Sistema:</strong> {system}
          </InfoTypography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <InfoTypography as="div">
            <strong>Idioma:</strong> Português
          </InfoTypography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <InfoTypography as="div">
            <strong>Plataforma:</strong> Discord
          </InfoTypography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <InfoTypography as="div">
            <strong>Criado em:</strong> {createdAt}
          </InfoTypography>
        </Grid>
      </Grid>
      <Divider
        sx={{
          borderColor: theme.palette.primary.light,
          width: "100%",
          margin: "16px 0",
        }}
      />
    </Box>
  );
};

export default CardInfo;
