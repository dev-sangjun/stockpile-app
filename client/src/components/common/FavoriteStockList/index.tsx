import { useRef } from "react";
import { useSelector } from "react-redux";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import FavoriteStockListItem from "./FavoriteStockListItem";
import { RootState } from "../../../store";
import { getUser } from "../../../store/user.reducer";
import { Stock } from "../../../global/entity.interfaces";
import { useFallbackMessages } from "../../../constants/messages.constants";
import isEmpty from "is-empty";
import Fallback from "../Fallback";
import Section, { SectionActionButton } from "../Section";

const FavoriteStockList = () => {
  const fallbackMessages = useFallbackMessages();
  const { favoriteStocks, stocks } = useSelector((state: RootState) =>
    getUser(state)
  );
  const carouselRef = useRef<HTMLUListElement>(null);
  const { investments } = useSelector((state: RootState) => getUser(state));
  const filteredFavoriteStocks = () => {
    const filteredFavoriteStocks: Stock[] = [];
    favoriteStocks.forEach(stockId => {
      const stock = stocks[stockId];
      if (stock) {
        filteredFavoriteStocks.push(stock);
      }
    });
    return filteredFavoriteStocks;
  };

  // Fallback
  if (isEmpty(filteredFavoriteStocks())) {
    return <Fallback message={fallbackMessages.favoriteStocks} />;
  }

  const getQuantity = (stockId: string) => {
    if (Object.keys(investments).includes(stockId)) {
      return investments[stockId].quantity;
    }
    return 0;
  };
  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current || !carouselRef.current?.children.length) {
      return;
    }
    const gap = 16; // carousel gap: 1rem
    const carouselItemWidth = carouselRef.current.children[0].clientWidth;
    const pageWidth = carouselItemWidth + gap;
    const scrollX = carouselRef.current.scrollLeft;
    const multiplier = direction === "right" ? 1 : -1; // determines direction
    carouselRef.current.scroll({
      left: scrollX + pageWidth * multiplier,
      behavior: "smooth",
    });
  };
  const actionButtons: SectionActionButton[] = [
    {
      icon: <HiOutlineChevronLeft />,
      onClick: () => scroll("left"),
    },
    {
      icon: <HiOutlineChevronRight />,
      onClick: () => scroll("right"),
    },
  ];
  return (
    <Section title="Favorite Stocks" actionButtons={actionButtons}>
      <ul
        className="carousel carousel-center flex items-start gap-4 rounded-box"
        ref={carouselRef}
      >
        {filteredFavoriteStocks().map(stock => (
          <FavoriteStockListItem
            key={stock.id}
            investment={investments[stock.id]}
            stock={stock}
            quantity={getQuantity(stock.id)}
          />
        ))}
      </ul>
    </Section>
  );
};

export default FavoriteStockList;
