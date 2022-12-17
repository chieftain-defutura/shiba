import React from 'react'

import './HaveToSend.css'
import ArrowIcon from '../../assets/img/left-arrow-icon-2.png'
import HomeLayout from '../../Layout/HomeLayout'

const HaveToSend = () => {
  return (
    <div>
      <HomeLayout>
        <div className="shipping-queue-container-right">
          <div className="content-box">
            <div className="shipping-queue-header">
              <img src={ArrowIcon} alt="" />
              <h2 className="heading">Shipping Queue</h2>
            </div>
            <table cellSpacing="0" cellPadding="0">
              <thead>
                <tr>
                  <td>Product Name </td>
                  <td>Quantity</td>
                </tr>
              </thead>
              <tbody>
                <tr className="body-tr">
                  <td>
                    <p>Shoes1</p>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <button>Start Shipment</button>
                  </td>
                  <td>
                    <button className="cancel-btn">Cancel Order</button>
                  </td>
                </tr>
                <tr className="spacer"></tr>
                <tr className="body-tr">
                  <td>
                    <p>Shoes2</p>
                  </td>
                  <td>
                    <p>4</p>
                  </td>
                  <td>
                    <button>Start Shipment</button>
                  </td>
                  <td>
                    <button className="cancel-btn">Cancel Order</button>
                  </td>
                </tr>
                <tr className="spacer"></tr>
                <tr className="body-tr">
                  <td>
                    <p>Shoes3</p>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <button>Start Shipment</button>
                  </td>
                  <td>
                    <button className="cancel-btn">Cancel Order</button>
                  </td>
                </tr>
                <tr className="spacer"></tr>
                <tr className="body-tr">
                  <td>
                    <p>Shoes4</p>
                  </td>
                  <td>
                    <p>2</p>
                  </td>
                  <td>
                    <button>Start Shipment</button>
                  </td>
                  <td>
                    <button className="cancel-btn">Cancel Order</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </HomeLayout>
    </div>
  )
}

export default HaveToSend
