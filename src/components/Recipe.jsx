import React,{useContext} from 'react'
import { appContext } from '../App';
import Ingredient from './Ingredient';
import People from './People';

export default function Recipe(props) 
{
  const{removeRecipe,findRecipeById}=useContext(appContext);

  const{
    id,
    name,
    servings,
    cookTime,
    instructions,
    ingredients,
    people,
  }=props

  return (
    <section className="flex border-[1px] border-gray-400 bg-slate-600 p-[2rem] rounded-[.5rem] flex-col gap-[.8rem] w-[100%] text-[1.2rem] mb-[1rem]">
      <div className="flex flex-1 justify-between">
        <h1 className="block text-[2rem] font-bold uppercase">{name}</h1>
        <div className="flex gap-[1rem]">
          <button className="buttonAccept" onClick={() => findRecipeById(id)}>
            edit
          </button>
          <button className="buttonCancel" onClick={() => removeRecipe(id)}>
            delete
          </button>
        </div>
      </div>
      <span>
        <strong>Servings: </strong>
        {servings}
      </span>
      <span>
        <strong>CookTime: </strong>
        {cookTime}
      </span>
      <div className="flex flex-col">
        <strong className="mb-[1rem]">Instructions: </strong>
        <textarea
          className="bg-zinc-800 rounded-[.5rem] resize-none h-[12rem]"
          name=""
          id=""
          cols="30"
          rows="10"
          readOnly
          value={instructions}
        ></textarea>
      </div>
      <strong>Ingredients: </strong>
      <div className="flex flex-col gap-[1rem] max-h-[30rem] overflow-y-auto">
        {ingredients.map((ingredient) => {
          return <Ingredient key={ingredient.id} {...ingredient} />;
        })}
      </div>
      <div className="flex flex-col gap-[1rem] max-h-[30rem] overflow-y-auto">
        <strong>By:</strong>
        {people.map((pip) => {
          return <People key={pip.id} {...pip} />;
        })}
      </div>
    </section>
  );
}
