import React, { useCallback, useEffect, useState } from "react";
import cardImg from "../../assets/img/card-3.png";
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import SideBar from "../../components/SideBar/SideBar";
import { useAccount } from "wagmi";
import axios from "axios";
import { SHOP_NFT_CONTRACT_ADDRESS } from "../../utils/contractAddress";

const MyGoodsShop: React.FC = () => {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [userNftData, setUserNftData] = useState([]);
  console.log(userNftData);

  const handleGetUserNft = useCallback(async () => {
    try {
      if (!address) return;
      setLoading(true);

      const { data } = await axios.get(
        `https://deep-index.moralis.io/api/v2/${address}/nft?chain=0x5&token_addresses=${SHOP_NFT_CONTRACT_ADDRESS}`,

        {
          headers: {
            "X-API-KEY": process.env.REACT_APP_MORALIS_API_KEY,
          },
        },
      );
      setLoading(false);
      setUserNftData(data.result.map((r: any) => r.token_id));
    } catch (error) {
      console.log(error);
    }
  }, [address]);
  console.log(address);

  useEffect(() => {
    handleGetUserNft();
  }, [handleGetUserNft]);
  return (
    <div>
      <Navigation />
      <HeaderNav />
      <div className="website-container">
        <div className="website-container-right">
          <SideBar />
        </div>
        <div className="website-container-right">
          {loading ? "loading..." : ""}
          {!userNftData.length && "noResult"}
          {userNftData.map((f, idx) => (
            <div className="website-card-container" key={idx}>
              <div className="card">
                <div className="card-top">
                  <img src={cardImg} alt="card" />
                </div>
                <div className="card-center">
                  <h3 className="title">The Holy Grail</h3>
                  <h4 className="sub-title">Pixart Motion</h4>
                </div>
                <div className="card-bottom">
                  <p>Shop Details</p>
                  <Link to={`/my-goods-shop/${f}`}>
                    <button style={{ width: "50px" }}>Get In</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyGoodsShop;
