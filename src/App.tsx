import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import MintNftPage from "./pages/MintNftPage/MintNftPage";
import DomainNamesPage from "./pages/DomainNamesPage/DomainNamesPage";
import WebsitesPage from "./pages/WebsitesPage/WebsitesPage";
import MarketPlacePage from "./pages/MarketPlacePage/MarketPlacePage";
import ActionPage from "./pages/ActionPage/ActionPage";
import ShopSettingsOne from "./pages/ShopSettingsOne/ShopSettingsOne";
import SellPage from "./pages/SellPage/SellPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="mint-nft" element={<MintNftPage />} />
        <Route path="domain-names" element={<DomainNamesPage />} />
        <Route path="websites" element={<WebsitesPage />} />
        <Route path="marketplace" element={<MarketPlacePage />} />
        <Route path="action" element={<ActionPage />} />
        <Route path="shop-settings-one" element={<ShopSettingsOne />} />
        <Route path="sell" element={<SellPage />} />
      </Routes>
    </div>
  );
}

export default App;
