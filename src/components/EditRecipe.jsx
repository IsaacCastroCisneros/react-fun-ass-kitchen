import React ,{useContext} from 'react'
import { appContext } from '../App'

export default function EditRecipe({selectedRecipe}) 
{
  const{updateRecipe,setSelectedRecipeIndex}=useContext(appContext)
  const{
   id,
   name,
  }=selectedRecipe

  function changeRecipe(change)
  {
    updateRecipe(id,{...selectedRecipe,...change}) 
  }

  return (
    <div className="block flex-1">
      <div className="fixed">
        <button onClick={() => setSelectedRecipeIndex(undefined)}>
          &times;
        </button>
        <div className="block text-black">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => changeRecipe({name: e.target.value})}
          />
        </div>
      </div>
    </div>
  );
}
