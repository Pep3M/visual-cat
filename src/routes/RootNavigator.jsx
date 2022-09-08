import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";

const RootNavigator = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </>
  );
};

export default RootNavigator;
