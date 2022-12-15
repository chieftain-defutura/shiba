import React, { useState } from 'react'
import { Formik, Field, Form } from 'formik'
import axios from 'axios'
import { ethers } from 'ethers'
import { useAccount, useSigner } from 'wagmi'
import { getEncryptedData } from '../../utils/formatters'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { TokenData } from '../../constants/tokenData'
import physicalShopABI from '../../utils/abi/physicalShopABI.json'
import { useTransactionModal } from '../../context/TransactionContext'
import { parseUnits } from 'ethers/lib/utils.js'
import { PHYSICAL_GOODS_NFT_CONTRACT_ADDRESS } from '../../utils/contractAddress'
import { useParams } from 'react-router-dom'

const PhysicalShopForm = () => {
  const { id } = useParams()
  const { address } = useAccount()
  const { data } = useSigner()
  const [slide, setSlide] = useState(1)
  const { setTransaction } = useTransactionModal()

  const categoryList = [
    {
      name: 'clothing',
      subcategory: ['gloves', 'skirt', 'belt', 'others'],
    },
    {
      name: 'accessories',
      subcategory: ['bags', 'Jewellery', 'others'],
    },
    {
      name: 'food',
      subcategory: ['fast_food', 'sushi', 'restaurants', 'vegan', 'others'],
    },
  ]

  const getSubcategory = (category: string) => {
    const res = categoryList.find((f) => f.name === category)

    if (!res) return []

    return res.subcategory
  }

  const handleSlidePrev = () => {
    if (slide > 1) {
      setSlide(slide - 1)
    }
  }

  const handleSlideNext = () => {
    setSlide(slide + 1)
  }

  const handleAddItem = async (values: any) => {
    if (!address || !data) return
    const encryptedFullProductLink = getEncryptedData(values.fullProduct)
    console.log(encryptedFullProductLink)
    try {
      setTransaction({ loading: true, status: 'pending' })
      const resData = await axios({
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        data: {
          itemName: values.itemName,
          size: values.size,
          colour: values.colour,
          fabricType: values.fabricType,
          itemCondition: values.itemCondition,
          productDescription: values.productDescription,
          productDetails: values.productDetails,
          manufacturer: values.manufacturer,
          brand: values.brand,
          refundPossible: values.refundPossible,
          department: values.department,
          shipmentArea: values.shipmentArea,
          shipmentFee: values.shipmentFee,
          deliveredIn: values.deliveredIn,
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
        PHYSICAL_GOODS_NFT_CONTRACT_ADDRESS,
        physicalShopABI,
        data,
      )

      const tx = await contract.addItem(
        id,
        dataHash,
        values.quantity,
        parseUnits(values.price, '18'),
        values.currency,
        values.category,
        values.subCategory,
      )

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
      <div>
        <Formik
          initialValues={{
            itemName: '',
            category: '',
            subCategory: '',
            size: '',
            colour: '',
            fabricType: '',
            itemCondition: '',
            productDescription: '',
            productDetails: '',
            manufacturer: '',
            brand: '',
            refundPossible: '',
            department: '',
            quantity: '',
            price: '',
            currency: '',
            shipmentArea: '',
            shipmentFee: '',
            deliveredIn: '',
          }}
          onSubmit={handleAddItem}
        >
          {({ values }) => (
            <Form>
              {slide === 1 && (
                <div className="item-info-sub-menu-container sub-menu-container">
                  <IoIosArrowForward
                    className="next-arrow-icon"
                    onClick={handleSlideNext}
                  />
                  <p className="title">Item Info</p>
                  <div className="content">
                    <div className="content-left">
                      <p>Item Name:</p>
                      <p>Category:</p>
                      <p>SubCategory:</p>
                      <p>Size:</p>
                      <p>Colour:</p>
                      <p>Fabric Type:</p>
                      <p>Item Condition:</p>
                    </div>
                    <div className="content-right">
                      <Field
                        placeholder="Item Name"
                        name="itemName"
                        type="text"
                      />
                      <Field as="select" name="category">
                        <option value="">Select a Category</option>
                        <option value="clothing">Clothing</option>
                        <option value="accessories">Accessories</option>
                        <option value="food">food</option>
                      </Field>

                      <Field as="select" name="subCategory">
                        <option value="">Select a SubCategory</option>
                        {getSubcategory(values.category).map((f, index) => {
                          return (
                            <>
                              <option value={f} key={index}>
                                {f}
                              </option>
                            </>
                          )
                        })}
                      </Field>

                      <Field as="select" name="size">
                        <option>Select a Category from List</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </Field>

                      <Field
                        name="colour"
                        placeholder="Available Size List(Ex. 30, 32, 35, 44)"
                      />

                      <Field
                        name="fabricType"
                        placeholder="Fabric Type Details"
                      />

                      <Field name="itemCondition" placeholder="Used" />
                    </div>
                  </div>
                </div>
              )}
              {slide === 2 && (
                <div className="description-sub-menu-container sub-menu-container">
                  <IoIosArrowBack
                    className="prev-arrow-icon"
                    onClick={handleSlidePrev}
                  />
                  <IoIosArrowForward
                    className="next-arrow-icon"
                    onClick={handleSlideNext}
                  />
                  <p className="title">Description</p>
                  <div className="content">
                    <div className="content-left">
                      <p>Product Description:</p>
                      <p>Product Details:</p>
                      <p>Manufacturer:</p>
                      <p>Brand:</p>
                      <p>Refund Possible:</p>
                      <p>Department:</p>
                    </div>
                    <div className="content-right">
                      <Field
                        name="productDescription"
                        placeholder="Product Description"
                      />
                      <Field
                        name="productDetails"
                        placeholder="Product Details"
                      />
                      <Field name="manufacturer" placeholder="Manufacturer" />
                      <Field name="brand" placeholder="Brand" />
                      <Field as="select" name="refundPossible">
                        <option>Yes / No</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Field>
                      <Field as="select" name="department">
                        <option>Menu / Women / Kids</option>
                        <option value="menu">Menu</option>
                        <option value="women">Women</option>
                        <option value="kids">Kids</option>
                      </Field>
                    </div>
                  </div>
                </div>
              )}
              {slide === 3 && (
                <div className="quantity-price-shipment-sub-menu-container sub-menu-container">
                  <IoIosArrowBack
                    className="prev-arrow-icon"
                    onClick={handleSlidePrev}
                  />
                  <p className="title">Quantity, Price and Shipment</p>
                  <div className="content">
                    <div className="content-left">
                      <p>Quantity:</p>
                      <p>Price:</p>
                      <p>Currency:</p>
                      <p>Shipment Area:</p>
                      <p>Shipment Fee:</p>
                      <p>Delivered In:</p>
                    </div>
                    <div className="content-right">
                      <Field name="quantity" placeholder="Quantity" />
                      <Field name="price" placeholder="Price" />
                      <Field as="select" name="currency">
                        <option value="">Select a Currency</option>
                        {TokenData.map((f, index) => {
                          return (
                            <>
                              <option value={f.tokenAddress} key={index}>
                                {f.tokenName}
                              </option>
                            </>
                          )
                        })}
                      </Field>
                      <Field
                        name="shipmentArea"
                        placeholder="Insert Shipment Areas (Ex. USA, Germany, Asia or Worldwide)"
                      />
                      <Field name="shipmentFee" placeholder="Shipment Fee" />
                      <Field
                        name="deliveredIn"
                        placeholder="Ex. 10-20 Working days"
                      />
                    </div>
                  </div>
                  <div className="btn-cont">
                    <button>Submit Listing and Put on Sale</button>
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default PhysicalShopForm
