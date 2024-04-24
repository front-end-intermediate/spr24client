import React from "react";
import Recipe from "./Recipe";

function Recipes({ recipes }) {
  return (
    <summary>
      {recipes.map((recipe) => (
        <Recipe key={recipe._id} recipe={recipe} />
      ))}
    </summary>
  );
}

export default Recipes;
