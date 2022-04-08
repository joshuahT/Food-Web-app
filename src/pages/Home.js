import { useState } from 'react';
import Axios from "axios";
import {
  RecipeComponent,
  RecipeListContainer,
  Placeholder
} from "../components/RecipeComponent.js";

export default function Home() {

  const [timeoutId, updateTimeoutId] = useState();
  const [reciptList, updateReciptList] = useState([]);

  const fetchRecipe = async (searchString) => {
    const response = await Axios.get(
      // `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}&random=true`
      `https://api.edamam.com/api/recipes/v2?type=public&q=${searchString}&app_id=${process.env.REACT_APP_APP_IDD}&app_key=${process.env.REACT_APP_APP_KEY}&random=true`
    );
    updateReciptList(response.data.hits);
  };

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => fetchRecipe(event.target.value), 1000);
    updateTimeoutId(timeout);
  };

  return (
    <div className="homepage">
      <img src="/search-icon.svg" alt='search icon' />
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