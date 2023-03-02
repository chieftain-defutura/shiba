import { TemplateModal } from 'components/TemplateModal'
import React, { useState } from 'react'
import { BsArrowLeftCircle } from 'react-icons/bs'
import Template from './index'
import { DemoTemplate } from './Template'

const SelectTemplate: React.FC<{
  tokenData: any
  setClickCard: any
}> = ({ tokenData, setClickCard }) => {
  const [isModalOpen, setModalState] = React.useState(false)
  const toggleModal = () => setModalState(!isModalOpen)
  const [saved, setSaved] = useState(false)
  const [activeTemplate, setActiveTemplate] = useState(DemoTemplate)
  console.log(activeTemplate)

  const handleClick = () => {
    setSaved(true)
    const letter = ['template modal']
    console.log(letter)
  }
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
              <div
                key={index}
                className="templateImgContent"
                style={{
                  backgroundImage: `url(${f.image})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  width: '100%',
                  aspectRatio: '16/9',
                }}
              >
                <div className="template" onClick={toggleModal}>
                  <h2>{f.template}</h2>
                </div>

                <TemplateModal
                  title={'My modal'}
                  isOpen={isModalOpen}
                  onClose={toggleModal}
                >
                  <div>
                    <div onClick={toggleModal}>
                      {!saved && <button onClick={handleClick}>Save</button>}
                    </div>
                    <div>
                      <Template path={`${f.filePathTemplate}`} />
                    </div>
                  </div>
                </TemplateModal>
              </div>
            )
          })}
        </div>

        <div className="submitBtn">
          {saved && <button>Submit Changes</button>}
        </div>
      </div>
    </div>
  )
}

export default SelectTemplate
