import React, { useState } from 'react';
import styled from 'styled-components';
import HeaderComponent from './components/HeaderComponent';
import RecipeListContainer from './components/RecipeListContainer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const App = () => {
  const [recipeList, setRecipeList] = useState([]);

  return (
    <Container>
      <HeaderComponent setRecipeList={setRecipeList} />
      <RecipeListContainer recipes={recipeList} />
      
    </Container>
  );
};

export default App;
