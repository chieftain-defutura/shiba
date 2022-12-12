import React from 'react'
import { useAccount, useSigner } from 'wagmi'
import { useParams } from 'react-router-dom'
import { ethers } from 'ethers'
import axios from 'axios'
import { Field, Form, Formik } from 'formik'

import { DIGITAL_GOODS_NFT_CONTRACT_ADDRESS } from '../../utils/contractAddress'
import digitalShopABI from '../../utils/abi/digitalShopABI.json'
import { PAW_TOKEN_ADDRESS } from '../../utils/contractAddress'
import { useTransactionModal } from '../../context/TransactionContext'
import { getEncryptedData } from '../../utils/formatters'

const AddItem: React.FC = () => {
  const { id } = useParams()
  const { data } = useSigner()
  const { address } = useAccount()
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
          itemName: values.ItemName,
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
      const tx = await contract.addItem(
        id,
        values.category,
        values.subCategory,
        encryptedFullProductLink,
        dataHash,
        values.price,
        PAW_TOKEN_ADDRESS,
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
                <Field as="textarea" rows={5} name="description"></Field>
                <Field name="price" placeholder="0.00" />
                <Field as="select" name="currency">
                  <option value="">Select a Category</option>
                  <option value="leash">LEASH</option>
                  <option value="shib">SHIB</option>
                  <option value="paw">PAW</option>
                </Field>
                <div className="btn-cont">
                  <button>Submit Listing and Put on Sale</button>
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
