import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Recipes from "./Recipes";
import RecipeDetail from "./RecipeDetail";

import { useFetch } from "./hooks/useFetch";

function App() {
  // const [recipes, setRecipes] = React.useState([]);
  const { loading, data, error } = useFetch(`/api/recipes`);

  if (loading === true) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Recipes recipes={data} />} />
          <Route path="/:recipeId" element={<RecipeDetail recipes={data} />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
