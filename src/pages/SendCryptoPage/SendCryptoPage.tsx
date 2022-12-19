import React, { useState } from 'react'
import { FaRegCopy } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import upVoteIcon from '../../assets/img/up-vote-icon.png'
import downVoteIcon from '../../assets/img/down-vote-icon.png'
import './SendCryptoPage.css'
import HomeLayout from '../../Layout/HomeLayout'

const SendCryptoPage: React.FC = () => {
  const [clickDropDown, setClickDropDown] = useState(false)
  const [selectedItem, setSelectedItem] = useState('Select Currency')

  return (
    <div>
      <HomeLayout>
        <div className="send-crypto-container">
          <div className="send-crypto-container-right">
            <h2 className="title">Send Crypto</h2>
            <div className="send-container">
              <div className="input-cont">
                <input placeholder="OxA864829JS8284JN62JDOXIWM37...098" />
                <FaRegCopy className="copy-icon" />
              </div>
              <div className="select-currency-container">
                <div
                  className="header"
                  onClick={() => setClickDropDown(!clickDropDown)}
                >
                  <p>{selectedItem}</p>
                  <IoIosArrowDown />
                </div>
                <div className={clickDropDown ? 'body active' : 'body'}>
                  <p onClick={() => setSelectedItem('SHI')}>SHI</p>
                  <p onClick={() => setSelectedItem('LEASH')}>LEASH</p>
                  <p onClick={() => setSelectedItem('SHIB')}>SHIB</p>
                  <p onClick={() => setSelectedItem('BONE')}>BONE</p>
                  <p onClick={() => setSelectedItem('PAW')}>PAW</p>
                </div>
              </div>
              <button className="send-btn">Send</button>
            </div>
            <div className="domain-details-cont">
              <div className="detail-left">
                <div>Domain is registered for : </div>
                <div>Domain owner : </div>
                <div>Domain Reputation: </div>
              </div>
              <div className="detail-right">
                <div>Shop</div>
                <div>0xAB...098</div>
                <div className="vote-cont">
                  <div>
                    108 <img src={upVoteIcon} alt="up vote" />
                  </div>
                  <div>
                    4 <img src={downVoteIcon} alt="down vote" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HomeLayout>
    </div>
  )
}

export default SendCryptoPage
