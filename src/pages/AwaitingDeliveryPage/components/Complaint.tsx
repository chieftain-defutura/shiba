import { ethers } from 'ethers'
import React from 'react'
import { useAccount, useSigner } from 'wagmi'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import Skeleton from 'react-loading-skeleton'
import { useQuery } from 'urql'

import shipmentABI from 'utils/abi/shipmentABI.json'
import { useTransactionModal } from 'context/TransactionContext'
import { SHIPMENT_CONTRACT } from 'utils/contractAddress'
import { IAwaitingDelivery, IReviewOfShop } from 'constants/types'
import { getReviewOfShopQuery } from 'constants/query'
import { formatAddress } from 'constants/variants'

interface IComplaintProps {
  data: IAwaitingDelivery
  setState: React.Dispatch<null>
}

const Complaint: React.FC<IComplaintProps> = ({ data, setState }) => {
  const { data: signerData } = useSigner()
  const { address } = useAccount()
  const { setTransaction } = useTransactionModal()
  const [result] = useQuery<{ reviews: IReviewOfShop[] }>({
    query: getReviewOfShopQuery,
    variables: { shopId: data.itemId.shopDetails.id, status: 'BAD' },
  })
  const { fetching, data: reviewsData } = result

  const handleComplain = async (values: any) => {
    if (!address || !signerData) return
    try {
      setTransaction({ loading: true, status: 'pending' })
      const contract = new ethers.Contract(
        SHIPMENT_CONTRACT,
        shipmentABI,
        signerData,
      )
      const tx = await contract.orderComplaint(data.id, values.review)
      await tx.wait()
      setTransaction({ loading: true, status: 'success' })
      setState(null)
    } catch (error) {
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  return (
    <div className="complain-container">
      <div className="complain-top">
        {fetching ? (
          <Skeleton count={5} baseColor="#ebebeb" highlightColor="#f5f5f5" />
        ) : !reviewsData?.reviews.length ? (
          <div>
            <p style={{ textAlign: 'center', lineHeight: '100px' }}>
              No review added yet
            </p>
          </div>
        ) : (
          reviewsData?.reviews.map((review, index) => (
            <p key={index.toString()}>
              {formatAddress(review.user)}: {review.review}
            </p>
          ))
        )}
      </div>
      <Formik
        initialValues={{ review: '' }}
        validationSchema={Yup.object({
          review: Yup.string()
            .max(250, 'maximum 250 characters only')
            .required('This field is required'),
        })}
        onSubmit={handleComplain}
      >
        {() => (
          <Form>
            <div className="complain-bottom">
              <Field name="review" />
              <button type="submit">Send and Complain</button>
            </div>
            <ErrorMessage
              component={'div'}
              className="awaiting-delivery-input-error"
              name="review"
            />
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Complaint
