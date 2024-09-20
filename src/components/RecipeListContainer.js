import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import filledHeartIcon from '../assets/Images/red_heart.svg';
import emptyHeartIcon from '../assets/Images/line_heart.svg';

const RecipeListContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FilterButton = styled(Button)`
  margin: 20px;
`;

const RecipeGrid = styled.div`
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

const RecipeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

const RecipeName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: black;
`;

const FavoriteIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
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
  object-fit: cover;
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

const DialogContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const RecipeSource = styled.a`
  font-size: 18px;
  margin-top: 10px;
  color: #0000ee;
  text-decoration: underline;
  cursor: pointer;
`;

const StoreLinksContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StoreLinksTitle = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

const StoreLinks = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const StoreLink = styled.a`
  color: #0000ee;
  text-decoration: underline;
  cursor: pointer;
`;

const CustomDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 500px;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

function RecipeListContainer({ recipes }) {
  const [open, setOpen] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [dialogContent, setDialogContent] = useState('ingredients');
  const [favoriteRecipes, setFavoriteRecipes] = useState(() => {
    const savedFavorites = localStorage.getItem('favoriteRecipes');
    return savedFavorites ? new Set(JSON.parse(savedFavorites)) : new Set();
  });
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes]));
  }, [favoriteRecipes]);

  const handleClickOpen = (ingredients, recipe) => {
    setIngredients(ingredients);
    setSelectedRecipe(recipe);
    setDialogContent('ingredients');
    setOpen(true);
  };

  const handleSeeMoreClick = (recipe) => {
    setSelectedRecipe(recipe);
    setDialogContent('recipe');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleFavorite = (recipeUri) => {
    setFavoriteRecipes((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(recipeUri)) {
        newFavorites.delete(recipeUri);
      } else {
        newFavorites.add(recipeUri);
      }
      return newFavorites;
    });
  };

  const filteredRecipes = showFavorites
    ? recipes.filter((recipe) => favoriteRecipes.has(recipe.recipe.uri))
    : recipes;

  const renderStoreLinks = () => {
    const baseUrls = {
      rewe: 'https://www.rewe.de/',
      edeka: 'https://www.edeka.de/',
      lidl: 'https://www.lidl.de/',
      aldi: 'https://www.aldi.de/',
    };

    return (
      <StoreLinksContainer>
        <StoreLinksTitle>Shop your ingredients here:</StoreLinksTitle>
        <StoreLinks>
          {Object.entries(baseUrls).map(([store, url]) => (
            <StoreLink key={store} href={url} target="_blank" rel="noopener noreferrer">
              {store.charAt(0).toUpperCase() + store.slice(1)}
            </StoreLink>
          ))}
        </StoreLinks>
      </StoreLinksContainer>
    );
  };

  return (
    <RecipeListContainerStyled>
      {recipes.length > 0 && (
        <FilterButton
          variant="contained"
          color="success"
          onClick={() => setShowFavorites((prev) => !prev)}
        >
          {showFavorites ? 'Show All Recipes' : 'Show Favorite Recipes'}
        </FilterButton>
      )}
      <RecipeGrid>
        {filteredRecipes.map((recipe, index) => (
          <RecipeContainer key={index}>
            <CoverImage src={recipe.recipe.image} alt={recipe.recipe.label} />
            <RecipeHeader>
              <RecipeName>{recipe.recipe.label}</RecipeName>
              <FavoriteIcon
                src={
                  favoriteRecipes.has(recipe.recipe.uri)
                    ? filledHeartIcon
                    : emptyHeartIcon
                }
                alt="Favorite"
                onClick={() => toggleFavorite(recipe.recipe.uri)}
              />
            </RecipeHeader>
            <IngredientsText
              onClick={() =>
                handleClickOpen(recipe.recipe.ingredients, recipe.recipe)
              }
            >
              Ingredients
            </IngredientsText>
            <SeeMoreText onClick={() => handleSeeMoreClick(recipe.recipe)}>
              See complete Recipe
            </SeeMoreText>
          </RecipeContainer>
        ))}
      </RecipeGrid>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style:
            dialogContent === 'recipe'
              ? {
                  width: '500px',
                  height: '500px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }
              : {},
        }}
      >
        <DialogTitle>
          {selectedRecipe ? selectedRecipe.label : 'Ingredients'}
        </DialogTitle>
        <DialogContent>
          {dialogContent === 'ingredients' ? (
            <>
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
                      <IngredientsTableCell>
                        {ingredient.weight ? `${ingredient.weight.toFixed(2)} g` : 'N/A'}
                      </IngredientsTableCell>
                    </tr>
                  ))}
                </tbody>
              </IngredientsTable>
              {renderStoreLinks()}
            </>
          ) : (
            <DialogContentWrapper>
              <CoverImage src={selectedRecipe.image} alt={selectedRecipe.label} />
              <p>
                <RecipeSource
                  href={selectedRecipe.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedRecipe.source}
                </RecipeSource>
              </p>
            </DialogContentWrapper>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Close
          </Button>
          {dialogContent === 'recipe' && selectedRecipe && (
            <Button
              color="success"
              href={selectedRecipe.url}
              target="_blank"
              rel="noopener noreferrer"
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


