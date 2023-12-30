import Cart from "./components/Cart";
import Header from "./components/Header";
import Meals from "./components/Meals";
import {AppContextProvider} from "./store.js/AppContext";
import { UserProgressContextProvider } from "./store.js/UserProgressContext";
function App() {
  return (
    <>
    <UserProgressContextProvider>
        <AppContextProvider>
          <Header />
          <Meals/>
          <Cart/>
        </AppContextProvider>
      </UserProgressContextProvider>
    </>
  );
}

export default App;
