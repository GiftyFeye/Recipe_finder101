import React, { useState } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import finder from '../assets/Images/finder.svg';
import Search from '../assets/Images/search_icon.svg';
import LoginComponent from './LoginComponent';
import LoginIcon from '../assets/Images/login_icon.svg'; // Ensure this path is correct

const Header = styled.div`
  color: white;
  background-color: green;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const AppNameComponent = styled.div`
  display: flex;
  align-items: center;
`;

const AppIcon = styled.img`
  width: 40px;
  height: 40px;
  margin: 15px;
`;

const SearchComponent = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  padding: 10px;
  border-radius: 6px;
  width: 50%;
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  margin-left: 15px;
  font-size: 16px;
  font-weight: bold;
`;

function HeaderComponent({ setRecipeList }) {
  const [timeoutId, updateTimeoutId] = useState();
  const [user, setUser] = useState(null); // New state to manage logged-in user

  const fetchRecipe = async (searchString) => {
    const App_Id = '0537ec5f'; 
    const App_Key = 'fdeaa1e2662b320bb4b7d9b46b8610b7'; 

    try {
      const response = await Axios.get(`https://api.edamam.com/search`, {
        params: {
          q: searchString,
          app_id: App_Id,
          app_key: App_Key,
        },
      });
      setRecipeList(response.data.hits);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => fetchRecipe(event.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <Header>
      <AppNameComponent>
        <AppIcon src={finder} />
        Recipe Finder
      </AppNameComponent>
      <SearchComponent>
        <SearchIcon src={Search} />
        <SearchInput placeholder="Search Recipe" onChange={onTextChange} />
      </SearchComponent>
      <LoginComponent icon={LoginIcon} setUser={setUser} />
    </Header>
  );
}

export default HeaderComponent;
