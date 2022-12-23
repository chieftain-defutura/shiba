import React, { useEffect, useState } from 'react'
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
  const [charityAddress, setCharityAddress] = useState('')
  const charityList = useAppSelector((store) => store.general.charityList)
  const { setTransaction } = useTransactionModal()
  const { data } = useSigner()
  const [dropDown, setDropDown] = useState(false)
  const [selectedDropDown, setSelectedDropDown] =
    useState<ArrElement<typeof tokensList>>()
  const [price, setPrice] = useState('')
  const [days, setDays] = useState('')

  useEffect(() => {
    if (charityList.length) setCharityAddress(charityList[0])
  }, [charityList])

  const handlePutOnSale = async () => {
    if (!address || !data || !selectedDropDown) return
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
          price,
          await getTokenDecimals(selectedDropDown.address, data),
        ).toString(),
        selectedDropDown?.address,
        Number(days),
        contractAddress,
        charityAddress,
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
    price: Yup.string().required('This is Required'),
  })

  return (
    <>
      <Formik
        initialValues={{
          charityAddress: '',
          price: '',
          tokenAddress: '',
          selectOption: '',
        }}
        onSubmit={(values) => {
          console.log(values)
        }}
        validationSchema={validate}
      >
        {() => (
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
                          <p>{selectedDropDown?.title}</p>
                          <IoIosArrowDown />
                        </div>
                        <div className={!dropDown ? 'body' : 'body active'}>
                          {tokensList.map((f, index) => {
                            return (
                              <p
                                key={index}
                                onClick={() => {
                                  setSelectedDropDown(f)
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
                      <Field
                        as="select"
                        name="selectOption"
                        //  onChange={(e) => setDays(e.target.value)}
                      >
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
                      {days === 'custom' && (
                        <Field
                          style={{
                            width: '100%',
                            height: '30px',
                            fontSize: '16px',
                            fontFamily: 'Oswald',
                          }}
                          // onChange={(e) => setDays(e.target.value)}
                          type="text"
                          placeholder="Enter your custom days"
                        />
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
                        // disabled={!price || !selectedDropDown || !days}
                        onClick={handlePutOnSale}
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
