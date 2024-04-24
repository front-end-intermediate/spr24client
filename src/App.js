import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Recipes from "./Recipes";
import RecipeDetail from "./RecipeDetail";
import { useFetch } from "./hooks/useFetch";
import useToggle from "./hooks/useToggle";
import Nav from "./Nav";

function App() {
  const [loggedin, setLoggedin] = useToggle(false);
  const { loading, data: recipes, error } = useFetch(`/api/recipes`);

  if (loading === true) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <BrowserRouter>
      <Nav setLoggedin={setLoggedin} loggedin={loggedin} />
      <Routes>
        <Route path="/" element={<Recipes recipes={recipes} />} />
        <Route path="/:recipeId" element={<RecipeDetail recipes={recipes} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
