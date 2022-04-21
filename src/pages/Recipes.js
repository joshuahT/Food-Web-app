import '../styles/App.css';
import React, { useEffect, useState } from 'react';
import Axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import foodLogo from '../images/food-app-icon.png'
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
      <RecipeContainer className='recipe-container'>
        <CoverImage src={recipeObj.image} />
        <RecipeName>{recipeObj.label}</RecipeName>
        <IngredientsText onClick={() => setPopUp(true)}>Ingredients</IngredientsText>
        <SeeMoreText onClick={() => window.open(recipeObj.url)}>See complete Recipe</SeeMoreText>
        <SaveButton onClick={() => Save(recipeObj)}>Save</SaveButton>
      </RecipeContainer>
    </>
  );
};
function Save(x) {

  const saveObj = { label: x.label, ingredient: x.ingredientLines, image: x.image, url: x.url }
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
function Recipes() {
  const [reciptList, updateReciptList] = useState([]);
  const fetchRecipe = async () => {
    const response = await Axios.get(
      `https://api.edamam.com/api/recipes/v2?type=public&q=dish&app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}&random=true`
    );
    updateReciptList(response.data.hits);
  };

  useEffect(() => {
    fetchRecipe()
  }, [])
  return (
    <div className="recipe-page" align="center">
      <h1>Random Recipe Page</h1>
      <RecipeListContainer>
        {reciptList.length ?
          reciptList.map((recipeObj) => (
            <RecipeComponent recipeObj={recipeObj.recipe} />
          )) : <Placeholder src={foodLogo} />}
      </RecipeListContainer>
    </div>
  )
}

export default Recipes;
