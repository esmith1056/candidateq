import "./App.css";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Info from "./routes/info.jsx";
import List from "./routes/list.jsx";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <menu className="MainMenu">
                    <li>
                        <Link to="/info">Candidate Info</Link>
                    </li>
                    <li>
                        <Link to="/list">List of Previous Candidates</Link>
                    </li>
                </menu>

                <Routes>
                    <Route path="info/:id" element={<Info />} />
                    <Route path="info" element={<Info />} />
                    <Route path="list" element={<List />} />
                    <Route path="" element={<Navigate to="/info" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

