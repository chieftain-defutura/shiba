import axios from 'axios'
import { TemplateModal } from 'components/TemplateModal'
import React, { useState } from 'react'
import { BsArrowLeftCircle } from 'react-icons/bs'
import Template from './index'
import { DemoTemplate } from './Template'

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
        <div className="templateFlex">
          {DemoTemplate.map((f, index) => {
            return (
              <DemoTemplates
                filePathTemplate={f.filePathTemplate}
                image={f.image}
                key={index}
                template={f.template}
              />
            )
          })}
        </div>
        {/* <div className="submitBtn">
          {saved && <button>Submit Changes</button>}
        </div> */}
      </div>
    </div>
  )
}
export default SelectTemplate

interface IDemoTemplates {
  image: string
  template: string
  filePathTemplate: string
}
const DemoTemplates: React.FC<IDemoTemplates> = ({
  image,
  template,
  filePathTemplate,
}) => {
  const [modal, setmodal] = useState(false)

  const toggleModal = () => setmodal(false)

  return (
    <>
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
            height: '110%',
            display: 'flex',
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
        toggleModal={toggleModal}
        saved={false}
      />
    </>
  )
}

interface ITemplates {
  saved: boolean
  path: string
  openModal: boolean
  toggleModal: () => void
}
const Templates: React.FC<ITemplates> = ({ path, openModal, toggleModal }) => {
  const [saved, setSaved] = useState(false)
  const [htmlFileString, setHtmlFileString] = useState('')
  console.log(htmlFileString)

  const handleClick = async () => {
    setSaved(true)
    toggleModal()
    const examplePage = path
    const { data } = await axios.get(examplePage, { responseType: 'text' })
    setHtmlFileString(data)
  }
  return (
    <TemplateModal title={'My modal'} isOpen={openModal} onClose={toggleModal}>
      <div>
        <div>{!saved && <button onClick={handleClick}>Save</button>}</div>
        <div>
          <Template path={path} />
        </div>
      </div>
    </TemplateModal>
  )
}
