import styled from 'styled-components';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useState } from 'react';



export const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  width: 300px;
  box-shadow: 0 3px 10px 0 #bbb;
`;

export const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 20px;
  justify-content: space-evenly;
`;

export const CoverImage = styled.img`
  height: 200px;
`;

export const RecipeName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin: 10px 0;
`;

export const IngredientsText = styled.span`
  font-size: 18px;
  border: solid 1px #09ed2c;
  color: black;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  color: #09ed2c;
  text-align: center;
  margin-bottom: 10px;
`;

export const SeeMoreText = styled.span`
  font-size: 18px;
  border: solid 1px red;
  color: black;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  color: red;
  text-align: center;
  margin-bottom: 10px;
`;

export const Placeholder = styled.img`
    width: 240px;
    height: 240px;
    margin: 200px;
`;

export const SaveButton = styled.span`
  font-size: 18px;
  border: solid 1px black;
  color: black;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  color: black;
  text-align: center;
  margin-bottom: 10px;
`;

export function RecipeComponent(props) {

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