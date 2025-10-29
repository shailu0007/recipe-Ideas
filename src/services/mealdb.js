const BASE = 'https://www.themealdb.com/api/json/v1/1';

export async function filterByIngredient(ingredient) {
  if (!ingredient) return [];
  const res = await fetch(`${BASE}/filter.php?i=${encodeURIComponent(ingredient)}`);
  const data = await res.json();
  return data.meals || [];
}

export async function getMealById(id) {
  const res = await fetch(`${BASE}/lookup.php?i=${encodeURIComponent(id)}`);
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
}

export async function searchByName(q) {
  const res = await fetch(`${BASE}/search.php?s=${encodeURIComponent(q)}`);
  const data = await res.json();
  return data.meals || [];
}