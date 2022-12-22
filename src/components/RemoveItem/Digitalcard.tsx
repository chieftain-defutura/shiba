import React, { useState } from 'react'
import { ethers } from 'ethers'
import { useAccount, useSigner } from 'wagmi'

import { useTransactionModal } from '../../context/TransactionContext'
import { DIGITAL_GOODS_NFT_CONTRACT_ADDRESS } from '../../utils/contractAddress'
import digitalShopABI from '../../utils/abi/digitalShopABI.json'
import { formatUnits } from 'ethers/lib/utils.js'
import cardImg from '../../assets/img/card-3.png'
import { BsArrowLeftCircle } from 'react-icons/bs'

interface ICard {
  id: number
  shopDetails: {
    id: number
  }
  erc20Token: {
    id: string
    symbol: string
    decimals: string
  }
  price: number
}

const DigitalCard: React.FC<ICard> = ({
  id: itemId,
  shopDetails: { id: shopId },
  erc20Token,
  price,
}) => {
  const { data } = useSigner()
  const { address } = useAccount()
  const { setTransaction } = useTransactionModal()
  //arrow
  const [slide, setSlide] = useState(true)

  const handleRemoveItem = async () => {
    if (!address || !data) return
    try {
      setTransaction({
        loading: true,
        status: 'pending',
      })
      const contract = new ethers.Contract(
        DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
        digitalShopABI,
        data,
      )
      const tx = await contract.removeItem(shopId, itemId)
      await tx.wait()
      console.log('added')
      setTransaction({ loading: true, status: 'success' })
    } catch (error) {
      console.log('Error sending File to IPFS:')
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }
  return (
    <div>
      {slide && (
        <div>
          {/* <BsArrowLeftCircle
            className="arrow-icon"
            onClick={() => setSlide(false)}
          /> */}
          <div className="remove-item-card">
            <div className="card-top">
              <img src={cardImg} alt="card" />
            </div>
            <div className="card-center">
              <h3 className="title">The Holy Grail</h3>
              <h4 className="sub-title">Pixart Motion</h4>
            </div>
            <div className="card-bottom">
              <p>Fixed price</p>
              <button>
                {formatUnits(price, erc20Token.decimals)} {erc20Token.symbol}
              </button>
            </div>
            <div className="card-overlay">
              <button>Details</button>
              <button onClick={handleRemoveItem}>Remove Shop</button>
            </div>
          </div>
          <div className="remove-card-bottom">
            <p>Name: shoes winter</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default DigitalCard
