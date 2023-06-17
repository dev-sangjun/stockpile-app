import { FC, useRef } from "react";
import { Stock } from "../../types/entity.types";
import FavoriteStockListItem from "./FavoriteStockListItem";
import { useSelector } from "react-redux";
import { RootState } from "../../states/store";
import { getInvestments } from "../../states/user.reducer";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

interface FavoriteStockListProps {
  stocks: Stock[];
}

const FavoriteStockList: FC<FavoriteStockListProps> = ({ stocks }) => {
  const carouselRef = useRef<HTMLUListElement>(null);
  const investments = useSelector((state: RootState) => getInvestments(state));
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
  return (
    <div className="flex flex-col gap-4 card bg-base-200 p-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Favorite Stocks</h3>
        <div className="flex gap-2">
          <button
            className="btn btn-xs btn-ghost"
            onClick={() => scroll("left")}
          >
            <HiOutlineChevronLeft />
          </button>
          <button
            className="btn btn-xs btn-ghost"
            onClick={() => scroll("right")}
          >
            <HiOutlineChevronRight />
          </button>
        </div>
      </div>
      <ul
        className="carousel carousel-center flex items-start gap-4 rounded-box"
        ref={carouselRef}
      >
        {stocks.map(stock => (
          <FavoriteStockListItem
            key={stock.id}
            stock={stock}
            quantity={getQuantity(stock.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default FavoriteStockList;
