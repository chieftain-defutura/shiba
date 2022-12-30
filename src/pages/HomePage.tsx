import React from 'react'

import TopSeller from 'components/TopSeller/TopSeller'
import Banner from 'components/Banner/Banner'
import Footer from 'components/Footer/Footer'
import PopularFood from 'components/PopularFood/PopularFood'
import RecentlyListed from 'components/RecentlyListed/RecentlyListed'

const HomePage: React.FC = () => {
  return (
    <div>
      <Banner />
      <RecentlyListed />
      <TopSeller />
      <PopularFood />
      <Footer />
    </div>
  )
}

export default HomePage
