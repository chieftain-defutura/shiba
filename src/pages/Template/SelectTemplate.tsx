import axios from 'axios'
import { create } from 'ipfs-http-client'
import { useTransactionModal } from 'context/TransactionContext'
import { TemplateModal } from 'components/TemplateModal'
import React, { useRef, useState } from 'react'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { useAccount, useSigner } from 'wagmi'
import Template from './index'
import { DemoTemplate } from './Template'
import { Buffer } from 'buffer'

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

const SelectTemplate: React.FC<{
  tokenData: any
  setClickCard: any
}> = ({ tokenData, setClickCard }) => {
  return (
    <div>
      <div className="templateContainer">
        <h4 className="heading" style={{ marginBottom: '6px' }}>
          {tokenData.domainName}
        </h4>
        <h3 style={{ textAlign: 'center', marginBottom: '50px' }}>
          Select Template
        </h3>
        <div className="arrowIcons">
          <BsArrowLeftCircle
            style={{ fontSize: '28px', cursor: 'pointer' }}
            className="arrow-icon"
            onClick={() => setClickCard('file Details')}
          />
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
          }}
        >
          {DemoTemplate.map((f, index) => {
            return (
              <DemoTemplates
                filePathTemplate={f.filePathTemplate}
                image={f.image}
                key={index}
                setClickCard={setClickCard}
                template={f.template}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default SelectTemplate

interface IDemoTemplates {
  image: string
  template: string
  filePathTemplate: string
  setClickCard: React.Dispatch<any>
}
const DemoTemplates: React.FC<IDemoTemplates> = ({
  image,
  template,
  filePathTemplate,
  setClickCard,
}) => {
  const [modal, setmodal] = useState(false)

  const toggleModal = () => setmodal(false)

  return (
    <div className="templateFlex">
      <div
        className="templateImgContent"
        onClick={() => setmodal(true)}
        style={{
          backgroundImage: `url(${image}`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          width: '100%',
          aspectRatio: '16/9',
        }}
      >
        <div
          className="template"
          style={{
            background: 'rgba(0,0,0,0.5)',
            width: '100%',
            height: '100%',
            display: 'flex',
            marginLeft: '.5px',
            marginTop: '-9px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2>{template}</h2>
        </div>
      </div>

      <Templates
        path={filePathTemplate}
        openModal={modal}
        setClickCard={setClickCard}
        toggleModal={toggleModal}
        saved={false}
      />
    </div>
  )
}

interface ITemplates {
  saved: boolean
  path: string
  openModal: boolean
  setClickCard: React.Dispatch<any>
  toggleModal: () => void
}
const Templates: React.FC<ITemplates> = ({
  path,
  openModal,
  toggleModal,
  setClickCard,
}) => {
  const { data: signerData } = useSigner()
  const { address } = useAccount()
  const { setTransaction } = useTransactionModal()

  const [saved, setSaved] = useState(false)
  const [htmlFileString, setHtmlFileString] = useState('')
  const htmlRef = useRef<HTMLDivElement>(null)

  const fetchHtml = async () => {
    const examplePage = path
    const { data } = await axios.get(examplePage, { responseType: 'text' })
    setHtmlFileString(data)
  }

  const handleClick = async () => {
    if (!htmlRef.current) return
    setSaved(true)

    setHtmlFileString(htmlRef.current?.innerHTML)
    toggleModal()
  }

  const handleSubmit = async () => {
    if (!address || !signerData || !htmlFileString) return
    if (htmlFileString) {
      try {
        setTransaction({ loading: true, status: 'pending' })

        const JsonHash = await client.add(htmlFileString)
        const imagePath = JsonHash.path
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${imagePath}`
        console.log(ImgHash)
        setTransaction({ loading: true, status: 'success' })

        console.log('updated')
        setClickCard(null)
      } catch (error) {
        console.log('Error sending File to IPFS:')
        console.log(error)
        setTransaction({ loading: true, status: 'error' })
      }
    }
  }
  return (
    <div>
      <TemplateModal
        title={'My modal'}
        isOpen={openModal}
        onClose={toggleModal}
      >
        <div>
          <div>{!saved && <button onClick={handleClick}>Save</button>}</div>

          <div>
            <Template
              fetchHtml={fetchHtml}
              htmlFileString={htmlFileString}
              htmlRef={htmlRef}
              setHtmlFileString={setHtmlFileString}
            />
          </div>
        </div>
      </TemplateModal>

      <div className="submitBtn">
        {saved && <button onClick={handleSubmit}>Submit Changes</button>}
      </div>
    </div>
  )
}
