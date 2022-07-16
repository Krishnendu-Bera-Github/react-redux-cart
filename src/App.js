import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";
import Cart from "./components/Cart";

function App() {
  return (
    <div>
      <Provider store={store}>
        <Cart />
      </Provider>
    </div>
  );
}

export default App;
