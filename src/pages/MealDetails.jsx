import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { parseIngredients } from '../utils/parseIngredients';
import { getMealById } from '../services/mealdb';

export default function MealDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError('');
      try {
        const data = await getMealById(id);
        if (!cancelled) setMeal(data);
      } catch (e) {
        if (!cancelled) setError('Failed to load meal.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-orange-100 rounded w-32" />
        <div className="h-10 bg-orange-100 rounded w-3/4" />
        <div className="w-full h-64 bg-orange-100 rounded-xl" />
        <div className="space-y-3">
          <div className="h-4 bg-orange-100 rounded w-1/2" />
          <div className="h-4 bg-orange-100 rounded w-full" />
          <div className="h-4 bg-orange-100 rounded w-5/6" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-orange-50 border-2 border-orange-200 text-orange-800 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="text-center py-12 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-dashed border-orange-300">
        <p className="text-orange-700 text-lg font-semibold">Meal not found</p>
      </div>
    );
  }

  const items = parseIngredients(meal);

  return (
    <article className="space-y-8 max-w-4xl mx-auto">
      {/* Back button */}
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to recipes
      </Link>

      {/* Header */}
      <header className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{meal.strMeal}</h1>
        <div className="flex items-center gap-3 text-sm">
          <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-medium">
            {meal.strCategory}
          </span>
          <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
            {meal.strArea}
          </span>
        </div>
      </header>

      {/* Image */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-orange-100">
        <img 
          src={meal.strMealThumb} 
          alt={meal.strMeal} 
          className="w-full aspect-video object-cover" 
        />
      </div>

      {/* Ingredients */}
      <section className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-orange-200">
        <h2 className="text-2xl font-bold text-orange-700 mb-4 flex items-center gap-2">
          <span>🥘</span>
          Ingredients
        </h2>
        <ul className="grid sm:grid-cols-2 gap-3">
          {items.map((it, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-gray-800">
                <span className="font-medium">{it.ingredient}</span>
                {it.measure && <span className="text-gray-600"> – {it.measure}</span>}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Instructions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-orange-700 flex items-center gap-2">
          <span>👨‍🍳</span>
          Instructions
        </h2>
        <div className="prose prose-orange max-w-none">
          <p className="whitespace-pre-line leading-relaxed text-gray-700">
            {meal.strInstructions}
          </p>
        </div>
      </section>

      {/* YouTube link */}
      {meal.strYoutube && (
        <div className="pt-4">
          <a
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 focus:ring-4 focus:ring-orange-300 transition-all shadow-lg"
            href={meal.strYoutube}
            target="_blank"
            rel="noreferrer"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Watch on YouTube
          </a>
        </div>
      )}
    </article>
  );
}
