import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Info from "../routes/info";
import List from "../routes/list";
import MainMenu from "./MainMenu";

const App = (): JSX.Element => {
  return (
    <div className="App">
      <BrowserRouter>
        <MainMenu />
        <Routes>
          <Route path="info/:id" element={<Info />} />
          <Route path="info" element={<Info />} />
          <Route path="list" element={<List />} />
          <Route path="" element={<Navigate to="/info" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
