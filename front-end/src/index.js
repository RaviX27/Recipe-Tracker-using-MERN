import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./navBar";
import App from "./App";
import AddRecipe from "./addRecipe";
import DisplayRecipe from "./displayRecipe";
import reportWebVitals from "./reportWebVitals";
import UpdateRecipe from"./updateRecipe";

const root = ReactDOM.createRoot(document.getElementById("root"));

const RecipeApp = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes from the backend
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:3001/getrecipes");
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<App recipes={recipes} />} />
        <Route path="/addrecipe" element={<AddRecipe />} />
        {recipes.map((recipe) => (
          <Route
            key={recipe._id}
            path={`/displayrecipe/${recipe.name}`}
            element={<DisplayRecipe recipe={recipe} />}
          />
        ))}
        <Route path="/editrecipe/:name" element={<UpdateRecipe />} />
      </Routes>
    </BrowserRouter>
  );
};

root.render(<RecipeApp />);

reportWebVitals();
