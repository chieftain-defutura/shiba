import React from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
import { useAccount, useContractReads } from "wagmi";
import {
  SHOP_NFT_CONTRACT_ADDRESS,
  DIGITAL_GOODS_ADDRESS,
  DOMAIN_NFT_CONTRACT_ADDRESS,
} from "../../utils/contractAddress";
import shopAbi from "../../utils/abi/shopABI.json";

const SideBar: React.FC = () => {
  const { address } = useAccount();
  const { data: balanceData } = useContractReads({
    contracts: [
      {
        address: DOMAIN_NFT_CONTRACT_ADDRESS,
        abi: shopAbi,
        functionName: "balanceOf",
        args: [address],
      },
      {
        address: DIGITAL_GOODS_ADDRESS,
        abi: shopAbi,
        functionName: "balanceOf",
        args: [address],
      },
      {
        address: SHOP_NFT_CONTRACT_ADDRESS,
        abi: shopAbi,
        functionName: "balanceOf",
        args: [address],
      },
    ],
  });

  return (
    <div>
      <div className="sidebar-container">
        <div className="box">
          <h2 className="heading">My Items</h2>
          <div className="content-cont">
            <div className="content">
              <Link to="/my-movies">
                <p className="name">My Movies</p>
                <p className="number">0</p>
              </Link>
            </div>
            <div className="content">
              <Link to="/my-music">
                <p className="name">My Music</p>
                <p className="number">0</p>
              </Link>
            </div>
            <div className="content">
              <Link to="/my-books">
                <p className="name">My Books</p>
                <p className="number">0</p>
              </Link>
            </div>
            <div className="content">
              <Link to="/my-courses">
                <p className="name">My Courses</p>
                <p className="number">0</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="box">
          <h2 className="heading">My Websites</h2>
          <div className="content-cont">
            <div className="content">
              <Link to="/my-websites">
                <p className="name">My Websites</p>
                <p className="number">0</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="box">
          <h2 className="heading">My Domains</h2>
          <div className="content-cont">
            <div className="content">
              <Link to="/my-domains">
                <p className="name">My Domains</p>
                <p className="number">{balanceData?.[0] ? balanceData[0].toString() : 0}</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="box">
          <h2 className="heading">My Shops</h2>
          <div className="content-cont">
            <div className="content">
              <Link to="/my-digital-shop">
                <p className="name">My Digital Shop</p>
                <p className="number">{balanceData?.[1] ? balanceData[1].toString() : 0}</p>
              </Link>
            </div>
            <div className="content">
              <Link to="/my-goods-shop">
                <p className="name">My Goods Shop</p>
                <p className="number">{balanceData?.[2] ? balanceData[2].toString() : 0}</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="box">
          <h2 className="heading">My Charities</h2>
          <div className="content-cont">
            <div className="content">
              <Link to="/my-charities">
                <p className="name">My Charities</p>
                <p className="number">0</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="box">
          <h2 className="heading">Delivery</h2>
          <div className="content-cont">
            <div className="content">
              <Link to="/have-to-send">
                <p className="name">Have to Send</p>
                <p className="number">0</p>
              </Link>
            </div>
            <div className="content">
              <Link to="/awaiting-delivery">
                <p className="name">Awaiting Delivery</p>
                <p className="number">0</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="select-container">
          <select>
            <option>SORT BY DATE</option>
            <option>Websites</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
