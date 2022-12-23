import React, { useEffect, useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
import { ethers } from 'ethers'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { parseUnits } from 'ethers/lib/utils.js'
import { IoIosArrowDown } from 'react-icons/io'
import { BsArrowLeftCircle } from 'react-icons/bs'
import * as Yup from 'yup'

import { useTransactionModal } from '../../../context/TransactionContext'
import { MARKETPLACE_CONTRACT_ADDRESS } from '../../../utils/contractAddress'
import auctionMarketplaceABI from '../../../utils/abi/auctionMarketplaceABI.json'
import { tokensList } from '../../../constants/contract'
import { ArrElement } from '../../../constants/types'
import { getTokenDecimals } from '../../../utils/methods'
import { PENDING_MESSAGE, SUCCESS_MESSAGE } from '../../../utils/messaging'
import { formatAddress } from '../../../constants/variants'
import { useAppSelector } from '../../../store/store'
import { ErrorMessage, Field, Form, Formik } from 'formik'

type IMarketplaceCardProps = {
  setOnMarketplace: React.Dispatch<boolean>
  contractAddress: string
  isApproved: boolean
  handleApprove: () => Promise<void>
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
  const [selectedDropDown, setSelectedDropDown] =
    useState<ArrElement<typeof tokensList>>()
  const [price, setPrice] = useState('')
  const [charityAddress, setCharityAddress] = useState('')
  const charityList = useAppSelector((store) => store.general.charityList)

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
      const tx = await contract.fixedSale(
        id,
        parseUnits(
          price,
          await getTokenDecimals(selectedDropDown.address, data),
        ).toString(),
        selectedDropDown.address,
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
      console.log('------Error On Put on sale--------')
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  const validate = Yup.object({
    selectCharity: Yup.string().required('This is Required'),
    price: Yup.string().required('This is Required'),
  })

  return (
    <Formik
      initialValues={{
        selectCharity: '',
        price: '',
        tokenAddress: '',
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
                  <Field as="select" name="selectCharity">
                    {charityList.map((list) => (
                      <option key={list} value={list}>
                        {formatAddress(list)}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="selectCharity"
                    className="errorMsg"
                    component="div"
                  />
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
                        // disabled={!price || !selectedDropDown}
                        onClick={handlePutOnSale}
                      >
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
