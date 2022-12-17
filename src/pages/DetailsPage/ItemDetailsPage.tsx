import React, { useRef, useState } from 'react'
import Slider from 'react-slick'
import axios from 'axios'
import { ethers } from 'ethers'
import { useQuery } from 'urql'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiMinus } from 'react-icons/bi'
import { useAccount, useSigner, erc20ABI } from 'wagmi'
import { Formik, Form, Field } from 'formik'
import { useTransactionModal } from '../../context/TransactionContext'
import shipmentABI from '../../utils/abi/shipmentABI.json'

import slideImg from '../../assets/img/card-22.png'
import rightArrowIcon from '../../assets/img/right-arrow-icon.png'
import leftArrowIcon from '../../assets/img/left-arrow-icon.png'
import HomeLayout from '../../Layout/HomeLayout'
import './ItemDetailsPage.css'
import { SHIPMENT_CONTRACT } from '../../utils/contractAddress'
import { useParams } from 'react-router-dom'
import { physicalItemQuery } from '../../constants/query'
import { IPhysicalItem } from '../../constants/types'

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const ItemDetailsPage: React.FC = () => {
  const { itemId } = useParams()
  const { address } = useAccount()
  const { data: signerData } = useSigner()
  const [quantity, setQuantity] = useState(1)
  const { setTransaction } = useTransactionModal()
  const [categoriesShipping, setCategoriesShipping] = useState(false)
  const slider = useRef<Slider>(null)
  const [result, reexecuteQuery] = useQuery<{ physicalItem: IPhysicalItem }>({
    query: physicalItemQuery,
    variables: { id: itemId },
  })

  const { data, fetching, error } = result

  console.log(data)

  const handlePlus = () => {
    setQuantity(quantity + 1)
  }

  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleSubmit = async (values: any) => {
    if (!address || !signerData || !data) return

    try {
      setTransaction({ loading: true, status: 'pending' })
      const erc20Contract = new ethers.Contract(
        data.physicalItem.erc20Token.id,
        erc20ABI,
        signerData,
      )

      const allowance = Number(
        (await erc20Contract.allowance(address, SHIPMENT_CONTRACT)).toString(),
      )

      if (allowance <= 0) {
        const tx = await erc20Contract.approve(
          SHIPMENT_CONTRACT,
          ethers.constants.MaxUint256,
        )
        await tx.wait()
      }

      const resData = await axios({
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        data: {
          name: values.name,
          phone: values.phone,
          address: values.address,
          city: values.city,
          state: values.state,
          zipCode: values.zipCode,
          country: values.country,
        },
        headers: {
          pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
          pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
          'Content-Type': 'application/json',
        },
      })
      const JsonHash = resData.data.IpfsHash
      const dataHash = `https://gateway.pinata.cloud/ipfs/${JsonHash}`
      console.log(dataHash)
      const contract = new ethers.Contract(
        SHIPMENT_CONTRACT,
        shipmentABI,
        signerData,
      )

      const tx = await contract.createBuyOrder(itemId, quantity, dataHash)

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
      <HomeLayout>
        <div className="categories-details-container">
          <Formik
            initialValues={{
              name: '',
              phone: '',
              address: '',
              city: '',
              state: '',
              zipCode: '',
              country: '',
            }}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="categories-details-container-right">
                  <h2 className="title">shoesboutique.shib</h2>
                  <div className="content-box">
                    <div className="content-box-left">
                      {!categoriesShipping ? (
                        <div className="slider">
                          <Slider {...settings} ref={slider}>
                            <div className="slider-item">
                              <img src={slideImg} alt="slider" />
                            </div>
                            <div className="slider-item">
                              <img src={slideImg} alt="slider" />
                            </div>
                          </Slider>
                          <button
                            className="prev-btn slider-btn"
                            onClick={() => slider.current?.slickPrev()}
                          >
                            <img src={leftArrowIcon} alt="arrow" />
                          </button>
                          <button
                            className="next-btn slider-btn"
                            onClick={() => slider.current?.slickNext()}
                          >
                            <img src={rightArrowIcon} alt="arrow" />
                          </button>
                        </div>
                      ) : (
                        <div className="shipping-form-container">
                          <h2 className="title">Shipping form</h2>
                          <div className="form-container">
                            <div className="left">
                              <p>Name:</p>
                              <p>Phone:</p>
                              <p>Address:</p>
                              <p>City:</p>
                              <p>State:</p>
                              <p>Postal zip code:</p>
                              <p>Country:</p>
                            </div>
                            <div className="right">
                              <Field
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                              />
                              <Field
                                name="phone"
                                type="number"
                                placeholder="Enter your number"
                              />
                              <Field
                                name="address"
                                type="text"
                                placeholder="Enter your address"
                              />
                              <Field
                                name="city"
                                type="text"
                                placeholder="City"
                              />
                              <Field
                                name="state"
                                type="text"
                                placeholder="State"
                              />
                              <Field
                                name="zipCode"
                                type="text"
                                placeholder="Zip code"
                              />
                              <Field
                                name="country"
                                type="text"
                                placeholder="country"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="description-cont">
                        <h3>Product Description:</h3>
                        <p>Product Details:</p>
                      </div>
                    </div>
                    <div className="content-box-right">
                      <div className="product-details">
                        <p>Item Name: Shoes1</p>
                        <p>Available Sizes: 34, 39, 40</p>
                        <p>Available Colours: Red, Black</p>
                        <p>Fabric Type: 100% Cotton</p>
                        <p>Item Condition: New</p>
                        <p>Manufacturer: Canada</p>
                        <p>Brand: SuperBrand</p>
                        <br />
                        <p>Refund Possible: Yes</p>
                        <p>Department: Women</p>
                        <p>Shipment Area: Worldwide</p>
                        <p>Shipment Fee: 2000 SHI</p>
                        <p>Delivered In: 15-20 Working Days</p>
                      </div>
                      <br />
                      <div className="quantity-container">
                        <p>Quantity:</p>
                        <div className="quantity-box">
                          <button type="button" onClick={handleMinus}>
                            <BiMinus />
                          </button>
                          <p>{quantity}</p>
                          <button type="button" onClick={handlePlus}>
                            <AiOutlinePlus />
                          </button>
                        </div>
                      </div>
                      <div className="buy-container">
                        <div className="top">
                          <p>Price: 10000 SHI</p>
                          <p>Total: 12000 SHI</p>
                        </div>
                        <div>
                          {!categoriesShipping ? (
                            <div onClick={() => setCategoriesShipping(true)}>
                              Buy
                            </div>
                          ) : (
                            <button type="submit">Buy</button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </HomeLayout>
    </div>
  )
}

export default ItemDetailsPage