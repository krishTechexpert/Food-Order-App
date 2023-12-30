import {useState,useEffect} from 'react';
import MealsItem from './MealsItem';
function Meals(){
  const [loadedMeals,setLoadedMeals] =useState([]);

  async function fetchMeals(){
      const response =  await fetch('http://localhost:3000/meals')
      
      try{
        if(!response.ok){
          throw new Error('something went to wrong fetch api...')
        }
        const data = await response.json();
        setLoadedMeals(data)
      }catch(error){
          console.log(error)
      }
  }

  useEffect(() => {
    fetchMeals()
  },[])

  return <ul id="meals">{
    loadedMeals.length >0 && loadedMeals.map(meals => {
      return <MealsItem key={meals.id} meal = {meals} />
    })
    }</ul>
}
export default Meals;