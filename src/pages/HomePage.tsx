import React from "react"
import Banner from "../components/Banner/Banner"
import Footer from "../components/Footer/Footer"
import Navigation from "../components/Navigation/Navigation"
import PopularFood from "../components/PopularFood/PopularFood"
import RecentlyListed from "../components/RecentlyListed/RecentlyListed"
import TopSeller from "../components/TopSeller/TopSeller"

const HomePage = () => {
  return (
    <div>
      <Navigation />
      <Banner />
      <RecentlyListed />
      <TopSeller />
      <PopularFood />
      <Footer />
    </div>
  )
}

export default HomePage
