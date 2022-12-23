import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { WagmiConfig } from 'wagmi'
import { Provider as ReduxProvider } from 'react-redux'
import { createClient, Provider as UrqlProvider } from 'urql'

import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { client } from './utils/Connector/Connector'
import Provider from './store/provider'
import store from './store/store'
import 'react-loading-skeleton/dist/skeleton.css'

import { SUB_GRAPH_API_URL } from './constants/api'
import { SkeletonTheme } from 'react-loading-skeleton'

const urqlClient = createClient({
  url: SUB_GRAPH_API_URL,
})

//eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WagmiConfig client={client}>
        <ReduxProvider store={store}>
          <UrqlProvider value={urqlClient}>
            <Provider>
              <SkeletonTheme baseColor="#343741" highlightColor="#272a34">
                <App />
              </SkeletonTheme>
            </Provider>
          </UrqlProvider>
        </ReduxProvider>
      </WagmiConfig>
    </BrowserRouter>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
