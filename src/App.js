import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import MintNftPage from "./pages/MintNftPage/MintNftPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mint-nft" element={<MintNftPage />} />
      </Routes>
    </div>
  );
}

export default App;
