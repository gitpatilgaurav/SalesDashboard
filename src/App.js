import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { getDataAction } from "./action/Action";
import HomePage from "./components/HomePage";


function App() {
  const dispatch = useDispatch();
  const apiData = useSelector((state) => state.ApiReducer);
  // console.log(apiData);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await fetch("http://localhost:8000/data");
      if (!res.ok) {
        throw new Error("Invalid Respose");
      }
      const data = await res.json();
      if (!data) {
       console.log('No Data Found')
        return;
      }
      dispatch(getDataAction(data));
    } catch (error) {
      console.error("Error ", error);
    }
  };
  

  return (
    <div className="App">
      {apiData.length === 0 ? (
        <div className="loading">
          <img
            src="https://i.pinimg.com/originals/c7/e1/b7/c7e1b7b5753737039e1bdbda578132b8.gif"
            alt=""
          />
          <p> Loading data...</p>
        </div>
      ) : (
        <HomePage getdata={getData} />
      )}
    </div>
  );
}
export default App;