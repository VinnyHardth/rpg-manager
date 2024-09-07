"use client";
import { useState } from "react";
import { Button, Box, Typography, TextField } from "@mui/material";
import Banner from "@src/components/CampaignDetails/Banner";
import UploadModal from "@src/components/CampaignCreate/UploadModal";
import { styled } from "@mui/material/styles";
import theme from "@src/theme/theme";

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
  justifyContent: "flex-end",
  alignItems: "center",
  marginBottom: "16px",
  width: "100%", // Garante que o Header ocupe toda a largura disponível
  gap: "16px", // Espaçamento entre o TextField e o botão
});

const CardDetail = () => {
  const [open, setOpen] = useState(false);
  const [bannerUrl, setBannerUrl] = useState(
    "https://placehold.jp/635x140.png"
  );
  const [iconUrl, setIconUrl] = useState("https://placehold.jp/60x60.png");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [system, setSystem] = useState("");
  const [language, setLanguage] = useState("");
  const [platform, setPlatform] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpload = (newBannerUrl: string, newIconUrl: string) => {
    setBannerUrl(newBannerUrl);
    setIconUrl(newIconUrl);
  };

  return (
    <CardContainer>
      <Banner bannerUrl={bannerUrl} iconUrl={iconUrl} name={name} />
      <Content>
        <Header display={"flex"}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpen}
            style={{ marginTop: "-7%" }}
          >
            Upload Imagens
          </Button>
        </Header>
        <Box>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            label="Nome da Campanha"
            placeholder="Ex: Roberto's Adventures"
            InputLabelProps={{
              shrink: true, // Garante que a label esteja minimizada
            }}
            sx={{
              mb: 2,
              width: "100%", // Garante que o TextField ocupe toda a largura disponível
              fontSize: "2rem",
              fontWeight: "bold",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white",
              },
            }}
          />

          <TextField
            value={system}
            onChange={(e) => setSystem(e.target.value)}
            variant="outlined"
            label="Sistema de RPG"
            placeholder="Sistema de RPG"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white",
              },
            }}
          />
          <TextField
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            variant="outlined"
            label="Idioma"
            placeholder="Idioma"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white",
              },
            }}
          />
          <TextField
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            variant="outlined"
            label="Plataforma"
            placeholder="Plataforma"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white",
              },
            }}
          />
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            label="Descrição"
            placeholder="Descrição da Campanha"
            multiline
            rows={4}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white",
              },
            }}
          />
        </Box>
      </Content>
      <UploadModal open={open} onClose={handleClose} onUpload={handleUpload} />
    </CardContainer>
  );
};

export default CardDetail;
