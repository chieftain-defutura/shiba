import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Formik, Field, Form } from 'formik'
import { useSigner, useAccount } from 'wagmi'
import { ethers } from 'ethers'
import axios from 'axios'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { BsArrowLeftCircle } from 'react-icons/bs'

import digitalShopABI from '../../utils/abi/digitalShopABI.json'
import { useTransactionModal } from '../../context/TransactionContext'
import { useGetNftsByIdQuery } from '../../store/slices/alchemyApiSlice'

interface IAppearanceSetting {
  setClickCard: any
  contractAddress: string
}

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

  const handleAppearanceSetting = async (values: any) => {
    if (!address || !signerData) return
    try {
      setTransaction({ loading: true, status: 'pending' })
      const resData = await axios({
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        data: values,
        headers: {
          pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
          pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET,
          'Content-Type': 'application/json',
        },
      })

      const JsonHash = resData.data.IpfsHash
      console.log(JsonHash)
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
              top: '40px',
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
        initialValues={
          data?.metadata || {
            logo: '',
            mainPhoto: '',
            videoOne: '',
            videoTwo: '',
            videoThree: '',
            description: '',
            contacts: '',
            website: '',
            twitter: '',
            instagram: '',
          }
        }
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
                    <p>Brief Description:</p>
                    <p>Contracts:</p>
                  </div>
                  <div className="content-right">
                    <Field as="textarea" rows={13} name="description"></Field>
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
                <div className="content">
                  <div className="content-left">
                    <p>Website:</p>
                    <p>Twitter:</p>
                    <p>Instagram:</p>
                  </div>
                  <div className="content-right">
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
