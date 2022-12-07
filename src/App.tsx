import './App.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import HomePage from './pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import MintNftPage from './pages/MintNftPage/MintNftPage'
import DomainNamesPage from './pages/DomainNamesPage/DomainNamesPage'
import WebsitesPage from './pages/WebsitesPage/WebsitesPage'
import MarketPlacePage from './pages/MarketPlacePage/MarketPlacePage'
import ActionPage from './pages/ActionPage/ActionPage'
import ShopSettingsOne from './pages/ShopSettingsOne/ShopSettingsOne'
import SellPage from './pages/SellPage/SellPage'
import MyMovies from './pages/MyMovies'
import MyMusic from './pages/MyMusic'
import MyBooks from './pages/MyBooks'
import MyCourse from './pages/MyCourses'
import MyWebsites from './pages/MyWebsites'
import MyDomain from './pages/MyDomains'
import MyDigitalShop from './pages/MyDigitalShop'
import MyGoodsShop from './pages/MyGoodsShop'
import MyCharities from './pages/MyCharities'
import HaveToSend from './pages/HaveToSend'
import AwitingDelivery from './pages/AwaitingDelivery'
import Dashboard from './pages/Dashboard/Dashboard'
import ShopPage from './pages/Shops'
import FileSettings from './pages/FileSettings/FileSettings'
import MyGoodShop from './components/MyGoodShop/MyGoodShop'
import BlockChainNft from './pages/BlockChainNft/BlockChainNft'
import Charities from './pages/Charities/Charities'

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<Dashboard />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="mint-nft" element={<MintNftPage />} />
        <Route path="domain-names" element={<DomainNamesPage />} />
        <Route path="websites" element={<WebsitesPage />} />
        <Route path="marketplace" element={<MarketPlacePage />} />
        <Route path="full-on-blockChain-nft" element={<BlockChainNft />} />
        <Route path="charities" element={<Charities />} />
        <Route path="action" element={<ActionPage />} />
        <Route path="sell" element={<SellPage />} />
        <Route path="/my-movies" element={<MyMovies />} />
        <Route path="/my-movies/:id" element={<ShopSettingsOne />} />
        <Route path="/my-music" element={<MyMusic />} />
        <Route path="/my-music/:id" element={<ShopSettingsOne />} />
        <Route path="/my-books" element={<MyBooks />} />
        <Route path="/my-books/:id" element={<ShopSettingsOne />} />
        <Route path="/my-courses" element={<MyCourse />} />
        <Route path="/my-courses/:id" element={<ShopSettingsOne />} />
        <Route path="/my-websites" element={<MyWebsites />} />
        <Route path="/my-websites/:id" element={<FileSettings />} />
        <Route path="/my-domains" element={<MyDomain />} />
        <Route path="/my-domains/:id" element={<ShopSettingsOne />} />
        <Route path="/my-digital-shop" element={<MyDigitalShop />} />
        <Route path="/my-digital-shop/:id" element={<ShopSettingsOne />} />
        <Route path="/my-goods-shop" element={<MyGoodsShop />} />
        <Route path="/my-goods-shop/:id" element={<MyGoodShop />} />
        <Route path="/my-charities" element={<MyCharities />} />
        <Route path="/my-charities/:id" element={<FileSettings />} />
        <Route path="/have-to-send" element={<HaveToSend />} />
        <Route path="/have-to-send/:id" element={<ShopSettingsOne />} />
        <Route path="/awaiting-delivery" element={<AwitingDelivery />} />
        <Route path="/awaiting-delivery/:id" element={<ShopSettingsOne />} />
      </Routes>
    </div>
  )
}

export default App
