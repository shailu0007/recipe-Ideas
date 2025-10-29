import React from 'react'
import { Link } from 'react-router-dom';

const MealCard = ({ meal }) => {
  return (
    <Link
      to={`/meal/${meal.idMeal}`}
      className="group rounded-xl overflow-hidden border border-orange-200 bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all"
    >
      <div className="relative overflow-hidden">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-2">
          {meal.strMeal}
        </h3>
        <p className="text-sm text-orange-600/70 mt-1">Tap to view recipe →</p>
      </div>
    </Link>
  );
}

export default MealCard