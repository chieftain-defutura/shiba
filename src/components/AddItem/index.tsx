import React, { useState } from "react";
import { usePrepareContractWrite, useContractWrite, useAccount, useSigner } from "wagmi";
import { useParams } from "react-router-dom";
import { DIGITAL_GOODS_ADDRESS } from "../../utils/contractAddress";
import digitalShopABI from "../../utils/abi/digitalShopABI.json";
import { PAW_TOKEN_ADDRESS } from "../../utils/contractAddress";
import axios from "axios";
import { ethers } from "ethers";
import { useTransactionModal } from "../../context/TransactionContext";

const AddItem = () => {
  const { id } = useParams();
  const { data } = useSigner();
  const { address } = useAccount();
  const { setTransaction } = useTransactionModal();
  const [newItem, setNewItem] = useState({
    preview: "",
    fullProduct: "",
    ItemName: "",
    categorys: "",
    details: "",
    description: "",
    price: "",
    currency: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddItem = async () => {
    if (!address || !data) return;
    try {
      setTransaction({ loading: true, status: "pending" });
      const resData = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: {
          preview: newItem.preview,
          itemName: newItem.ItemName,
          details: newItem.details,
          description: newItem.description,
        },
        headers: {
          pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
          pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
          "Content-Type": "application/json",
        },
      });
      const JsonHash = resData.data.IpfsHash;
      const dataHash = `https://gateway.pinata.cloud/ipfs/${JsonHash}`;
      console.log(dataHash);
      const contract = new ethers.Contract(DIGITAL_GOODS_ADDRESS, digitalShopABI, data);
      const tx = await contract.addItem(
        id,
        newItem.preview,
        newItem.fullProduct,
        newItem.price,
        PAW_TOKEN_ADDRESS,
        dataHash
      );
      await tx.wait();
      console.log("added");
      setTransaction({ loading: true, status: "success" });
    } catch (error) {
      console.log("Error sending File to IPFS:");
      console.log(error);
      setTransaction({ loading: true, status: "error" });
    }
  };

  return (
    <div className="photo-sub-menu-container sub-menu-container">
      <p className="title">Photos</p>
      <div className="content">
        <div className="content-left">
          <p>preview:</p>
          <p>Full Product:</p>
          <p>Item Name:</p>
          <p>Category:</p>
          <p>Details:</p>
          <p>Description:</p>
          <p>Price:</p>
          <p>Currency:</p>
        </div>
        <div className="content-right">
          <input name="preview" type="url" placeholder="Metadata Link" onChange={handleChange} />
          <input
            name="fullProduct"
            type="url"
            placeholder="Metadata Link"
            onChange={handleChange}
          />
          <input name="ItemName" placeholder="Item" onChange={handleChange} />
          <select name="categorys" onChange={handleChange}>
            <option value="" label="select a category">
              Select a Category
            </option>
            <option value="movies" label="movies">
              Movies
            </option>
            <option value="courses" label="courses">
              Courses
            </option>
            <option value="books" label="books">
              Books
            </option>
            <option value="music" label="music">
              Music
            </option>
          </select>
          <input name="details" placeholder="Details" onChange={handleChange} />
          <textarea rows={5} name="description" onChange={handleChange}></textarea>
          <input name="price" placeholder="0.00" onChange={handleChange} />
          <select name="currency" onChange={handleChange}>
            <option value="" label="Select a Category">
              Select a Category
            </option>
            <option value="shi" label="shi">
              SHI
            </option>
            <option value="leash" label="leash">
              LEASH
            </option>
            <option value="shib" label="shib">
              SHIB
            </option>
            <option value="bone" label="bone">
              BONE
            </option>
            <option value={PAW_TOKEN_ADDRESS} label="pan">
              PAW
            </option>
          </select>
          <div className="btn-cont">
            <button onClick={handleAddItem}>Submit Listing and Put on Sale</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
