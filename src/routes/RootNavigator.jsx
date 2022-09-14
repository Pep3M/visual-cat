import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Manager from "../pages/Manager";

const RootNavigator = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/manager" element={<Manager />} />
      </Routes>
    </>
  );
};

export default RootNavigator;
