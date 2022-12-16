import React from 'react'
import { useAccount, useSigner } from 'wagmi'
import { useParams } from 'react-router-dom'
import { ethers } from 'ethers'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'

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
import { parseUnits } from 'ethers/lib/utils.js'
import { BsArrowLeftCircle } from 'react-icons/bs'

interface IAddItem {
  setAddItem: any
}

const AddItem: React.FC<IAddItem> = ({ setAddItem }) => {
  const { id } = useParams()
  const { data } = useSigner()
  const { address } = useAccount()
  const navigate = useNavigate()
  const { setTransaction } = useTransactionModal()

  const categoryList = [
    {
      name: 'movies',
      subcategory: ['comedy', 'action', 'adventure', 'romance'],
    },
    {
      name: 'courses',
      subcategory: ['education', 'others'],
    },
    {
      name: 'books',
      subcategory: ['auto_biography', 'romance', 'novel', 'others'],
    },
    {
      name: 'music',
      subcategory: ['rock', 'pop', 'jazz', 'others'],
    },
  ]

  const getSubcategory = (category: string) => {
    const res = categoryList.find((f) => f.name === category)

    if (!res) return []

    return res.subcategory
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
          preview: values.preview,
          itemName: values.itemName,
          details: values.details,
          description: values.description,
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
        DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
        digitalShopABI,
        data,
      )
      console.log(values.currency)

      const tx = await contract.addItem(
        id,
        values.category,
        values.subCategory,
        encryptedFullProductLink,
        dataHash,
        parseUnits(values.price, '18'),
        values.currency,
      )

      await tx.wait()
      console.log('added')
      setTransaction({ loading: true, status: 'success' })
      navigate('/')
    } catch (error) {
      console.log('Error sending File to IPFS:')
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }
  return (
    <div className="photo-sub-menu-container sub-menu-container">
      <Formik
        initialValues={{
          preview: '',
          fullProduct: '',
          itemName: '',
          category: '',
          subCategory: '',
          details: '',
          description: '',
          price: '',
          currency: '',
        }}
        onSubmit={handleAddItem}
      >
        {({ values }) => (
          <Form>
            <BsArrowLeftCircle
              className="arrow-icon"
              style={{ position: 'absolute', top: '40px' }}
              onClick={() => setAddItem(null)}
            />
            <p className="title">Photos</p>
            <div className="content">
              <div className="content-left">
                <p>preview:</p>
                <p>Full Product:</p>
                <p>Item Name:</p>
                <p>Category:</p>
                <p>SubCategory:</p>
                <p>Details:</p>
                <p>Description:</p>
                <p>Price:</p>
                <p>Currency:</p>
              </div>
              <div className="content-right">
                <Field name="preview" type="url" placeholder="Metadata Link" />
                <Field
                  name="fullProduct"
                  type="url"
                  placeholder="Metadata Link"
                />
                <Field name="itemName" placeholder="Item" type="text" />
                <Field as="select" name="category">
                  <option value="">Select a Category</option>
                  <option value="movies">Movies</option>
                  <option value="courses">Courses</option>
                  <option value="books">Books</option>
                  <option value="music">Music</option>
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
                <Field name="details" placeholder="Details" type="text" />
                <Field as="textarea" rows={2} name="description"></Field>
                <Field name="price" placeholder="0.00" />
                <Field as="select" name="currency">
                  <option value="">Select a Category</option>
                  <option value={LEASH_TOKEN_ADDRESS}>LEASH</option>
                  <option value={SHIB_TOKEN_ADDRESS}>SHIB</option>
                  <option value={PAW_TOKEN_ADDRESS}>PAW</option>
                  <option value={BONE_TOKEN_ADDRESS}>BONE</option>
                  <option value={SHI_TOKEN_ADDRESS}>SHI</option>
                </Field>
                <div className="btn-cont">
                  {/* <Button variant="primary" >
                    Submit Listing and Put on Sale
                  </Button> */}
                  <Button variant="primary">
                    Submit Listing and Put on Sale
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddItem
