import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Grid, Typography, TextField } from "@mui/material";

const AddRecipe = () => {
  const [recipeData, setRecipeData] = useState({
    name: "",
    ingredients: "",
    Description: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    // Handle response logic here
    console.log(responseMessage);
  }, [responseMessage]);

  const handleSave = async () => {
    try {
      // Send a POST request to the backend
      console.log(recipeData);
      const response = await axios.post(
        "http://localhost:3001/save",
        recipeData
      );

      setResponseMessage(response.data);

      setRecipeData({
        name: "",
        ingredients: "",
        Description: "",
      });
      window.alert("Recipe saved successfully");
    } catch (error) {
      // Handle errors
      window.alert("Failed to save recipe");
      console.error("Error saving recipe:", error);
    }
  };

  const handleInputChange = (e) => {
    // Update the recipeData state when input values change
    setRecipeData({
      ...recipeData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "16px",
        padding: "100px 500px",
      }}
    >
      <Grid item xs={12}>
        <Typography
          component={"h1"}
          sx={{
            color: "#000000",
            marginBottom: "10px",
            fontSize: "21px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Add A New Recipe
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
              id="name"
              label="Recipe Name"
              variant="outlined"
              fullWidth
              value={recipeData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="ingredients"
              label="Ingredients"
              variant="outlined"
              fullWidth
              value={recipeData.ingredients}
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
              value={recipeData.Description}
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
            onClick={handleSave}
          >
            Save
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default AddRecipe;
