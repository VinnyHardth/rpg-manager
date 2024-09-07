// components/CardDetail/CardDescription.tsx
import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "@src/theme/theme";
import HorizontalScrollContainerWithHover from "@src/components/CharacterCardList/HorizontalScrollContainer";

const DescriptionTypography = styled(Typography)({
  color: theme.palette.text.primary,
  marginTop: 1,
});

const SectionTitle = styled(Typography)({
  color: theme.palette.text.primary,
});

const CardDescription: React.FC<{ description: string }> = ({
  description,
}) => {
  return (
    <Box display="flex" flexDirection="column">
      <DescriptionTypography as="div">{description}</DescriptionTypography>
      <Divider
        sx={{
          borderColor: theme.palette.primary.light,
          width: "95%",
          margin: "16px 0",
          alignSelf: "center",
        }}
      />
      <SectionTitle variant="h4" as="div">
        Personagens:
      </SectionTitle>
      <HorizontalScrollContainerWithHover />
    </Box>
  );
};

export default CardDescription;
