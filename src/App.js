import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RootNavigator from "./routes/RootNavigator";

function App() {
  return (
    <BrowserRouter>
      <RootNavigator />
    </BrowserRouter>
  );
}

export default App;
