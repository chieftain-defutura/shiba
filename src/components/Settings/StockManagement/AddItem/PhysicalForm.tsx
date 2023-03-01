import React, { useEffect, useState, useCallback } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { useAccount, useSigner } from 'wagmi'
import { useParams } from 'react-router-dom'
import { create } from 'ipfs-http-client'
import { ethers } from 'ethers'
import { Buffer } from 'buffer'
import * as Yup from 'yup'

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { TokenData } from 'constants/tokenData'
import physicalShopABI from 'utils/abi/physicalShopABI.json'
import { useTransactionModal } from 'context/TransactionContext'
import { parseUnits } from 'ethers/lib/utils.js'
import { PHYSICAL_GOODS_NFT_CONTRACT_ADDRESS } from 'utils/contractAddress'
import { getPhysicalShopCategory } from 'utils/methods'
import { useAppDispatch, useAppSelector } from 'store/store'
import { fetchCarityList } from 'store/slices/generalSlice'

interface IPhysicalShopForm {
  setClickCard: any
}

const initialState = {
  logo: '',
  mainPhoto: '',
  photoOne: '',
  photoTwo: '',
  photoThree: '',
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
  charityAddress: '',
}

const auth =
  'Basic ' +
  Buffer.from(
    process.env.REACT_APP_INFURA_PROJECT_ID +
      ':' +
      process.env.REACT_APP_INFURA_API_SECRET_KEY,
  ).toString('base64')
const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
})
const PhysicalShopForm: React.FC<IPhysicalShopForm> = ({ setClickCard }) => {
  const { id } = useParams() as { id: string }
  const { address } = useAccount()
  const { data } = useSigner()
  const [slide, setSlide] = useState(1)
  const { setTransaction } = useTransactionModal()
  const [categoryList, setCategoryList] = useState<
    { name: string; subCategory: string[] }[]
  >([])

  const dispatch = useAppDispatch()
  const charityList = useAppSelector((store) => store.general.charityList)
  const isFetched = useAppSelector((store) => store.general.isFetched)

  useEffect(() => {
    if (!data || isFetched) return
    dispatch(fetchCarityList({ data }))
  }, [data, isFetched, dispatch])

  const getCategory = useCallback(async () => {
    if (!data) return
    const result = await getPhysicalShopCategory(data)
    setCategoryList(result)
  }, [data])

  useEffect(() => {
    getCategory()
  }, [getCategory])

  const getSubcategory = (category: string) => {
    const res = categoryList.find((f) => f.name === category)

    if (!res) return []

    return res.subCategory
  }

  const handleSlidePrev = () => {
    if (slide > 1) {
      setSlide(slide - 1)
    }
  }

  const handleSlideNext = () => {
    setSlide(slide + 1)
  }

  const handleAddItem = async (values: typeof initialState) => {
    if (!address || !data) return

    try {
      setTransaction({ loading: true, status: 'pending' })
      // const resData = await axios({
      //   method: 'post',
      //   url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      //   data: {
      //     logo: values.logo,
      //     mainPhoto: values.mainPhoto,
      //     photoOne: values.photoOne,
      //     photoTwo: values.photoTwo,
      //     photoThree: values.photoThree,
      //     itemName: values.itemName,
      //     size: values.size,
      //     colour: values.colour,
      //     fabricType: values.fabricType,
      //     itemCondition: values.itemCondition,
      //     productDescription: values.productDescription,
      //     productDetails: values.productDetails,
      //     manufacturer: values.manufacturer,
      //     brand: values.brand,
      //     refundPossible: values.refundPossible,
      //     department: values.department,
      //     shipmentArea: values.shipmentArea,
      //     shipmentFee: values.shipmentFee,
      //     deliveredIn: values.deliveredIn,
      //   },
      //   headers: {
      //     pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
      //     pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
      //     'Content-Type': 'application/json',
      //   },
      // })
      // const JsonHash = resData.data.IpfsHash
      // console.log(JsonHash)

      const JsonHash = await client.add(JSON.stringify(values))
      const imagePath = JsonHash.path
      const ImgHash = `https://gateway.pinata.cloud/ipfs/${JsonHash.path}`
      console.log(ImgHash)

      const contract = new ethers.Contract(
        PHYSICAL_GOODS_NFT_CONTRACT_ADDRESS,
        physicalShopABI,
        data,
      )

      const tx = await contract.addItem(
        id,
        imagePath,
        values.quantity,
        parseUnits(values.price.toString(), '18'),
        values.currency,
        values.category,
        values.subCategory,
        values.itemName,
        values.charityAddress,
      )

      await tx.wait()
      console.log('added')
      setTransaction({ loading: true, status: 'success' })
      setClickCard(null)
    } catch (error) {
      console.log('-----Error: Add Item------')
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  const validate = Yup.object({
    quantity: Yup.string().required('This is Required'),
    price: Yup.string().required('This is Required'),
    currency: Yup.string().required('This is Required'),
    charityAddress: Yup.string().required('This is Required'),
  })

  return (
    <div>
      <div>
        <Formik
          initialValues={initialState}
          onSubmit={handleAddItem}
          validationSchema={validate}
        >
          {({ values }) => (
            <Form>
              {slide === 1 && (
                <div className="item-info-sub-menu-container sub-menu-container">
                  <IoIosArrowForward
                    className="next-arrow-icon"
                    onClick={handleSlideNext}
                  />
                  <p className="title">Photo</p>
                  <div className="content">
                    <div className="content-left">
                      <p>Logo:</p>
                      <p>Main Photo:</p>
                      <p>Photo:</p>
                      <p>Photo:</p>
                      <p>Photo:</p>
                    </div>
                    <div className="content-right">
                      <Field placeholder="Logo" name="logo" type="text" />
                      <Field
                        placeholder="Main Photo"
                        name="mainPhoto"
                        type="text"
                      />
                      <Field placeholder="Photo" name="photoOne" type="text" />
                      <Field placeholder="Photo" name="photoTwo" type="text" />
                      <Field
                        placeholder="Photo"
                        name="photoThree"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              )}
              {slide === 2 && (
                <div className="item-info-sub-menu-container sub-menu-container">
                  <IoIosArrowBack
                    className="prev-arrow-icon"
                    onClick={handleSlidePrev}
                  />
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
              {slide === 3 && (
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
              {slide === 4 && (
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
                      <p>Select Charity Organisation From List:</p>
                    </div>
                    <div className="content-right">
                      <div>
                        <Field name="quantity" placeholder="Quantity" />
                        <ErrorMessage
                          name="quantity"
                          className="errorMsg"
                          component="div"
                        />
                      </div>
                      <div>
                        <Field name="price" type="number" placeholder="Price" />
                        <ErrorMessage
                          name="price"
                          className="errorMsg"
                          component="div"
                        />
                      </div>
                      <div>
                        <Field as="select" name="currency">
                          <option value="">Select a Currency</option>
                          {TokenData.map((f, index) => {
                            return (
                              <option value={f.tokenAddress} key={index}>
                                {f.tokenName}
                              </option>
                            )
                          })}
                        </Field>
                        <ErrorMessage
                          name="currency"
                          className="errorMsg"
                          component="div"
                        />
                      </div>
                      <Field
                        name="shipmentArea"
                        placeholder="Insert Shipment Areas (Ex. USA, Germany, Asia or Worldwide)"
                      />
                      <Field name="shipmentFee" placeholder="Shipment Fee" />
                      <Field
                        name="deliveredIn"
                        placeholder="Ex. 10-20 Working days"
                      />
                      <div>
                        <Field as="select" name="charityAddress">
                          <option value="">Select a Charity Address</option>
                          {charityList.map((list, index) => {
                            return (
                              <option value={list} key={index}>
                                {list}
                              </option>
                            )
                          })}
                        </Field>
                        <ErrorMessage
                          name="charityAddress"
                          className="errorMsg"
                          component="div"
                        />
                      </div>
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
