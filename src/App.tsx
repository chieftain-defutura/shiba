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
import { ContractDetails, DigitalItemsCategory } from './constants/contract'
import MyContractNfts from './pages/MyContractNfts'
import MyItems from './pages/MyItems'
import ShopDetailsPage from './pages/DetailsPage/ShopDetailsPage'
import ItemDetailsPage from './pages/DetailsPage/ItemDetailsPage'

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

        {DigitalItemsCategory.map((f, i) => (
          <Route key={i} path={`/${f.path}`}>
            <Route index element={<MyItems digitalItem={f} />} />
          </Route>
        ))}

        <Route path="/shop-details/:shopId" element={<ShopDetailsPage />} />
        <Route path="/item-details/:itemId" element={<ItemDetailsPage />} />
      </Routes>
    </div>
  )
}

export default App
