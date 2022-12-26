import React, { useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
import { ethers } from 'ethers'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { parseUnits } from 'ethers/lib/utils.js'
import { IoIosArrowDown } from 'react-icons/io'
import { BsArrowLeftCircle } from 'react-icons/bs'
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'

import { useTransactionModal } from '../../../context/TransactionContext'
import { MARKETPLACE_CONTRACT_ADDRESS } from '../../../utils/contractAddress'
import auctionMarketplaceABI from '../../../utils/abi/auctionMarketplaceABI.json'
import { tokensList } from '../../../constants/contract'
import { getTokenDecimals } from '../../../utils/methods'
import { PENDING_MESSAGE, SUCCESS_MESSAGE } from '../../../utils/messaging'
import { formatAddress } from '../../../constants/variants'
import { useAppSelector } from '../../../store/store'

type IMarketplaceCardProps = {
  setOnMarketplace: React.Dispatch<boolean>
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
}

const MarketPlaceCard: React.FC<IMarketplaceCardProps> = ({
  setOnMarketplace,
  contractAddress,
  isApproved,
  handleApprove,
}) => {
  const { id } = useParams()
  const { address } = useAccount()
  const location = useLocation()
  const navigate = useNavigate()
  const { setTransaction } = useTransactionModal()
  const { data } = useSigner()
  const [dropDown, setDropDown] = useState(false)
  const charityList = useAppSelector((store) => store.general.charityList)

  const handlePutOnSale = async (values: typeof initialState) => {
    if (!address || !data) return
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
      const tx = await contract.fixedSale(
        id,
        parseUnits(
          values.price.toString(),
          await getTokenDecimals(values.token.address, data),
        ).toString(),
        values.token.address,
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
      console.log('------Error On Put on sale--------')
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  const validate = Yup.object({
    charityAddress: Yup.string().required('This is Required'),
    price: Yup.string().required('This is Required'),
  })

  return (
    <Formik
      initialValues={initialState}
      onSubmit={handlePutOnSale}
      validationSchema={validate}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div className="on-marketplace-container">
            <BsArrowLeftCircle
              className="arrow-icon"
              style={{ marginTop: '15px' }}
              onClick={() => {
                setOnMarketplace(false)
              }}
            />
            <p className="title">On Marketplace</p>
            <div className="on-marketplace-sub-container">
              <div className="content">
                <div className="content-left">
                  <p>Select Charity Organisation From List</p>
                  <p>Price</p>
                </div>
                <div className="content-right">
                  <div>
                    <Field as="select" name="charityAddress">
                      <option value="">--- select a charity address ---</option>
                      {charityList.map((list) => (
                        <option key={list} value={list}>
                          {formatAddress(list)}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="charityAddress"
                      className="errorMsg"
                      component="div"
                    />
                  </div>
                  <div className="price-select-container">
                    <div className="left">
                      <Field
                        type="number"
                        placeholder="price"
                        name="price"
                        // onChange={(e) => setPrice(e.target.value)}
                      />
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
                    {!isApproved ? (
                      <button
                        type="button"
                        className="putOnSaleBtn"
                        onClick={() => handleApprove()}
                      >
                        Approve
                      </button>
                    ) : (
                      <button className="putOnSaleBtn" type="submit">
                        Put On Sale
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default MarketPlaceCard
