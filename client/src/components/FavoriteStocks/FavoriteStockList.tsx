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
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 ml-auto">
        <button className="btn btn-xs btn-ghost" onClick={() => scroll("left")}>
          <HiOutlineChevronLeft />
        </button>
        <button
          className="btn btn-xs btn-ghost"
          onClick={() => scroll("right")}
        >
          <HiOutlineChevronRight />
        </button>
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

{
  /* <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
  <div className="carousel-item">
    <img src="/images/stock/photo-1559703248-dcaaec9fab78.jpg" className="rounded-box" />
  </div> 
  <div className="carousel-item">
    <img src="/images/stock/photo-1565098772267-60af42b81ef2.jpg" className="rounded-box" />
  </div> 
  <div className="carousel-item">
    <img src="/images/stock/photo-1572635148818-ef6fd45eb394.jpg" className="rounded-box" />
  </div> 
  <div className="carousel-item">
    <img src="/images/stock/photo-1494253109108-2e30c049369b.jpg" className="rounded-box" />
  </div> 
  <div className="carousel-item">
    <img src="/images/stock/photo-1550258987-190a2d41a8ba.jpg" className="rounded-box" />
  </div> 
  <div className="carousel-item">
    <img src="/images/stock/photo-1559181567-c3190ca9959b.jpg" className="rounded-box" />
  </div> 
  <div className="carousel-item">
    <img src="/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" className="rounded-box" />
  </div>
</div> */
}
