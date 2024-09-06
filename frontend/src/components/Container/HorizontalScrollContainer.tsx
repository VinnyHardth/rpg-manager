import React, { useRef, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import CardListCharacters from "@src/components/CardList/CardListCharacters"; // Ajuste o caminho conforme necessário
import { playerCharacters } from "@src/mocks/characters.mocks"; // Ajuste o caminho conforme necessário
import { Typography } from "@mui/material";
import theme from "@src/theme/theme";

const HorizontalScrollContainer = styled("div")({
  display: "flex",
  overflowX: "auto", // Permite rolar horizontalmente
  padding: "10px 0", // Ajuste o padding conforme necessário
  whiteSpace: "nowrap",
  position: "relative",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none", // Para Firefox
  gap: "15px", // Ajuste o valor do gap conforme necessário
});

const ProgressBar = styled("div")({
  position: "absolute",
  bottom: 0,
  left: 0,
  height: "5px",
  backgroundColor: "#4caf50",
  transition: "width 0.2s ease",
  minWidth: "10px", // Define uma largura mínima para a barra de progresso
});

const HorizontalScrollContainerWithHover = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const updateScrollProgress = () => {
      if (container) {
        const totalWidth = container.scrollWidth - container.clientWidth;
        const scrolled = container.scrollLeft;
        const progress = (scrolled / totalWidth) * 100;
        setScrollProgress(progress);
      }
    };
    const handleWheel = (event: WheelEvent) => {
      if (container) {
        // Previne a rolagem vertical se o cursor estiver sobre o contêiner
        if (event.deltaY !== 0) {
          container.scrollLeft += event.deltaY;
          event.preventDefault(); // Evita a rolagem vertical
          updateScrollProgress();
        }
      }
    };
    const handleMouseEnter = () => {
      if (container) {
        container.addEventListener("wheel", handleWheel, { passive: false });
      }
    };
    const handleMouseLeave = () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
    if (container) {
      container.addEventListener("scroll", updateScrollProgress);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      updateScrollProgress(); // Atualiza ao montar
      return () => {
        container.removeEventListener("scroll", updateScrollProgress);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
        container.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <HorizontalScrollContainer ref={containerRef}>
        <CardListCharacters cards={playerCharacters} />
      </HorizontalScrollContainer>
      <ProgressBar style={{ width: `${Math.max(scrollProgress, 1)}%` }} />
    </div>
  );
};

export default HorizontalScrollContainerWithHover;
