import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, TextField } from "@mui/material";
import { useParams } from "react-router-dom";

const UpdateRecipe = () => {
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");
  const { name } = useParams();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`http://localhost:3001/getrecipe/${name}`);
        const data = await response.json();
        setIngredients(data.recipe.ingredients);
        setDescription(data.recipe.Description);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [name]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "ingredients") {
      setIngredients(value);
    } else if (id === "Description") {
      setDescription(value);
    }
  };

  const handleUpdate = async () => {
    try {
        const updateData = JSON.stringify({ ingredients, description })
        console.log(updateData)
      const response = await fetch(`http://localhost:3001/editrecipe/${name}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ingredients,
            Description: description,
          }),
      });

      if (response.ok) {
        console.log("Recipe updated successfully");
        window.alert("Recipe updated successfully");
      } else {
        console.error("Failed to update recipe");
        window.alert("Failed to update recipe");
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '100px 500px',
      }}
    >
      <Grid item xs={12}>
        <Typography
          component={"h1"}
          sx={{
            color: "#000000",
            marginBottom: "10px",
            fontSize: "24px",
            textAlign: "center",
            fontFamily:'Arial, sans-serif',
            fontWeight: 'bold',
          }}
        >
          Update Recipe - {name}
        </Typography>
      </Grid>

      <form>
        <Grid
          container
          item
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ margin: "auto" }}
        >
          <Grid item xs={12}>
            <TextField
              id="ingredients"
              label="Ingredients"
              variant="outlined"
              fullWidth
              value={ingredients}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="Description"
              label="Description"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={description}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Button
            sx={{
              alignItems: "center",
              color: "#000000",
              margin: "10px 15px",
              backgroundColor: "#00c6e6",
              "&:hover": {
                opacity: "0.7",
                backgroundColor: "#00c6e6",
              },
            }}
            type="button"
            onClick={handleUpdate}
          >
            Update
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default UpdateRecipe;
