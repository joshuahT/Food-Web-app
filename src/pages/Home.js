import '../styles/App.css';
import React, { useState } from 'react';
import Axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import searchBar from '../images/search-icon.svg'
import foodLogo from '../images/food-app-icon.png'
// import { Placeholder } from 'react-bootstrap';
import {
  RecipeContainer,
  RecipeListContainer,
  CoverImage,
  RecipeName,
  IngredientsText,
  SeeMoreText,
  Placeholder,
  SaveButton
} from "../components/RecipeComponent";



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
        <SaveButton onClick={() => Save(recipeObj)}>Save</SaveButton>
        {/* <button onClick={() => Save(recipeObj)}>Save</button> */}

      </RecipeContainer>
    </>
  );
};
function Save(x) {
  const saveObj = { label: x.label, ingredient: x.ingredientLines, image: x.image, url: x.url }
  // saveList.push(x.label)
  // saveList.push(x.ingredientLines)
  // console.log(x)
  // console.log(x.label);
  // console.log(x.ingredientLines)
  console.log(saveObj)
  fetch('/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(saveObj)
  });
  alert("Saved to profile!")
}
function Home() {

  const [timeoutId, updateTimeoutId] = useState();
  const [reciptList, updateReciptList] = useState([]);

  const fetchRecipe = async (searchString) => {
    const response = await Axios.get(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${searchString}&app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}&random=true`
    );
    updateReciptList(response.data.hits);
    console.log(response.data.hits)
  };

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => fetchRecipe(event.target.value), 1000);
    updateTimeoutId(timeout);
  };

  return (
    <div className="home" align="center">
      <h1>Home Page</h1>
      <br></br>
      <img src={searchBar} />
      <input placeholder="Search Recipe" onChange={onTextChange} />
      <RecipeListContainer>
        {reciptList.length ?
          reciptList.map((recipeObj) => (
            <RecipeComponent recipeObj={recipeObj.recipe} />
          )) : <Placeholder src={foodLogo} />}
      </RecipeListContainer>
    </div>
  )
}

export default Home;