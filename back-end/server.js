const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const recipe = require('./recipes');

// Connect to MongoDB Atlas
mongoose.connect(
    `mongodb+srv://ravimal:umandaravimal@cluster0.5ofy2li.mongodb.net/?retryWrites=true&w=majority`
).then(() => {
    console.log('Database Connected');
});

const app = express();
app.use(express.json());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Route to save a new recipe
app.post('/save', async (req, res) => {
    const { name, ingredients, Description } = req.body;

    try {
        const newRecipe = new recipe({
            name: name,
            ingredients: ingredients,
            Description: Description,
        });
        await newRecipe.save();
        res.status(201).send("Recipe Added Successfully!");
    } catch (error) {
        res.status(500).send("Internal Server Error!");
        console.log(error);
    }
});

// Route to get only recipe titles
app.get('/gettitles', async (req, res) => {
    try {
        const recipes = await recipe.find({}, 'name');
        const recipeNames = recipes.map(recipe => recipe.name);
        res.status(200).json(recipeNames);
    } catch (error) {
        res.status(500).send("Internal Server Error!");
        console.log(error);
    }
});

// Route to get all recipes
app.get('/getrecipes', async (req, res) => {
    try {
        const recipes = await recipe.find({});
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).send("Internal Server Error!");
        console.log(error);
    }
});

// Route to delete a recipe by name
app.delete('/deleterecipes/:name', async (req, res) => {
    const recipeName = req.params.name;

    try {
        const deletedRecipe = await recipe.findOneAndDelete({ name: recipeName });

        if (!deletedRecipe) {
            return res.status(404).send("Recipe not found");
        }

        res.status(200).json({ message: "Recipe deleted successfully", deletedRecipe });
    } catch (error) {
        res.status(500).send("Internal Server Error!");
        console.log(error);
    }
});

// Route to update a recipe by name using HTTP PUT method
app.put('/editrecipe/:name', async (req, res) => {
    const recipeName = req.params.name;
    const { ingredients, Description } = req.body;

    try {
        const updatedRecipe = await recipe.findOneAndUpdate(
            { name: recipeName },
            { $set: { ingredients: ingredients, Description: Description } },
            { new: true } // Return the updated document
        );

        if (!updatedRecipe) {
            return res.status(404).send("Recipe not found");
        }

        res.status(200).json({ message: "Recipe updated successfully", updatedRecipe });
    } catch (error) {
        res.status(500).send("Internal Server Error!");
        console.log(error);
    }
});

// Route to get a specific recipe by name
app.get('/getrecipe/:name', async (req, res) => {
    const recipeName = req.params.name;

    try {
        const foundRecipe = await recipe.findOne({ name: recipeName });

        if (!foundRecipe) {
            return res.status(404).send("Recipe not found");
        }

        res.status(200).json({ recipe: foundRecipe });
    } catch (error) {
        res.status(500).send("Internal Server Error!");
        console.log(error);
    }
});

// Test route
app.get('/test', async (req, res) => {
    res.send("Hello, World!");
});

// Start the server on port 3001
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
