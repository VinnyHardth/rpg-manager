import * as React from "react";
import { Card, CardContent, Skeleton, Box, styled } from "@mui/material";

const BannerSkeleton = styled(Skeleton)(({ theme }) => ({
  width: "100%",
  height: 140,
}));

const ProfileIconSkeleton = styled(Skeleton)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: "50%",
  position: "absolute",
  top: 10,
  left: 10,
}));

const CardContainer = styled(Card)(({ theme }) => ({
  maxWidth: 635,
  minWidth: 635,
  minHeight: 248,
  margin: theme.spacing(2),
  position: "relative",
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  paddingTop: 35, // Espaçamento para o perfil circular
}));

const CardSkeleton = () => {
  return (
    <CardContainer>
      <BannerSkeleton variant="rectangular" />
      <CardContentStyled>
        <ProfileIconSkeleton variant="circular" />
        <Skeleton variant="text" width="60%" height={20} sx={{ mb: 0 }} />
        <Skeleton variant="text" width="80%" height={20} sx={{ mb: 0 }} />
        <Skeleton variant="text" width="40%" height={20} />
      </CardContentStyled>
    </CardContainer>
  );
};

export default CardSkeleton;
