import React, { useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ethers } from 'ethers'
import { IoIosArrowDown } from 'react-icons/io'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { parseUnits } from 'ethers/lib/utils.js'
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'

import { useTransactionModal } from '../../../context/TransactionContext'
import { MARKETPLACE_CONTRACT_ADDRESS } from '../../../utils/contractAddress'
import auctionMarketplaceABI from '../../../utils/abi/auctionMarketplaceABI.json'
import { ArrElement } from '../../../constants/types'
import { tokensList } from '../../../constants/contract'
import { getTokenDecimals } from '../../../utils/methods'
import { PENDING_MESSAGE, SUCCESS_MESSAGE } from '../../../utils/messaging'
import { useAppSelector } from '../../../store/store'
import { formatAddress } from '../../../constants/variants'

type IAuctionCardProps = {
  setOnAction: React.Dispatch<boolean>
  contractAddress: string
  isApproved: boolean
  handleApprove: () => Promise<void>
}

const initialState = {
  charityAddress: '',
  price: '',
  token: {
    title: '',
    address: '',
    decimal: '',
  },
  days: '',
  customDays: '',
}
const AuctionCard: React.FC<IAuctionCardProps> = ({
  setOnAction,
  contractAddress,
  isApproved,
  handleApprove,
}) => {
  const { id } = useParams()
  const { address } = useAccount()
  const location = useLocation()
  const navigate = useNavigate()
  const charityList = useAppSelector((store) => store.general.charityList)
  const { setTransaction } = useTransactionModal()
  const { data } = useSigner()
  const [dropDown, setDropDown] = useState(false)

  const handlePutOnSale = async (values: typeof initialState) => {
    if (!address || !data) return
    console.log(values)

    try {
      setTransaction({
        loading: true,
        status: 'pending',
        message: PENDING_MESSAGE,
      })
      const contract = new ethers.Contract(
        MARKETPLACE_CONTRACT_ADDRESS,
        auctionMarketplaceABI,
        data,
      )
      const tx = await contract.createSaleAuction(
        id,
        parseUnits(
          values.price.toString(),
          await getTokenDecimals(values.token.address, data),
        ).toString(),
        values.token.address,
        values.days === 'custom'
          ? Number(values.customDays)
          : Number(values.days),
        contractAddress,
        values.charityAddress,
      )
      await tx.wait()
      setTransaction({
        loading: true,
        status: 'success',
        message: SUCCESS_MESSAGE,
      })
      navigate(`/${location.pathname.split('/')[1]}`)
    } catch (error) {
      console.log('------Error On Put on Auction--------')
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  const validate = Yup.object({
    charityAddress: Yup.string().required('This is Required'),
    price: Yup.number()
      .moreThan(0, 'price must be greater than 0')
      .required('This is Required'),
    token: Yup.object({
      title: Yup.string().required('This is Required'),
    }),

    days: Yup.string().required('This is Required'),
    customDays: Yup.string().required('This is Required'),
  })

  return (
    <>
      <Formik
        initialValues={initialState}
        onSubmit={handlePutOnSale}
        validationSchema={validate}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="on-marketplace-container">
              <BsArrowLeftCircle
                className="arrow-icon"
                style={{ marginTop: '15px' }}
                onClick={() => {
                  setOnAction(false)
                }}
              />

              <p className="title">On Auction</p>
              <div className="on-marketplace-sub-container">
                <div className="content">
                  <div className="content-left">
                    <p>Select Charity Organisation From List:</p>
                    <p>Price:</p>
                    <p style={{ marginTop: '12px' }}>Select Option:</p>
                  </div>
                  <div className="content-right">
                    <div>
                      <Field as="select" name="charityAddress">
                        {charityList.map((list) => (
                          <option key={list} value={list}>
                            {formatAddress(list)}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        className="errorMsg"
                        component="div"
                        name="charityAddress"
                      />
                    </div>
                    <div className="price-select-container">
                      <div className="left">
                        <Field type="number" placeholder="price" name="price" />
                        <ErrorMessage
                          name="price"
                          className="errorMsg"
                          component="div"
                        />
                      </div>

                      <div className={!dropDown ? ' right' : 'right active'}>
                        <div
                          className="header"
                          onClick={() => setDropDown(!dropDown)}
                        >
                          <p>{values.token.title}</p>
                          <IoIosArrowDown />
                        </div>
                        <div className={!dropDown ? 'body' : 'body active'}>
                          {tokensList.map((f, index) => {
                            return (
                              <p
                                key={index}
                                onClick={() => {
                                  setFieldValue('token', f)
                                  setDropDown(false)
                                }}
                              >
                                {f.title}
                              </p>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                    <div>
                      <Field as="select" name="days">
                        <option value="">select an option</option>
                        <option value="1">1</option>
                        <option value="3">3</option>
                        <option value="7">7</option>
                        <option value="custom">Custom</option>
                      </Field>
                      <ErrorMessage
                        name="selectOption"
                        className="errorMsg"
                        component="div"
                      />
                    </div>
                    <div>
                      {values.days === 'custom' && (
                        <div>
                          <Field
                            style={{
                              width: '100%',
                              height: '30px',
                              fontSize: '16px',
                              fontFamily: 'Oswald',
                            }}
                            type="number"
                            placeholder="Enter your custom days"
                            name="customDays"
                          />
                          <ErrorMessage
                            className="errorMsg"
                            component="div"
                            name="customDays"
                          />
                        </div>
                      )}
                    </div>
                    {!isApproved ? (
                      <button
                        className="putOnSaleBtn"
                        onClick={() => handleApprove()}
                      >
                        Approve
                      </button>
                    ) : (
                      <button
                        className="putOnSaleBtn"
                        type="submit"
                        // disabled={!price || !selectedDropDown || !days}
                      >
                        Put On Sale
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default AuctionCard
