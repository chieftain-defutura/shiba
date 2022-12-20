import { ethers } from 'ethers'
import React from 'react'
import { useAccount, useSigner } from 'wagmi'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import shipmentABI from '../../../utils/abi/shipmentABI.json'
import { useTransactionModal } from '../../../context/TransactionContext'
import { SHIPMENT_CONTRACT } from '../../../utils/contractAddress'
import { IAwaitingDelivery } from '../../../constants/types'

interface IReceivedProps {
  data: IAwaitingDelivery
  setState: React.Dispatch<null>
}

const Received: React.FC<IReceivedProps> = ({ data, setState }) => {
  const { data: signerData } = useSigner()
  const { address } = useAccount()
  const { setTransaction } = useTransactionModal()

  const handleRecieved = async (values: any) => {
    if (!address || !signerData) return
    try {
      setTransaction({ loading: true, status: 'pending' })
      const contract = new ethers.Contract(
        SHIPMENT_CONTRACT,
        shipmentABI,
        signerData,
      )
      const tx = await contract.orderReceived(data.id, values.review)
      await tx.wait()
      setTransaction({ loading: true, status: 'success' })
      setState(null)
    } catch (error) {
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  return (
    <div className="received-container">
      <div className="received-top">
        <p>0x002...02: All Great received, and very satisfied!</p>
        <p>0x003...03: Thank you, wish you grow and many sells</p>
        <p>0x003...04: Will buy always from you mate</p>
        <p>0x004...04: Great seller</p>
        <p>0x005...05: Just received shoes!</p>
      </div>
      <Formik
        initialValues={{ review: '' }}
        validationSchema={Yup.object({
          review: Yup.string()
            .max(250, 'maximum 250 characters only')
            .required('This field is required'),
        })}
        onSubmit={handleRecieved}
      >
        {() => (
          <Form>
            <div className="received-bottom">
              <Field name="review" />
              <button type="submit">Send and Mark as Received</button>
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

export default Received
