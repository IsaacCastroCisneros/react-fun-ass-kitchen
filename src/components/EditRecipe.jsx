import React ,{useContext} from 'react'
import { appContext } from '../App'

export default function EditRecipe({selectedRecipe}) 
{
  const{updateRecipe}=useContext(appContext)
  const{
   id
  }=selectedRecipe

  function changeRecipe(change)
  {
    updateRecipe(id,{...selectedRecipe,...change}) 
  }

  return (
    <div className='block flex-1'>
      <div className=''>
         <div className='block text-black'>
            <input type="text" name='name'
             onChange={e=>changeRecipe({name:e.target.value})}
            />
         </div>
      </div>
    </div>
  )
}
