import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';

export default function DisplayRecipe({ recipe }) {
  const { name, ingredients, Description} = recipe;
  console.log(recipe)

  return (
    <Box>
    <Typography 
        variant="h3" 
        align="center" 
        sx={{ 
          marginTop: '75px',
          fontFamily:'Arial, sans-serif',
          fontWeight: 'bold',
           }}>
        Recipe of {name}
      </Typography>
    <div style={{ marginTop:'20px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Card sx={{ 
          width: '50%',
          height: '50%',
          backgroundColor:'#87CEEB',
      }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={`/${name.toLowerCase()}.webp`}
            alt={name}
          />
          <CardContent sx={{ fontFamily: 'Roboto, sans-serif', color: '#333' }}>
              <Typography gutterBottom variant="h5" component="div" sx={{fontSize:'24px', fontWeight:'Bold'}}>
                {name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize:'21px', fontWeight:'Bold' }}>
                Ingredients:
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize:'18px'}}>
                {ingredients}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" mt={2} sx={{fontSize:'21px', fontWeight:'Bold'}}>
                Description:
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize:'18px'}}>
                {Description}
              </Typography>
            </CardContent>
        </CardActionArea>
      </Card>
    </div>
    </Box>
  );
}
