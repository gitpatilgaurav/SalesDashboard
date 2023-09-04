import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {getDataAction}  from "./action/Action";
import HomePage from "./components/Homepage/HomePage";

function App() {
  const dispatch = useDispatch();
  const apiData = useSelector(state=>state.ApiReducer);
  console.log(apiData)
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {

    const res = await fetch("http://localhost:8000/data");
    const data = await res.json();
    // console.log(data)
    dispatch(getDataAction(data))
  };

  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;


