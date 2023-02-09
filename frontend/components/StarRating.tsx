import { Dispatch, SetStateAction, useState } from "react";
import { AiFillStar } from "react-icons/ai";

interface Props {
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
}

const StarRating = ({ rating, setRating }: Props) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  return (
    <div className="flex gap-[0.3rem]">
      {[...Array(5)].map((star: any, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              className="hidden"
              name="rating"
              type="radio"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <AiFillStar
              className={`${
                ratingValue <= (hoverRating || rating)
                  ? "opacity-100"
                  : "opacity-50"
              } text-asparagus-3 text-[2.5rem] hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer`}
              onMouseEnter={() => setHoverRating(ratingValue)}
              onMouseLeave={() => setHoverRating(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
