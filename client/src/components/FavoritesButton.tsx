import { FC } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";

interface FavoritesButtonProps {
  isFavorite: boolean;
  onClick?: () => void;
}

const FavoritesButton: FC<FavoritesButtonProps> = ({ isFavorite, onClick }) => {
  return (
    <button
      className="btn btn-sm btn-ghost text-red-500 text-lg"
      onClick={onClick}
    >
      {isFavorite ? <HiHeart /> : <HiOutlineHeart />}
    </button>
  );
};

export default FavoritesButton;
