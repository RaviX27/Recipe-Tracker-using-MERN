import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from '@mui/icons-material/Update';
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

const RecipeCard = ({ titles }) => {
  const navigate = useNavigate();

  const handleUpdate = (title) => {
    navigate(`/editrecipe/${title}`);
  };

  const handleDelete = async (title) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the recipe "${title}"?`
    );

    if (isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:3001/deleterecipes/${title}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          console.log("Recipe deleted successfully");
          window.alert("Recipe deleted successfully");
        } else {
          console.error("Failed to delete recipe");
          window.alert("Failed to delete recipe");
        }
      } catch (error) {
        console.error("Error deleting recipe:", error);
      }
    }
  };

  return (
    <Box>
      <Typography
        variant="h3"
        align="center"
        sx={{
          marginTop: "75px",
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
        }}
      >
        Recipe Tracker
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "16px",
          padding: "16px",
          marginTop: "20px",
        }}
      >
        <Card
          sx={{
            height: "200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backgroundColor: "#87CEEB",
            "&:hover": {
              backgroundColor: "#6CA6CD",
            },
          }}
          onClick={() => navigate("/addrecipe")}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <AddCircleOutlinedIcon sx={{ fontSize: 50 }} />
              <Typography gutterBottom variant="h5" component="div">
                Add a recipe
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {titles.map((title, index) => (
          <Card
            key={index}
            sx={{
              backgroundColor: "#87CEEB",
              "&:hover": {
                backgroundColor: "#6CA6CD",
              },
            }}
          >
            <CardMedia
              component="img"
              alt={title}
              height="100"
              image={`/${title.toLowerCase()}.webp`}
            />
            <CardContent
              sx={{
                cursor: "pointer",
              }}
              onClick={() => navigate(`/displayrecipe/${title}`)}
            >
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
            </CardContent>
            <CardActions sx={{ marginTop: "-10px" }}>
              <Button size="small" variant="outlined"
                startIcon={<UpdateIcon />} onClick={() => handleUpdate(title)}
                sx={{
                  color:'black',
                  "&:hover": {
                    backgroundColor: "#E893CF",
                    color:'blue',
                  },
                }}
              >
                Update
              </Button>
              <Button
                size="small"
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete(title)}
                sx={{
                  color:'black',
                  "&:hover": {
                    backgroundColor: "#E893CF",
                    color:'blue',
                  },
                }}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default RecipeCard;
