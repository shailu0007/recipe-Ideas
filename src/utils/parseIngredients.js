export function parseIngredients(meal) {
  if (!meal) return [];
  const items = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) items.push({ ingredient: ing.trim(), measure: (measure || '').trim() });
  }
  return items;
}
