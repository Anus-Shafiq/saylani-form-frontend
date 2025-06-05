import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ImageCard from "./component/imageCard";

import Tab from "./component/tabs";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ImageCard />
      <Tab />
    </>
  );
}

export default App;
