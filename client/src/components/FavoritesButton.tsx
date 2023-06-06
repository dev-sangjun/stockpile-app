import { FC } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";

interface FavoritesButtonProps {
  isFavorite: boolean;
  onClick?: () => void;
}

const FavoritesButton: FC<FavoritesButtonProps> = ({ isFavorite, onClick }) => {
  return (
    <button
      className="btn btn-link px-0 h-8 min-h-8 text-xl text-red-500"
      onClick={onClick}
    >
      {isFavorite ? <HiHeart /> : <HiOutlineHeart />}
    </button>
  );
};

export default FavoritesButton;
