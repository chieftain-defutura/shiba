import React, { useRef, useState, useMemo } from 'react'
import Slider from 'react-slick'
import { ethers } from 'ethers'
import { useQuery } from 'urql'
import { erc20ABI, useAccount, useSigner } from 'wagmi'
import { useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import ReactPlayer from 'react-player'

import { useTransactionModal } from 'context/TransactionContext'
import { DIGITAL_GOODS_NFT_CONTRACT_ADDRESS } from 'utils/contractAddress'
import digitalShopABI from 'utils/abi/digitalShopABI.json'
import rightArrowIcon from 'assets/img/right-arrow-icon.png'
import leftArrowIcon from 'assets/img/left-arrow-icon.png'
import HomeLayout from 'Layout/HomeLayout'
import { IDigitalItem } from 'constants/types'
import { DigitalItemQuery } from 'constants/query'
import './DigitalItemDetailsPage.css'
import { useAppSelector } from '../../store/store'
import { formatTokenUnits } from '../../utils/formatters'
import { useGetIpfsDataQuery } from 'store/slices/ipfsApiSlice'
import cameraImg from 'assets/icon/Camera.svg'
import CardDetailsLoading from 'components/Loading/CardDetailsLoading'
import Book from 'assets/icon/Book-mark.svg'
import Music from 'assets/icon/Music.svg'
import Modal from 'components/Model'

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const DigitalItemsDetailsPage: React.FC = () => {
  const { itemId } = useParams()
  const [result] = useQuery<{ digitalItem: IDigitalItem }>({
    query: DigitalItemQuery,
    variables: { id: itemId },
  })

  const { data, fetching } = result
  return (
    <HomeLayout>
      {fetching ? (
        <div>
          <CardDetailsLoading />
        </div>
      ) : !data ? (
        <div>
          <p style={{ textTransform: 'uppercase' }}>
            There is no item with this id
          </p>
        </div>
      ) : (
        <ProductDetails {...data.digitalItem} />
      )}
    </HomeLayout>
  )
}

const ProductDetails: React.FC<IDigitalItem> = ({
  erc20Token,
  shopDetails,
  metadata,
  price,
  category,
  owner,
}) => {
  const { itemId } = useParams()
  const { data: signerData } = useSigner()
  const { address } = useAccount()
  const slider = useRef<Slider>(null)
  const { setTransaction } = useTransactionModal()
  const [digitalErrorImgOne, setDigitalErrorImgOne] = useState(false)
  const [digitalErrorImgTwo, setDigitalErrorImgTwo] = useState(false)
  const [digitalErrorImgThree, setDigitalErrorImgThree] = useState(false)
  const [preview, setPreview] = useState(false)
  const user = useAppSelector((store) => store.user)

  const {
    data: ipfsData,
    isLoading,
    data,
  } = useGetIpfsDataQuery({
    hash: metadata,
  })
  console.log(shopDetails.owner.id)
  const existingOwner = useMemo(() => {
    if (!owner) return []
    return owner.map((o) => o.id)
  }, [owner])

  const handleBuy = async () => {
    if (!address || !signerData) return

    if (
      user[erc20Token.id.toLowerCase()] <
      Number(formatTokenUnits(price, erc20Token.decimals))
    )
      return setTransaction({
        loading: true,
        status: 'error',
        message: 'Insufficient balance',
      })

    try {
      setTransaction({ loading: true, status: 'pending' })
      const erc20Contract = new ethers.Contract(
        erc20Token.id,
        erc20ABI,
        signerData,
      )

      const allowance = Number(
        (
          await erc20Contract.allowance(
            address,
            DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
          )
        ).toString(),
      )

      if (allowance <= 0) {
        const tx = await erc20Contract.approve(
          DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
          ethers.constants.MaxUint256,
        )
        await tx.wait()
      }

      const contract = new ethers.Contract(
        DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
        digitalShopABI,
        signerData,
      )
      const tx = await contract.buyItem(itemId)
      await tx.wait()
      console.log('added')

      setTransaction({ loading: true, status: 'success' })
    } catch (error: any) {
      console.log(error)
      // const f = Object.entries(error).map((d) => d)
      console.log(error.reason)
      setTransaction({ loading: true, status: 'error', message: error.reason })
    }
  }

  return (
    <div className="music-details-container">
      <div className="music-details-container-right">
        <h2 className="title">{shopDetails.domainName}</h2>
        <div className="content-box">
          <div className="content-box-left">
            <div className="slider">
              <Slider {...settings} ref={slider}>
                <div>
                  {isLoading ? (
                    <Skeleton height={'100%'} />
                  ) : !data || digitalErrorImgOne ? (
                    <div className="sliderImg-camera">
                      <img src={cameraImg} alt="camera" />
                    </div>
                  ) : (
                    <div className="slider-item">
                      <img
                        src={ipfsData?.photoOne}
                        alt="slider"
                        onError={() => setDigitalErrorImgOne(true)}
                      />
                    </div>
                  )}
                </div>
                <div>
                  {isLoading ? (
                    <Skeleton height={'100%'} />
                  ) : !data || digitalErrorImgTwo ? (
                    <div className="sliderImg-camera">
                      <img src={cameraImg} alt="camera" />
                    </div>
                  ) : (
                    <div className="slider-item">
                      <img
                        src={ipfsData?.photoTwo}
                        alt="slider"
                        onError={() => setDigitalErrorImgTwo(true)}
                      />
                    </div>
                  )}
                </div>
                <div>
                  {isLoading ? (
                    <Skeleton height={'100%'} />
                  ) : !data || digitalErrorImgThree ? (
                    <div className="sliderImg-camera">
                      <img src={cameraImg} alt="camera" />
                    </div>
                  ) : (
                    <div className="slider-item">
                      <img
                        src={ipfsData?.photoThree}
                        alt="slider"
                        onError={() => setDigitalErrorImgThree(true)}
                      />
                    </div>
                  )}
                </div>
              </Slider>

              {preview &&
                category === 'movies' &&
                (ipfsData?.preview.includes('youtube.com') ? (
                  <Modal isOpen={preview} handleClose={() => setPreview(false)}>
                    <ReactPlayer url={ipfsData?.preview} />
                  </Modal>
                ) : (
                  <Modal isOpen={preview} handleClose={() => setPreview(false)}>
                    <video
                      controls
                      playsInline
                      muted
                      src={ipfsData?.preview}
                    ></video>
                  </Modal>
                ))}
              {preview &&
                category === 'courses' &&
                (ipfsData?.preview.includes('youtube.com') ? (
                  <Modal isOpen={preview} handleClose={() => setPreview(false)}>
                    <ReactPlayer url={ipfsData?.preview} />
                  </Modal>
                ) : (
                  <Modal isOpen={preview} handleClose={() => setPreview(false)}>
                    <video
                      controls
                      playsInline
                      muted
                      src={ipfsData?.preview}
                    ></video>
                  </Modal>
                ))}
              {preview && category === 'music' && (
                <Modal isOpen={preview} handleClose={() => setPreview(false)}>
                  <div className="book-preview">
                    <img className="abstract" src={Music} alt="card" />
                    <audio controls src={ipfsData.preview}></audio>
                    <p>Name: {isLoading ? <Skeleton /> : ipfsData?.itemName}</p>
                  </div>
                </Modal>
              )}
              {preview && category === 'books' && (
                <Modal isOpen={preview} handleClose={() => setPreview(false)}>
                  <a
                    href={ipfsData.preview}
                    target="_blank"
                    rel="noreferrer noopener"
                    download
                    className="book-preview"
                  >
                    <img src={Book} alt="card" />
                    <p>Name:{isLoading ? <Skeleton /> : ipfsData?.itemName}</p>
                  </a>
                </Modal>
              )}

              <button
                className="prev-btn slider-btn"
                onClick={() => slider.current?.slickPrev()}
              >
                <img src={leftArrowIcon} alt="arrow" />
              </button>
              <button
                className="next-btn slider-btn"
                onClick={() => slider.current?.slickNext()}
              >
                <img src={rightArrowIcon} alt="arrow" />
              </button>
            </div>
            <div className="description-cont" style={{ marginTop: '-10px' }}>
              <h3>
                Product Description:
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <div style={{ marginTop: '10px' }}>
                    <LongText content={ipfsData?.description} limit={390} />
                  </div>
                )}
              </h3>
            </div>
          </div>
          <div className="content-box-right">
            <div className="product-details">
              <p>Name: {isLoading ? <Skeleton /> : ipfsData?.itemName}</p>
              <br />
              <p>
                Details:
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <LongText content={ipfsData?.details} limit={180} />
                )}
              </p>
              <button
                className="preview-btn"
                onClick={() => setPreview((m) => !m)}
              >
                Preview
              </button>
            </div>
            <br />
            {/* <div className="quantity-container">
                  <p>Quantity:</p>
                  <div className="quantity-box">
                    <button onClick={handleMinus}>
                      <BiMinus />
                    </button>
                    <p>{quantity}</p>
                    <button onClick={handlePlus}>
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div> */}
            <div className="buy-container">
              <div className="top">
                <p>
                  Price:
                  {ethers.utils.formatUnits(price, erc20Token.decimals)}
                  {erc20Token.symbol}
                </p>
              </div>
              {shopDetails.owner.id.toLowerCase() === address?.toLowerCase() ? (
                <div>you are the owner</div>
              ) : !address ? (
                <button onClick={handleBuy}>Buy</button>
              ) : !existingOwner.includes(address?.toLocaleLowerCase()) ? (
                <button onClick={handleBuy}>Buy</button>
              ) : (
                <div>You have already purchased</div>
              )}

              {/* {status === 'ACTIVE' && <button onClick={handleBuy}>Buy</button>}
              {status === 'PURCHASED' && <h3>Item is Sold</h3>} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DigitalItemsDetailsPage

interface ILongText {
  content: string
  limit: number
}

export const LongText: React.FC<ILongText> = ({ content, limit }) => {
  const [showAll, setShowAll] = useState(false)

  const showMore = () => setShowAll(true)
  const showLess = () => setShowAll(false)

  if (content.length <= limit) {
    // there is nothing more to show
    return <div>{content}</div>
  }
  if (showAll) {
    return (
      <div style={{ height: '150px' }}>
        <p style={{ fontSize: '13px' }}>{content}</p>
        <button onClick={showLess} className="read-less">
          Read less
        </button>
      </div>
    )
  }
  const toShow = content.substring(0, limit) + '...'
  return (
    <div>
      <p style={{ fontSize: '13px' }}> {toShow}</p>

      <button onClick={showMore} className="read-less">
        Read more
      </button>
    </div>
  )
}
