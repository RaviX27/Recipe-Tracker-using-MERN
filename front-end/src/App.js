import React, { useState, useEffect } from "react";
import RecipeCard from "./recipeCard.js";
import './App.css';

function App() {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    // Fetch titles from the backend
    const fetchTitles = async () => {
      try {
        const response = await fetch('http://localhost:3001/gettitles');
        const data = await response.json();
        setTitles(data);
      } catch (error) {
        console.error("Error fetching titles:", error);
      }
    };

    fetchTitles();
  }, []);

  return (
    <div>
      <RecipeCard titles={titles} />
    </div>
  );
}

export default App;
