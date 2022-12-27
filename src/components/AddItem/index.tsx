import React, { useCallback, useEffect, useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { parseUnits } from 'ethers/lib/utils.js'
import { ethers } from 'ethers'

import {
  BONE_TOKEN_ADDRESS,
  DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
  LEASH_TOKEN_ADDRESS,
  SHIB_TOKEN_ADDRESS,
  SHI_TOKEN_ADDRESS,
} from '../../utils/contractAddress'
import digitalShopABI from '../../utils/abi/digitalShopABI.json'
import { PAW_TOKEN_ADDRESS } from '../../utils/contractAddress'
import { useTransactionModal } from '../../context/TransactionContext'
import { getEncryptedData } from '../../utils/formatters'
import Button from '../Button'
import { getDigitalShopCategory } from '../../utils/methods'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { fetchCarityList } from '../../store/slices/generalSlice'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

interface IAddItem {
  setAddItem: any
  setClickCard: any
}

const initialState = {
  logo: '',
  mainPhoto: '',
  photoOne: '',
  photoTwo: '',
  photoThree: '',
  preview: '',
  fullProduct: '',
  itemName: '',
  category: '',
  subCategory: '',
  details: '',
  description: '',
  price: '',
  currency: '',
  charityAddress: '',
}
const AddItem: React.FC<IAddItem> = ({ setClickCard }) => {
  const { id } = useParams() as { id: string }
  const { data } = useSigner()
  const { address } = useAccount()
  const { setTransaction } = useTransactionModal()
  const [slide, setSlide] = useState(1)
  const [categoryList, setCategoryList] = useState<
    { name: string; subCategory: string[] }[]
  >([])
  const dispatch = useAppDispatch()
  const isFetched = useAppSelector((store) => store.general.isFetched)
  const charityList = useAppSelector((store) => store.general.charityList)

  useEffect(() => {
    if (!data || isFetched) return
    dispatch(fetchCarityList({ data }))
  }, [data, isFetched, dispatch])

  const getCategory = useCallback(async () => {
    if (!data) return
    const result = await getDigitalShopCategory(data)
    setCategoryList(result)
  }, [data])

  const handleSlidePrev = () => {
    if (slide > 1) {
      setSlide(slide - 1)
    }
  }

  const handleSlideNext = () => {
    setSlide(slide + 1)
  }

  useEffect(() => {
    getCategory()
  }, [getCategory])

  const getSubcategory = (category: string) => {
    const res = categoryList.find((f) => f.name === category)

    if (!res) return []

    return res.subCategory
  }

  const handleAddItem = async (values: typeof initialState) => {
    if (!address || !data) return
    const encryptedFullProductLink = getEncryptedData(values.fullProduct, [id])
    console.log(encryptedFullProductLink)

    try {
      setTransaction({ loading: true, status: 'pending' })
      const resData = await axios({
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        data: {
          preview: values.preview,
          itemName: values.itemName,
          details: values.details,
          description: values.description,
          logo: values.logo,
          mainPhoto: values.mainPhoto,
          photoOne: values.photoOne,
          photoTwo: values.photoTwo,
          photoThree: values.photoThree,
        },
        headers: {
          pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
          pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
          'Content-Type': 'application/json',
        },
      })

      const JsonHash = resData.data.IpfsHash
      console.log(JsonHash)

      const contract = new ethers.Contract(
        DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
        digitalShopABI,
        data,
      )

      const tx = await contract.addItem(
        id,
        values.category,
        values.subCategory,
        encryptedFullProductLink,
        JsonHash,
        parseUnits(values.price.toString(), '18'),
        values.currency,
        values.itemName,
        values.charityAddress,
      )

      await tx.wait()
      console.log('added')
      setTransaction({ loading: true, status: 'success' })
      setClickCard(null)
    } catch (error) {
      console.log('Error sending File to IPFS:')
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  const validate = Yup.object({
    logo: Yup.string().required('This is Required'),
    preview: Yup.string().required('This is Required'),
    fullProduct: Yup.string().required('This is Required'),
    itemName: Yup.string().required('This is Required'),
    category: Yup.string().required('This is Required'),
    subCategory: Yup.string().required('This is Required'),
    details: Yup.string().required('This is Required'),
    description: Yup.string().required('This is Required'),
    price: Yup.string().required('This is Required'),
    currency: Yup.string().required('This is Required'),
    charityAddress: Yup.string().required('This is Required'),
  })

  return (
    <div className="photo-sub-menu-container sub-menu-container">
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
                <p className="title">Photos</p>
                <div className="content">
                  <div className="content-left">
                    <p>Logo:</p>
                    <p>Main Photo:</p>
                    <p>Photo:</p>
                    <p>Photo:</p>
                    <p>Photo:</p>
                  </div>
                  <div className="content-right">
                    <div>
                      <Field placeholder="Logo" name="logo" type="text" />
                      <ErrorMessage
                        name="logo"
                        className="errorMsg"
                        component="div"
                      />
                    </div>
                    <Field
                      placeholder="Main Photo"
                      name="mainPhoto"
                      type="text"
                    />
                    <Field placeholder="Photo" name="photoOne" type="text" />
                    <Field placeholder="Photo" name="photoTwo" type="text" />
                    <Field placeholder="Photo" name="photoThree" type="text" />
                  </div>
                </div>
              </div>
            )}
            {slide === 2 && (
              <div>
                <IoIosArrowBack
                  className="prev-arrow-icon"
                  onClick={handleSlidePrev}
                />
                <IoIosArrowForward
                  className="next-arrow-icon"
                  onClick={handleSlideNext}
                />
                <p className="title">Photos</p>
                <div className="content">
                  <div className="content-lefts">
                    <p>preview:</p>
                    <p>Full Product:</p>
                    <p>Item Name:</p>
                    <p>Category:</p>
                    <p>SubCategory:</p>
                    <p>Details:</p>
                    <p>Description:</p>
                  </div>
                  <div className="content-right">
                    <div>
                      <Field
                        name="preview"
                        type="url"
                        placeholder="Metadata Link"
                      />
                      <ErrorMessage
                        name="preview"
                        className="errorMsg"
                        component="div"
                      />
                    </div>
                    <div>
                      <Field
                        name="fullProduct"
                        type="url"
                        placeholder="Metadata Link"
                      />
                      <ErrorMessage
                        name="fullProduct"
                        className="errorMsg"
                        component="div"
                      />
                    </div>
                    <div>
                      <Field name="itemName" placeholder="Item" type="text" />
                      <ErrorMessage
                        name="itemName"
                        className="errorMsg"
                        component="div"
                      />
                    </div>
                    <div>
                      <Field as="select" name="category">
                        <option value="">Select a Category</option>
                        <option value="movies">Movies</option>
                        <option value="courses">Courses</option>
                        <option value="books">Books</option>
                        <option value="music">Music</option>
                      </Field>
                      <ErrorMessage
                        name="category"
                        className="errorMsg"
                        component="div"
                      />
                    </div>

                    <div>
                      <Field as="select" name="subCategory">
                        <option value="">Select a SubCategory</option>
                        {getSubcategory(values.category).map((f, index) => {
                          return (
                            <option value={f} key={index}>
                              {f}
                            </option>
                          )
                        })}
                      </Field>
                      <ErrorMessage
                        name="subCategory"
                        className="errorMsg"
                        component="div"
                      />
                    </div>
                    <div>
                      <Field name="details" placeholder="Details" type="text" />
                      <ErrorMessage
                        name="details"
                        className="errorMsg"
                        component="div"
                      />
                    </div>
                    <div>
                      <Field
                        as="textarea"
                        rows={2}
                        name="description"
                        style={{ width: '100%' }}
                      ></Field>
                      <ErrorMessage
                        name="description"
                        className="errorMsg"
                        component="div"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {slide === 3 && (
              <div>
                <IoIosArrowBack
                  className="prev-arrow-icon"
                  onClick={handleSlidePrev}
                />
                <p className="title">Photos</p>
                <div className="content">
                  <div className="content-lefts">
                    <p>Price:</p>
                    <p>Currency:</p>
                    <p>Select Charity Organisation From List:</p>
                  </div>
                  <div className="content-right">
                    <div>
                      <Field name="price" type="number" placeholder="0.00" />
                      <ErrorMessage
                        name="price"
                        className="errorMsg"
                        component="div"
                      />
                    </div>
                    <div>
                      <Field as="select" name="currency">
                        <option value="">Select a Currency</option>
                        <option value={LEASH_TOKEN_ADDRESS}>LEASH</option>
                        <option value={SHIB_TOKEN_ADDRESS}>SHIB</option>
                        <option value={PAW_TOKEN_ADDRESS}>PAW</option>
                        <option value={BONE_TOKEN_ADDRESS}>BONE</option>
                        <option value={SHI_TOKEN_ADDRESS}>SHI</option>
                      </Field>
                      <ErrorMessage
                        name="currency"
                        className="errorMsg"
                        component="div"
                      />
                    </div>
                    <div>
                      <Field as="select" name="charityAddress">
                        <option value="">Select a Charity Address</option>
                        {charityList.map((f, index) => {
                          return (
                            <option value={f} key={index}>
                              {f}
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
                    <div className="btn-cont">
                      <Button
                        variant="primary"
                        type="submit"

                        // disabled={!(dirty && isValid)}
                      >
                        Submit Listing and Put on Sale
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddItem
