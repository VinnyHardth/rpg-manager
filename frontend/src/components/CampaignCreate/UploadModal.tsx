// components/UploadModal.tsx
import { useState } from "react";
import { Modal, Box, Button, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ModalContent = styled(Box)({
  width: "400px",
  padding: "2rem",
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  position: "relative",
});

const Input = styled("input")({
  display: "none",
});

const UploadModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onUpload: (bannerUrl: string, iconUrl: string) => void;
}> = ({ open, onClose, onUpload }) => {
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<
    string | ArrayBuffer | null
  >(null);
  const [iconPreview, setIconPreview] = useState<string | ArrayBuffer | null>(
    null
  );

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBannerFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setBannerPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIconFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setIconPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (bannerFile && iconFile) {
      onUpload(URL.createObjectURL(bannerFile), URL.createObjectURL(iconFile));
      onClose();
    }
  };

  return (
    <StyledModal open={open} onClose={onClose}>
      <ModalContent>
        <IconButton
          onClick={onClose}
          style={{ position: "absolute", top: "1rem", right: "1rem" }}
        >
          <CloseIcon />
        </IconButton>
        <h2>Upload de Imagens</h2>
        <div>
          <label>
            <Input type="file" accept="image/*" onChange={handleBannerChange} />
            <Button variant="contained" component="span">
              Upload do Banner
            </Button>
          </label>
          {bannerPreview && (
            <img
              src={bannerPreview as string}
              alt="Banner Preview"
              style={{ width: "100%", marginTop: "1rem" }}
            />
          )}
        </div>
        <div>
          <label>
            <Input type="file" accept="image/*" onChange={handleIconChange} />
            <Button variant="contained" component="span">
              Upload do Ícone
            </Button>
          </label>
          {iconPreview && (
            <img
              src={iconPreview as string}
              alt="Icon Preview"
              style={{ width: "100%", marginTop: "1rem" }}
            />
          )}
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          style={{ marginTop: "1rem" }}
        >
          Confirmar Upload
        </Button>
      </ModalContent>
    </StyledModal>
  );
};

export default UploadModal;
