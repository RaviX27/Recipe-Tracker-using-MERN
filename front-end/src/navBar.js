import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function NavBar() {
  const handleRefreshClick = () => {
    window.location.reload();
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          textAlign: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#2196f3",
          padding: "12px",
          paddingBottom: "15px",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
          <Typography
            sx={{
              borderRadius:'10px',
              minWidth: 100,
              color: "#fff",
              "&:hover": {
                backgroundColor: "#FEA82F",
                color: "fff",
              },
            }}
          >
            Home
          </Typography>
        </Link>
        <Link to="/addrecipe" style={{ textDecoration: "none", color: "#fff" }}>
          <Typography sx={{
              borderRadius:'10px',
              minWidth: 100,
              color: "#fff",
              "&:hover": {
                backgroundColor: "#FEA82F",
                color: "fff",
              },
            }}>
            Add Recipe
          </Typography>
        </Link>
        <Typography
          sx={{
            borderRadius:'10px',
            minWidth: 100,
            color: "#fff",
            cursor:'pointer',
            "&:hover": {
              backgroundColor: "#FEA82F",
              color: "fff",
            },
          }}
          onClick={handleRefreshClick}
        >
          Refresh
        </Typography>
      </Box>
    </React.Fragment>
  );
}
