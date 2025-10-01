import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Invitation from "./components/Invitation";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Invitation />
    </div>
  );
}

export default App;
