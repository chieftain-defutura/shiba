import React from 'react'

import { IUserDigitalItem } from '../../constants/types'
import { getDecryptedData } from '../../utils/formatters'
import cardImg from '../../assets/img/card-3.png'

const DigitalItemCategoryCard: React.FC<IUserDigitalItem> = ({
  fullproduct,
}) => {
  console.log(getDecryptedData(fullproduct))
  return (
    <div className="card">
      <div className="card-top">
        <img src={cardImg} alt="card" />
      </div>
      <div className="card-center">
        <h3 className="title">The Holy Grail</h3>
        <h4 className="sub-title">Pixart Motion</h4>
      </div>
      <div className="card-bottom">
        <p>Shop Details</p>
      </div>
    </div>
  )
}

export default DigitalItemCategoryCard
