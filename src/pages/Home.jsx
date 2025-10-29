import React, { useEffect, useState } from 'react';
import { filterByIngredient, getMealById } from '../services/mealdb';
import { Link, useSearchParams } from 'react-router-dom';
import MealCard from '../components/MealCard';

// Lightweight skeleton card
function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden border border-orange-100 bg-white animate-pulse">
      <div className="w-full aspect-video bg-orange-100" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-orange-100 rounded w-3/4" />
        <div className="h-3 bg-orange-50 rounded w-1/2" />
      </div>
    </div>
  );
}

export default function Home({ quickOnly }) {
  const [params, setParams] = useSearchParams();
  const initial = params.get('i') || 'chicken';
  const [ingredient, setIngredient] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError('');
      try {
        const list = await filterByIngredient(ingredient);
        if (cancelled) return;

        if (!quickOnly) {
          setMeals(list || []);
        } else {
          const first = await Promise.all(
            (list || []).slice(0, 12).map(async (m) => {
              const d = await getMealById(m.idMeal);
              return { ...m, __len: d?.strInstructions?.length || 0 };
            })
          );
          setMeals(first.filter((m) => m.__len > 0 && m.__len < 900));
        }
      } catch (e) {
        setError('Failed to fetch meals. Please try again.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (ingredient?.trim()) run();
    return () => {
      cancelled = true;
    };
  }, [ingredient, quickOnly]);

  const onSubmit = (e) => {
    e.preventDefault();
    const q = ingredient.trim();
    if (q) setParams({ i: q });
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-500 rounded-2xl p-8 md:p-12 text-white shadow-2xl overflow-hidden">
  <div className="relative z-10 text-center">
    <h1 className="text-3xl md:text-5xl font-bold mb-2">🍳 What's cooking, Taylor?</h1>
    <p className="text-yellow-50 text-base md:text-lg mb-6">
      Find recipes based on ingredients you already have
    </p>

    {/* Search (white input) - centered */}
    <form onSubmit={onSubmit} className="relative max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="Ingredient (e.g., chicken, tomato)"
          className="w-full pl-12 pr-32 py-4 rounded-xl bg-white text-gray-900 placeholder-gray-400 border border-orange-200 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:border-orange-300 shadow-xl text-lg"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 focus:ring-4 focus:ring-orange-300 transition-all shadow-lg"
        >
          Search
        </button>
      </div>
    </form>
  </div>
</div>


      {/* Loading */}
      {loading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-orange-50 border-2 border-orange-200 text-orange-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && meals?.length === 0 && (
        <div className="text-center py-12 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-dashed border-orange-300">
          <p className="text-orange-700 text-lg font-semibold">No recipes found</p>
          <p className="text-orange-600/70 text-sm mt-1">Try another ingredient</p>
        </div>
      )}

      {/* Results */}
      {!loading && !error && meals?.length > 0 && (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {meals.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
          <p className="text-center text-sm text-orange-700">
            Found <span className="font-bold">{meals.length}</span> recipe{meals.length !== 1 ? 's' : ''} with{' '}
            <span className="font-bold">{ingredient}</span>
          </p>
        </>
      )}
    </div>
  );
}
