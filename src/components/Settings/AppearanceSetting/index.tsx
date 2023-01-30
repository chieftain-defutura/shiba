import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Formik, Field, Form } from 'formik'
import { useSigner, useAccount } from 'wagmi'
import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer'
import { ethers } from 'ethers'

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { BsArrowLeftCircle } from 'react-icons/bs'
import digitalShopABI from 'utils/abi/digitalShopABI.json'
import { useTransactionModal } from 'context/TransactionContext'
import { useGetNftsByIdQuery } from 'store/slices/alchemyApiSlice'

const initialState = {
  logo: '',
  mainPhoto: '',
  videoOne: '',
  videoTwo: '',
  videoThree: '',
  shopName: '',
  description: '',
  contacts: '',
  website: '',
  twitter: '',
  instagram: '',
}

interface IAppearanceSetting {
  setClickCard: any
  contractAddress: string
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

const AppearanceSetting: React.FC<IAppearanceSetting> = ({
  setClickCard,
  contractAddress,
}) => {
  const { id } = useParams() as { id: string }
  const { data: signerData } = useSigner()
  const { address } = useAccount()
  const [slide, setSlide] = useState(1)
  const { setTransaction } = useTransactionModal()
  const { data, isLoading } = useGetNftsByIdQuery({
    tokenId: id,
    contractAddress,
  })

  const handleSlidePrev = () => {
    if (slide > 1) {
      setSlide(slide - 1)
    }
  }

  const handleSlideNext = () => {
    setSlide(slide + 1)
  }

  const handleAppearanceSetting = async (values: typeof initialState) => {
    if (!address || !signerData) return
    try {
      setTransaction({ loading: true, status: 'pending' })
      // const resData = await axios({
      //   method: 'post',
      //   url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      //   data: values,
      //   headers: {
      //     pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
      //     pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET,
      //     'Content-Type': 'application/json',
      //   },
      // })

      const JsonHash = await client.add(JSON.stringify(values))
      const imagePath = JsonHash.path
      const ImgHash = `https://gateway.pinata.cloud/ipfs/${imagePath}`
      console.log(ImgHash)
      const contract = new ethers.Contract(
        contractAddress,
        digitalShopABI,
        signerData,
      )

      const tx = await contract.setBaseURI(id, JsonHash)
      await tx.wait()
      console.log('updated')
      setTransaction({ loading: true, status: 'success' })
      setClickCard(null)
    } catch (error) {
      console.log('Error sending File to IPFS:')
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  if (isLoading)
    return (
      <div>
        <p>Fetching your settings...</p>
      </div>
    )

  return (
    <>
      <div className="arrow-icon-container">
        {slide === 1 ? (
          <BsArrowLeftCircle
            className="arrow-icon"
            style={{
              fontSize: '27px',
              position: 'absolute',
              top: '30px',
              cursor: 'pointer',
            }}
            onClick={() => setClickCard(null)}
          />
        ) : (
          <IoIosArrowBack
            className="prev-arrow-icon"
            onClick={handleSlidePrev}
          />
        )}
      </div>
      <Formik
        initialValues={data?.metadata || initialState}
        enableReinitialize
        onSubmit={handleAppearanceSetting}
      >
        {() => (
          <Form>
            {slide === 1 && (
              <div className="appearance-settings-sub-menu-container sub-menu-container">
                <IoIosArrowForward
                  className="next-arrow-icon"
                  onClick={handleSlideNext}
                  style={{ marginTop: '12px' }}
                />

                <div className="content">
                  <div className="content-left">
                    <p>Logo:</p>
                    <p>Main Photo / Video:</p>
                    <p>Photo / Video1:</p>
                    <p>Photo / Video2:</p>
                    <p>Photo / Video3:</p>
                  </div>
                  <div className="content-right">
                    <Field
                      name="logo"
                      type="url"
                      placeholder="Metadata Link 350*350"
                    />
                    <Field
                      name="mainPhoto"
                      type="url"
                      placeholder="Metadata Link 600*400"
                    />
                    <Field
                      name="videoOne"
                      type="url"
                      placeholder="Metadata Link"
                    />
                    <Field
                      type="url"
                      name="videoTwo"
                      placeholder="Metadata Link"
                    />
                    <Field
                      type="url"
                      name="videoThree"
                      placeholder="Metadata Link"
                    />
                  </div>
                </div>
                <div className="btn-cont">
                  <button onClick={handleSlideNext}>Next</button>
                </div>
              </div>
            )}
            {slide === 2 && (
              <div className="brief-description-sub-menu-container sub-menu-container">
                <IoIosArrowForward
                  className="next-arrow-icon"
                  onClick={handleSlideNext}
                  style={{ marginTop: '12px' }}
                />

                <div className="content">
                  <div className="content-left">
                    <p>Shop Name:</p>
                    <p>Brief Description:</p>
                    <p style={{ marginTop: '8.2rem' }}>Contacts:</p>
                  </div>
                  <div className="content-right">
                    <Field
                      type="text"
                      name="shopName"
                      placeholder="shop name"
                    />
                    <Field
                      as="textarea"
                      rows={8}
                      name="description"
                      placeholder="Brief Description"
                    ></Field>
                    <Field
                      name="contacts"
                      type="number"
                      placeholder="contact"
                    />
                  </div>
                </div>
                <div className="btn-cont">
                  <button onClick={handleSlideNext}>Next</button>
                </div>
              </div>
            )}
            {slide === 3 && (
              <div className="social-links-sub-menu-container sub-menu-container">
                <div className="content topContent">
                  <div className="content-left">
                    <p>Website:</p>
                    <p>Twitter:</p>
                    <p>Instagram:</p>
                  </div>
                  <div className="content-right topContent">
                    <Field name="website" type="url" placeholder="Link" />
                    <Field name="twitter" type="url" placeholder="Link" />
                    <Field name="instagram" type="url" placeholder="Link" />
                  </div>
                </div>
                <div className="btn-cont">
                  <button>Submit</button>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </>
  )
}

export default AppearanceSetting
