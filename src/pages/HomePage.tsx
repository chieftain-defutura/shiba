import React from 'react'

import TopSeller from 'components/TopSeller'
import Banner from 'components/Banner'
import Footer from 'components/Footer/Footer'
import PopularFood from 'components/PopularFood'
import RecentlyListed from 'components/RecentlyListed'

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
