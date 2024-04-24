import React from "react";
import Recipes from "./Recipes";
import RecipeDetail from "./RecipeDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";
import Nav from "./Nav";
import useToggle from "./hooks/useToggle";

function App() {
  const [recipes, setRecipes] = React.useState([]);
  const [loggedin, setLoggedin] = useToggle(true);
  const [loading, setLoading] = useToggle(true);
  const [error, setError] = React.useState("");
  const { get, post } = useFetch(`/api/recipes`);

  const addRecipe = (recipe) => {
    post("/api/recipes", recipe).then((data) => {
      setRecipes([data, ...recipes]);
    });
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    setLoading(true);
    get("/api/recipes")
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, []);

  // if (loading === true) {
  //   return <p>Loading</p>;
  // }

  // if (error) {
  //   return <p>{error}</p>;
  // }

  return (
    <main>
      <BrowserRouter>
        <Nav setLoggedin={setLoggedin} loggedin={loggedin} />
        <Routes>
          <Route
            path="/"
            element={
              <Recipes
                recipes={recipes}
                loggedin={loggedin}
                addRecipe={addRecipe}
              />
            }
          />
          <Route
            path="/:recipeId"
            element={<RecipeDetail recipes={recipes} />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
