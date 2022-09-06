import React,{ useState,useContext,useEffect } from 'react'
import Recipe from './components/Recipe';
import EditRecipe from './components/EditRecipe';
import {v4 as uuidv4} from 'uuid';

export const appContext = React.createContext();  

const LOCAL_STORAGE_KEY = 'recipes';

function App() 
{
  const[recipes,setRecipes]=useState([]);
  const[selectedRecipeIndex,setSelectedRecipeIndex]=useState({});

  let selectedRecipe = recipes[selectedRecipeIndex]

  useEffect(()=>
  {
    const locals = localStorage.getItem(LOCAL_STORAGE_KEY)
    if(locals!==null)setRecipes(JSON.parse(locals))
  },[])
  useEffect(()=>
  {
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(recipes))
  },[recipes])

  const contextValues=
  {
    createRecipe,
    removeRecipe,
    findRecipeIndex,
    updateRecipe
  }

  function createRecipe()
  {
    const newRecipe=
    {
      id:uuidv4(),
      name:'',
      servings:0,
      cookTime:'',
      instructions:'',
      ingredients:
      [
        {
          id:uuidv4(),
          name:'',
          amount:''
        }
      ],
      people:[]
    }

    setRecipes([...recipes,newRecipe])
  }
  function removeRecipe(id)
  {
    setRecipes(prev=>prev.filter(recipe=>recipe.id!==id))
  }
  function findRecipeIndex(id)
  {
    setSelectedRecipeIndex(recipes.findIndex(recipe=>recipe.id===id))
  }  
  function updateRecipe(id,recipe)
  {
     const newRecipes = [...recipes];
     const index = recipes.findIndex(recipe=>recipe.id===id);
     newRecipes[index]=recipe;
     setRecipes(newRecipes)
  }

  return (
    <appContext.Provider value={contextValues}>
      <Header />
      <main className="flex relative items-start pt-[12rem] px-[1rem] pb-[2rem]">
        <div className="flex-1">
          {recipes.map((recipe) => {
            return <Recipe key={recipe.id} {...recipe} />;
          })}
        </div>
        <button onClick={()=>setSelectedRecipeIndex(undefined)}>&times;</button>
        {selectedRecipe && <EditRecipe selectedRecipe={selectedRecipe} />} 
      </main>
    </appContext.Provider>
  );
}


function Header({}) 
{
  const{createRecipe}=useContext(appContext)

  return (
    <header className="w-[100%] bg-slate-600 fixed z-[500] shadow-[.5rem_0rem_1rem_#000]">
    <span className="block text-white font-bold py-[.5rem] px-[1rem] text- text-center uppercase bg-gradient-to-b from-pink-300 to-pink-600">
        fun ass kitchen
    </span>
      <section className="flex p-[1rem] w-[100rem] gap-x-[4rem] gap-y-[1rem] flex-wrap max-w-[100%] my-0 mx-auto">
        <button className="buttonAccept flex-[4] min-w-[8rem] uppercase"
         onClick={createRecipe}
        >add recipe</button>
        <form className="flex flex-[2] items-center gap-[1rem] p-[.5rem] rounded-[.5rem] bg-zinc-800" action="">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input className="placeholder:text-gray-400 outline-none bg-transparent" type="text" placeholder="search something" />
        </form>
      </section>
   </header>
   );
}
  

export default App