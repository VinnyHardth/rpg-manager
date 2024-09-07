import React, { useRef, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import CardListCharacters from "@src/components/CharacterCardList/CardList";
import { playerCharacters } from "@src/mocks/characters.mocks";
import theme from "@src/theme/theme";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

// Contêiner para rolagem horizontal
const ScrollContainerWrapper = styled("div")({
  position: "relative",
  padding: "0 60px", // Ajuste o padding para acomodar as setas nas laterais
});

const HorizontalScrollContainer = styled("div")({
  display: "flex",
  overflowX: "auto",
  overflowY: "hidden", // Impede a rolagem vertical
  padding: "10px 0",
  whiteSpace: "nowrap",
  gap: "15px",
  scrollbarWidth: "none", // Para Firefox
  "&::-webkit-scrollbar": {
    display: "none", // Oculta a barra de rolagem padrão
  },
});

// Botão de seta
const ArrowButton = styled("button")<{ disabled: boolean }>(({ disabled }) => ({
  backgroundColor: "rgba(0, 0, 0, 0.3)", // Fundo semi-transparente para destaque
  border: "none",
  borderRadius: "50%", // Deixa os botões arredondados
  cursor: disabled ? "default" : "pointer",
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 2,
  padding: "10px", // Tamanho do botão
  opacity: disabled ? 0.3 : 1, // Reduz a opacidade se o botão estiver desabilitado
  "&:hover": {
    backgroundColor: disabled ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.5)", // Muda a opacidade ao passar o mouse, se possível
  },
  "&.left": {
    left: "10px",
  },
  "&.right": {
    right: "10px",
  },
}));

const HorizontalScrollContainerWithArrows = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const updateScrollStatus = () => {
      if (containerRef.current) {
        // Atualiza se o container pode rolar para a esquerda
        setCanScrollLeft(containerRef.current.scrollLeft > 0);

        // Ajuste para garantir que a seta direita desabilite corretamente
        const scrollPosition =
          containerRef.current.scrollLeft + containerRef.current.clientWidth;
        const isAtEnd = scrollPosition >= containerRef.current.scrollWidth - 1;
        setCanScrollRight(!isAtEnd);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollStatus);
      updateScrollStatus(); // Atualiza o status ao montar

      // Função para adicionar rolagem horizontal com o mouse
      const handleWheel = (event: WheelEvent) => {
        if (container) {
          container.scrollLeft += event.deltaY;
          event.preventDefault(); // Evita a rolagem vertical
          updateScrollStatus(); // Atualiza o status da rolagem
        }
      };

      container.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        container.removeEventListener("scroll", updateScrollStatus);
        container.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);

  const scrollContainer = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 200; // Ajuste o valor para a quantidade desejada de rolagem
      if (direction === "left") {
        containerRef.current.scrollLeft -= scrollAmount;
      } else {
        containerRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <ScrollContainerWrapper>
      <HorizontalScrollContainer ref={containerRef}>
        <CardListCharacters cards={playerCharacters} />
      </HorizontalScrollContainer>

      <ArrowButton
        className="left"
        disabled={!canScrollLeft}
        onClick={() => scrollContainer("left")}
      >
        <ArrowLeftIcon
          fontSize="large"
          sx={{ color: theme.palette.text.primary }}
        />
      </ArrowButton>
      <ArrowButton
        className="right"
        disabled={!canScrollRight}
        onClick={() => scrollContainer("right")}
      >
        <ArrowRightIcon
          fontSize="large"
          sx={{ color: theme.palette.text.primary }}
        />
      </ArrowButton>
    </ScrollContainerWrapper>
  );
};

export default HorizontalScrollContainerWithArrows;
