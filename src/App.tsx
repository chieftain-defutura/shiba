import React, { lazy, Suspense } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'

import './App.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import HomePage from './pages/HomePage'
import ShopSettingsOne from './pages/ShopSettingsOne/ShopSettingsOne'
import Dashboard from './pages/Dashboard/Dashboard'
import MyContractNfts from './pages/MyContractNfts'
import MyItems from './pages/MyItems'
import { ContractDetails, DigitalItemsCategory } from './constants/contract'

import {
  digitalShopTokenByIdQuery,
  physicalShopTokenByIdQuery,
} from './constants/query'
import HomeLayout from 'Layout/HomeLayout'
import Navigation from 'components/Navigation/Navigation'

const ShopPage = lazy(() => import('pages/Shops'))
const HaveToSendPage = lazy(() => import('pages/HaveToSendPage'))
const AuctionPage = lazy(() => import('pages/ActionPage/ActionPage'))
const MintNftPage = lazy(() => import('pages/MintNftPage/MintNftPage'))
const CharitiesPage = lazy(() => import('pages/ContractNftsPage/Charities'))
const WebsitesPage = lazy(() => import('pages/ContractNftsPage/WebsitesPage'))
const ShopDetailsPage = lazy(() => import('pages/DetailsPage/ShopDetailsPage'))
const SendCryptoPage = lazy(() => import('pages/SendCryptoPage/SendCryptoPage'))
const DomainNamesPage = lazy(
  () => import('pages/DomainNamesPage/DomainNamesPage'),
)
const FullOnBlockchainPage = lazy(
  () => import('pages/ContractNftsPage/FullOnBlockchain'),
)
const AwaitingDeliveryPage = lazy(
  () => import('pages/AwaitingDeliveryPage/AwaitingDeliveryPage'),
)
const MarketPlacePage = lazy(
  () => import('pages/MarketPlacePage/MarketPlacePage'),
)
const DigitalItemDetailsPage = lazy(
  () => import('pages/DetailsPage/DigitalItemDetailsPage'),
)
const PhysicalItemDetailsPage = lazy(
  () => import('pages/DetailsPage/ItemDetailsPage'),
)

const App: React.FC = () => {
  return (
    <div className="App">
      <Navigation />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Dashboard />} />
          <Route
            element={
              <HomeLayout>
                <Outlet />
              </HomeLayout>
            }
          >
            <Route
              path="mint-nft"
              element={
                <Suspense fallback={null}>
                  <MintNftPage />
                </Suspense>
              }
            />
            <Route
              path="send-crypto"
              element={
                <Suspense fallback={null}>
                  <SendCryptoPage />
                </Suspense>
              }
            />
          </Route>

          <Route>
            <Route
              path="shop"
              element={
                <Suspense fallback={null}>
                  <ShopPage />
                </Suspense>
              }
            />
            <Route
              path="domain-names"
              element={
                <Suspense fallback={null}>
                  <DomainNamesPage />
                </Suspense>
              }
            />
            <Route
              path="websites"
              element={
                <Suspense fallback={null}>
                  <WebsitesPage />
                </Suspense>
              }
            />
            <Route
              path="full-on-blockChain-nft"
              element={
                <Suspense fallback={null}>
                  <FullOnBlockchainPage />
                </Suspense>
              }
            />
            <Route
              path="charities"
              element={
                <Suspense fallback={null}>
                  <CharitiesPage />
                </Suspense>
              }
            />
            <Route
              path="awaiting-delivery"
              element={
                <Suspense fallback={null}>
                  <AwaitingDeliveryPage />
                </Suspense>
              }
            />
            <Route
              path="have-to-send"
              element={
                <Suspense fallback={null}>
                  <HaveToSendPage />
                </Suspense>
              }
            />

            <Route
              path="auction"
              element={
                <Suspense fallback={null}>
                  <AuctionPage />
                </Suspense>
              }
            />

            <Route
              path="marketplace"
              element={
                <Suspense fallback={null}>
                  <MarketPlacePage />
                </Suspense>
              }
            />
          </Route>

          {Object.keys(ContractDetails).map((d) => (
            <Route key={d} path={`/${d}`}>
              <Route
                index
                element={<MyContractNfts contractData={ContractDetails[d]} />}
              />
              <Route
                path={`/${d}/:id`}
                element={
                  <ShopSettingsOne
                    contractData={ContractDetails[d]}
                    setShopSetting={function (value: boolean): void {
                      throw new Error('Function not implemented.')
                    }}
                  />
                }
              />
            </Route>
          ))}

          {DigitalItemsCategory.map((f, i) => (
            <Route key={i} path={`/${f.path}`}>
              <Route index element={<MyItems digitalItem={f} />} />
            </Route>
          ))}

          <Route path="/shop">
            <Route
              path="digital/:shopId"
              element={
                <ShopDetailsPage
                  query={digitalShopTokenByIdQuery}
                  type="DIGITAL"
                />
              }
            />
            <Route
              path="goods/:shopId"
              element={
                <Suspense fallback={null}>
                  <ShopDetailsPage
                    query={physicalShopTokenByIdQuery}
                    type="PHYSICAL"
                  />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/physical-item-details/:itemId"
            element={
              <Suspense fallback={null}>
                <PhysicalItemDetailsPage />
              </Suspense>
            }
          />
          <Route
            path="/digital-item-details/:itemId"
            element={
              <Suspense fallback={null}>
                <DigitalItemDetailsPage />
              </Suspense>
            }
          />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
