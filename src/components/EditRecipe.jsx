import React ,{useContext} from 'react'
import { appContext } from '../App'
import {v4 as uuidv4} from 'uuid'

export default function EditRecipe({selectedRecipe}) 
{
  const{updateRecipe,setSelectedRecipeId}=useContext(appContext)
  const{
   id,
   name,
  }=selectedRecipe

  function changeRecipe(change)
  {
    updateRecipe(id,{...selectedRecipe,...change}) 
  }
  function createIngredient()
  {
    const newIngredient=
    {
      id:uuidv4(),
      name:'',
      amount:''
    }

    changeRecipe({ingredients:[...selectedRecipe.ingredients,newIngredient]})
  }
  function createPeople()
  {
    const newPep={
      id:uuidv4(),
      name:''
    }
    changeRecipe({people:[...selectedRecipe.people,newPep]})
  }
  function updateIngredient(change,id)
  {
    const newIngredients = [...selectedRecipe.ingredients]
    const index = newIngredients.findIndex(ingredient=>ingredient.id===id)
    newIngredients[index]=change
    changeRecipe({ingredients:newIngredients})
  }
  function removeIngredient(id)
  {
    const newIngredients = selectedRecipe.ingredients.filter(ingredient=>ingredient.id!==id)
    changeRecipe({ingredients:newIngredients})
  }
  function updatePeople(id,change)
  {
    const newPeople = [...selectedRecipe.people]
    const index = newPeople.findIndex(pip=>pip.id===id)
    newPeople[index]=change
    changeRecipe({people:newPeople})
  }
  function removePeople(id)
  {
    const newPeople = selectedRecipe.people.filter(pip=>pip.id!==id)
    changeRecipe({people:newPeople})
  }

  return (
    <div className="flex-1 p-[2rem] border-[1px] rounded-[.5rem] border-gray-400 bg-slate-600 relative mb-[1rem]">
      <div className="fixed w-[46.3rem] max-w-[100%]">
        <button
          className="buttonCancel mb-[1rem] text-[2rem] w-[100%]"
          onClick={() => setSelectedRecipeId(undefined)}
        >
          &times;
        </button>
        <section className="flex flex-col mb-[2rem]">
          <div className="block text-black">
            <input
              className="input w-[100%]"
              type="text"
              name="name"
              value={name}
              onChange={(e) => changeRecipe({ name: e.target.value })}
            />
          </div>
        </section>
        <span className="text-white font-bold text-[1.5rem] mb-[1rem] block">
          Ingredients:
        </span>
        <div className="block text-black max-h-[15rem] overflow-y-auto mb-[1rem]">
          {selectedRecipe.ingredients.map((ingredient) => {
            return (
              <IngredientInput
                key={ingredient.id}
                ingredient={ingredient}
                updateIngredient={updateIngredient}
                removeIngredient={removeIngredient}
              />
            );
          })}
        </div>
        <span className="text-white font-bold text-[1.5rem] mb-[1rem] block">By:</span>
        <div className="flex flex-col gap-[1rem] text-black max-h-[15rem] overflow-y-auto">
          {selectedRecipe.people.map((pip) => {
            return (
              <PeopleInput
                key={pip.id}
                pip={pip}
                updatePeople={updatePeople}
                removePeople={removePeople}
              />
            );
          })}
        </div>
        <div className="flex gap-[1rem]">
          <button className="buttonAccept" onClick={createIngredient}>
            add ingredient
          </button>
          <button className="buttonAccept" onClick={createPeople}>
            add people
          </button>
        </div>
      </div>
    </div>
  );
}

function IngredientInput(props) 
{
   const{
    updateIngredient,
    removeIngredient,
    ingredient
   }=props

   const{
    id,
    name,
    amount,
   }=ingredient

   function changeIngredient(change,id)
   {
      updateIngredient({...ingredient,...change},id)
   }
   return (
     <div className='flex flex-col items-end text-white mb-[1rem] mr-[1rem]'>
       <button
        className='buttonCancel'
        onClick={()=>removeIngredient(id)}
       >&times;</button>
       <div className='flex flex-col font-bold w-[100%]'>
         <label htmlFor="name">Name</label>
         <input
           className='text-black font-normal input'
           type="text"
           name="name"
           value={name || ""}
           onChange={(e) => changeIngredient({ name: e.target.value }, id)}
         />
       </div>
       <div className='flex flex-col font-bold w-[100%]'>
         <label htmlFor="amount">Amount</label>
         <input
           className='text-black font-normal input'
           type="text"
           name="amount"
           value={amount || ""}
           onChange={(e) => changeIngredient({ amount: e.target.value }, id)}
         />
       </div>
     </div>
   );
}

function PeopleInput(props) 
{
  const{
    pip,
    updatePeople,
    removePeople
  }=props

  const{
   name,
   id
  }=pip

  function changeName(change,id)
  {
     updatePeople(id,{...pip,...change})
  }

  return(
    <div className="flex text-white gap-3 items-stretch mb-[2rem] pr-[1rem]">
      <div className="flex flex-col flex-1">
        <label htmlFor="name">Name</label>
        <input className='text-black input' type="text" value={name || ""} 
         onChange={e=>changeName({name:e.target.value},id)}
        />
      </div>
      <button
       className='buttonCancel text-[2rem] p-[5rem]'
       onClick={()=>removePeople(id)}
      >&times;</button>
    </div>
  )
}
    