import styled from 'styled-components';

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
`;

export const Placeholder = styled.img`
    width: 240px;
    height: 240px;
    margin: 200px;
`;
