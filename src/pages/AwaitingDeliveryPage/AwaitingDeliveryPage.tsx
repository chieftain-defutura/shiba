import React, { useState } from 'react'
import ArrowIcon from '../../assets/img/left-arrow-icon-2.png'
import './AwaitingDeliveryPage.css'
import HomeLayout from '../../Layout/HomeLayout'

const AwaitingDeliveryPage: React.FC = () => {
  const [isReceived, setIsReceived] = useState(false)
  const [isComplain, setIsComplain] = useState(false)

  const handleBackBtn = () => {
    if (isReceived) return setIsReceived(false)
    if (isComplain) return setIsComplain(false)
  }

  return (
    <div>
      <HomeLayout>
        <div className="awaiting-delivery-container">
          <div className="awaiting-delivery-container-right">
            <div className="content-box">
              <div className="awaiting-delivery-header">
                <img src={ArrowIcon} alt="" onClick={handleBackBtn} />
                <h2 className="heading">Awaiting Delivery</h2>
              </div>
              {!isReceived && !isComplain && (
                <table cellSpacing={0} cellPadding={0}>
                  <thead>
                    <tr>
                      <td>Product Name </td>
                      <td>Quantity</td>
                      <td>Status</td>
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
                        <p>Shipped/Pending</p>
                      </td>
                      <td>
                        <button onClick={() => setIsReceived(true)}>
                          Received
                        </button>
                      </td>
                      <td>
                        <button
                          className="complaint-btn"
                          onClick={() => setIsComplain(true)}
                        >
                          Complaint
                        </button>
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
                        <p>Shipped/Pending</p>
                      </td>
                      <td>
                        <button onClick={() => setIsReceived(true)}>
                          Received
                        </button>
                      </td>
                      <td>
                        <button
                          className="complaint-btn"
                          onClick={() => setIsComplain(true)}
                        >
                          Complaint
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
              {isReceived && (
                <div className="received-container">
                  <div className="received-top">
                    <p>0x002...02: All Great received, and very satisfied!</p>
                    <p>0x003...03: Thank you, wish you grow and many sells</p>
                    <p>0x003...04: Will buy always from you mate</p>
                    <p>0x004...04: Great seller</p>
                    <p>0x005...05: Just received shoes!</p>
                  </div>
                  <div className="received-bottom">
                    <input />
                    <button>Send and Mark as Received</button>
                  </div>
                </div>
              )}
              {isComplain && (
                <div className="complain-container">
                  <div className="complain-top">
                    <p>0x002...02: All Great received, and very satisfied!</p>
                    <p>0x003...03: Thank you, wish you grow and many sells</p>
                    <p>0x003...04: Will buy always from you mate</p>
                    <p>0x004...04: Great seller</p>
                    <p>0x005...05: Just received shoes!</p>
                  </div>
                  <div className="complain-bottom">
                    <input />
                    <button>Send and Complain</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </HomeLayout>
    </div>
  )
}

export default AwaitingDeliveryPage
