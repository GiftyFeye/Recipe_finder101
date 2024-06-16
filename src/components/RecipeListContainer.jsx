import React, { useState } from 'react';
import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const RecipeListContainerStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 20px;
  justify-content: space-evenly;
`;

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  width: 300px;
  box-shadow: 0 3px 10px 0 #aaa;
`;

const RecipeName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin: 10px 0;
`;

const IngredientsText = styled.div`
  font-size: 18px;
  border: solid 1px green;
  color: black;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 4px;
  color: green;
  text-align: center;
  margin-bottom: 12px;
`;

const SeeMoreText = styled(IngredientsText)`
  border: solid 1px #eb3300;
  color: #eb3300;
`;

const CoverImage = styled.img`
  height: 200px;
`;

const IngredientsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const IngredientsTableHeader = styled.th`
  border-bottom: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const IngredientsTableCell = styled.td`
  border-bottom: 1px solid #ddd;
  padding: 8px;
`;

function RecipeListContainer({ recipes }) {
  const [open, setOpen] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [dialogContent, setDialogContent] = useState('ingredients'); // New state to control dialog content

  const handleClickOpen = (ingredients, recipe) => {
    setIngredients(ingredients);
    setSelectedRecipe(recipe);
    setDialogContent('ingredients'); // Shows ingredients table
    setOpen(true);
  };

  const handleSeeMoreClick = (recipe) => {
    setSelectedRecipe(recipe);
    setDialogContent('recipe'); // Shows full recipe details
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <RecipeListContainerStyled>
      {recipes.map((recipe, index) => (
        <RecipeContainer key={index}>
          <CoverImage src={recipe.recipe.image} alt={recipe.recipe.label} />
          <RecipeName>{recipe.recipe.label}</RecipeName>
          <IngredientsText onClick={() => handleClickOpen(recipe.recipe.ingredients, recipe.recipe)}>
            Ingredients
          </IngredientsText>
          <SeeMoreText onClick={() => handleSeeMoreClick(recipe.recipe)}>
            See complete Recipe
          </SeeMoreText>
        </RecipeContainer>
      ))}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedRecipe ? selectedRecipe.label : 'Ingredients'}</DialogTitle>
        <DialogContent>
          {dialogContent === 'ingredients' ? (
            <IngredientsTable>
              <thead>
                <tr>
                  <IngredientsTableHeader>Ingredient</IngredientsTableHeader>
                  <IngredientsTableHeader>Weight</IngredientsTableHeader>
                </tr>
              </thead>
              <tbody>
                {ingredients.map((ingredient, index) => (
                  <tr key={index}>
                    <IngredientsTableCell>{ingredient.text}</IngredientsTableCell>
                    <IngredientsTableCell>{ingredient.weight ? `${ingredient.weight.toFixed(2)} g` : 'N/A'}</IngredientsTableCell>
                  </tr>
                ))}
              </tbody>
            </IngredientsTable>
          ) : (
            <div>
              <CoverImage src={selectedRecipe.image} alt={selectedRecipe.label} />
              <p>{selectedRecipe.source}</p>
              <a href={selectedRecipe.url} target="_blank" rel="noopener noreferrer">
                Full Recipe
              </a>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          {dialogContent === 'recipe' && selectedRecipe && (
            <Button
              color="primary"
              onClick={() => window.open(selectedRecipe.url, '_blank')}
            >
              See Full Recipe
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </RecipeListContainerStyled>
  );
}

export default RecipeListContainer;

