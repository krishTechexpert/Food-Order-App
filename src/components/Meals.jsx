import MealsItem from './MealsItem';
import useHttp from '../hooks/useHttp';
import Error from './Error';
const configRequest = {};


function Meals(){

  const{data:loadedMeals,error,isLoading} = useHttp('http://localhost:3000/meals',configRequest,[])

  if(isLoading){
    return <p className='center'>Fetching Meals...</p>
  }
  if(error){
    return <Error title="Failed to fetch!" message={error} />
  }

  return <ul id="meals">{
    loadedMeals.length >0 && loadedMeals.map(meals => {
      return <MealsItem key={meals.id} meal = {meals} />
    })
    }</ul>
}
export default Meals;