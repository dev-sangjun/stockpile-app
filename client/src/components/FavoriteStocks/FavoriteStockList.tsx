import { FC, useRef, useState } from "react";
import { Stock } from "../../types/entity.types";
import StockListItem from "./FavoriteStockListItem";
import { useSelector } from "react-redux";
import { RootState } from "../../states/store";
import { getInvestments } from "../../states/user.reducer";

interface FavoriteStockListProps {
  stocks: Stock[];
}

const FavoriteStockList: FC<FavoriteStockListProps> = ({ stocks }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const investments = useSelector((state: RootState) => getInvestments(state));
  const getQuantity = (stockId: string) => {
    if (Object.keys(investments).includes(stockId)) {
      return investments[stockId].quantity;
    }
    return 0;
  };
  const scroll = () => {
    carouselRef.current?.scroll({
      left: carouselRef.current?.scrollLeft + 100,
      behavior: "smooth",
    });
  };
  return (
    <div className="carousel carousel-center rounded-box" ref={carouselRef}>
      <ul className="flex gap-4">
        {stocks.map(stock => (
          <StockListItem
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
