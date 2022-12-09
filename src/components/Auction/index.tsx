import React, { useState } from "react"
import { IoIosArrowDown } from "react-icons/io"

const Auction = () => {
  const [dropDown, setDropDown] = useState<any>(null)
  const [selectedDropDown, setSelectedDropDown] = useState("Select Currency")
  return (
    <div className="on-marketplace-container">
      <p className="title">On Auction</p>
      <div className="on-marketplace-sub-container">
        <div className="content">
          <div className="content-left">
            <p>Select Charity Organisation From List</p>
            <p>Reserve Price</p>
          </div>
          <div className="content-right">
            <select></select>
            <div className="price-select-container">
              <div className="left">
                <input />
                <button> On Sale</button>
              </div>
              <div className={!dropDown ? " right" : "right active"}>
                <div className="header" onClick={() => setDropDown(!dropDown)}>
                  <p>{selectedDropDown}</p>
                  <IoIosArrowDown />
                </div>
                <div className={!dropDown ? "body" : "body active"}>
                  <p onClick={() => setSelectedDropDown("SHI")}>SHI</p>
                  <p onClick={() => setSelectedDropDown("LEASH")}>LEASH</p>
                  <p onClick={() => setSelectedDropDown("SHIB")}>SHIB</p>
                  <p onClick={() => setSelectedDropDown("BONE")}>BONE</p>
                  <p onClick={() => setSelectedDropDown("PAW")}>PAW</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auction
