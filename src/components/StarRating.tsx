"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function StarRating({ 
  rating, 
  onRatingChange, 
  readonly = false, 
  size = "md" 
}: StarRatingProps) {
  const [hoveredRating, setHoveredRating] = useState(0);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  const handleStarClick = (starRating: number) => {
    if (!readonly) {
      onRatingChange(starRating);
    }
  };

  const handleStarHover = (starRating: number) => {
    if (!readonly) {
      setHoveredRating(starRating);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoveredRating(0);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hoveredRating || rating);
        return (
          <Star
            key={star}
            className={`${sizeClasses[size]} transition-colors duration-200 ${
              isFilled 
                ? "text-yellow-400 fill-yellow-400" 
                : "text-gray-400 hover:text-yellow-300"
            } ${!readonly ? "cursor-pointer" : ""}`}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
      {rating > 0 && (
        <span className="ml-2 text-sm text-gray-300">
          {rating}/5
        </span>
      )}
    </div>
  );
}
