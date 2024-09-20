import React, { useState } from 'react';
import styled from 'styled-components';
import finder from './assets/Images/finder.svg';
import HeaderComponent from './components/HeaderComponent';
import RecipeListContainer from './components/RecipeListContainer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Placeholder = styled.img`
  width: 200px;  
  height: auto; 
  margin: 200px auto; 
  opacity: 50%;
`;

const App = () => {
  const [recipeList, setRecipeList] = useState([]);

  return (
    <Container>
      <HeaderComponent setRecipeList={setRecipeList} />
      <RecipeListContainer recipes={recipeList} />
      {recipeList.length === 0 && <Placeholder src={finder} alt="cutlery search symbol" />}
    </Container>
  );
};

export default App;

