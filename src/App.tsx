import './App.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import MintNftPage from './pages/MintNftPage/MintNftPage'
import DomainNamesPage from './pages/DomainNamesPage/DomainNamesPage'
import WebsitesPage from './pages/WebsitesPage/WebsitesPage'
import MarketPlacePage from './pages/MarketPlacePage/MarketPlacePage'
import ActionPage from './pages/ActionPage/ActionPage'
import ShopSettingsOne from './pages/ShopSettingsOne/ShopSettingsOne'
import SellPage from './pages/SellPage/SellPage'
import Dashboard from './pages/Dashboard/Dashboard'
import ShopPage from './pages/Shops'
import BlockChainNft from './pages/BlockChainNft/BlockChainNft'
import Charities from './pages/Charities/Charities'
import { ContractDetails } from './constants/contract'
import MyContractNfts from './pages/MyContractNfts'
import HomeLayout from './Layout/HomeLayout'
import MusicDetailsPage from './pages/MusicDetailsPage'

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
        <Route path="homeLayout" element={<HomeLayout />} />
        <Route path="musicDetailsPage" element={<MusicDetailsPage />} />

        {Object.keys(ContractDetails).map((d) => (
          <Route key={d} path={`/${d}`}>
            <Route
              index
              element={<MyContractNfts contractData={ContractDetails[d]} />}
            />
            <Route
              path={`/${d}/:id`}
              element={<ShopSettingsOne contractData={ContractDetails[d]} />}
            />
          </Route>
        ))}

        {/* <Route path="/my-movies" element={<MyMovies />} />
        <Route path="/my-movies/:id" element={<ShopSettingsOne />} />
        <Route path="/my-music" element={<MyMusic />} />
        <Route path="/my-music/:id" element={<ShopSettingsOne />} />
        <Route path="/my-books" element={<MyBooks />} />
        <Route path="/my-books/:id" element={<ShopSettingsOne />} />
        <Route path="/my-courses" element={<MyCourse />} />
        <Route path="/my-courses/:id" element={<ShopSettingsOne />} />

        <Route path="/have-to-send" element={<HaveToSend />} />
        <Route path="/have-to-send/:id" element={<ShopSettingsOne />} />
        <Route path="/awaiting-delivery" element={<AwitingDelivery />} />
        <Route path="/awaiting-delivery/:id" element={<ShopSettingsOne />} /> */}
      </Routes>
    </div>
  )
}

export default App
