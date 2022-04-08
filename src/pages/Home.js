import '../styles/App.css';
import React, { useState } from 'react';
import Axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
//import { Placeholder } from 'react-bootstrap';
import {
  RecipeContainer,
  RecipeListContainer,
  CoverImage,
  RecipeName,
  IngredientsText,
  SeeMoreText,
  Placeholder
} from "../components/recipeComponent";



const RecipeComponent = (props) => {
  const [popUp, setPopUp] = useState(false);
  const { recipeObj } = props;
  return (
    <>
      <Dialog open={popUp}>
        <DialogTitle>Ingredients</DialogTitle>
        <DialogContent>
          <table>
            <tbody>
              {recipeObj.ingredients.map((ingredientObj) => (
                <tr>
                  <td>{ingredientObj.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <SeeMoreText onClick={() => setPopUp("")}>Close</SeeMoreText>
        </DialogActions>
      </Dialog>
      <RecipeContainer>
        <CoverImage src={recipeObj.image} />
        <RecipeName>{recipeObj.label}</RecipeName>
        <IngredientsText onClick={() => setPopUp(true)}>Ingredients</IngredientsText>
        <SeeMoreText onClick={() => window.open(recipeObj.url)}>See complete Recipe</SeeMoreText>
      </RecipeContainer>
    </>
  );
};
function Home() {

  const [timeoutId, updateTimeoutId] = useState();
  const [reciptList, updateReciptList] = useState([]);

  const fetchRecipe = async (searchString) => {
    const response = await Axios.get(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${searchString}&app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}&random=true`
    );
    updateReciptList(response.data.hits);
  };

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => fetchRecipe(event.target.value), 1000);
    updateTimeoutId(timeout);
  };

  return (
    <div className="home">
      <h1>Home Page</h1>
      <img src="/search-icon.svg" />
      <input placeholder="Search Recipe" onChange={onTextChange} />
      <RecipeListContainer>
        {reciptList.length ?
          reciptList.map((recipeObj) => (
            <RecipeComponent recipeObj={recipeObj.recipe} />
          )) : <Placeholder src="food-app-icon.png" />}
      </RecipeListContainer>
    </div>
  )
}

export default Home;