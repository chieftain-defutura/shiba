import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSigner, useAccount } from "wagmi";
import { Formik, Field, Form } from "formik";
import { ethers } from "ethers";
import axios from "axios";
import { DIGITAL_GOODS_ADDRESS } from "../../utils/contractAddress";
import digitalShopABI from "../../utils/abi/digitalShopABI.json";
import { useTransactionModal } from "../../context/TransactionContext";

const AppearanceSetting = () => {
  const { id } = useParams();
  const { data } = useSigner();
  const { address } = useAccount();
  const [slide, setSlide] = useState(1);
  const { setTransaction } = useTransactionModal();

  // const handleSlidePrev = () => {
  //   if (slide > 1) {
  //     setSlide(slide - 1);
  //   }
  // };

  const handleSlideNext = () => {
    setSlide(slide + 1);
  };

  const handleAppearanceSetting = async (values: any) => {
    if (!address || !data) return;
    try {
      setTransaction({ loading: true, status: "pending" });
      const resData = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: values,
        headers: {
          pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
          pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET,
          "Content-Type": "application/json",
        },
      });
      const JsonHash = resData.data.IpfsHash;
      const dataHash = `https://gateway.pinata.cloud/ipfs/${JsonHash}`;
      console.log(dataHash);
      const contract = new ethers.Contract(
        DIGITAL_GOODS_ADDRESS,
        digitalShopABI,
        data
      );
      const tx = await contract.setBaseURI(id, dataHash);
      await tx.wait();
      console.log("updated");
      setTransaction({ loading: true, status: "success" });
    } catch (error) {
      console.log("Error sending File to IPFS:");
      console.log(error);
      setTransaction({ loading: true, status: "error" });
    }
  };

  return (
    <Formik
      initialValues={{
        logo: "",
        mainPhoto: "",
        videoOne: "",
        videoTwo: "",
        videoThree: "",
        description: "",
        contacts: "",
        website: "",
        twitter: "",
        instagram: "",
      }}
      onSubmit={handleAppearanceSetting}
    >
      {() => (
        <Form>
          {slide === 1 && (
            <div className="appearance-settings-sub-menu-container sub-menu-container">
              <div className="content">
                <div className="content-left">
                  <p>Logo:</p>
                  <p>Main Photo / Video:</p>
                  <p>Photo / Video1:</p>
                  <p>Photo / Video2:</p>
                  <p>Photo / Video3:</p>
                </div>
                <div className="content-right">
                  <Field
                    name="logo"
                    type="url"
                    placeholder="Metadata Link 350*350"
                  />
                  <Field
                    name="mainPhoto"
                    type="url"
                    placeholder="Metadata Link 600*400"
                  />
                  <Field
                    name="videoOne"
                    type="url"
                    placeholder="Metadata Link"
                  />
                  <Field
                    type="url"
                    name="videoTwo"
                    placeholder="Metadata Link"
                  />
                  <Field
                    type="url"
                    name="videoThree"
                    placeholder="Metadata Link"
                  />
                </div>
              </div>
              <div className="btn-cont">
                <button onClick={handleSlideNext}>Next</button>
              </div>
            </div>
          )}
          {slide === 2 && (
            <div className="brief-description-sub-menu-container sub-menu-container">
              <div className="content">
                <div className="content-left">
                  <p>Brief Description:</p>
                  <p>Contracts:</p>
                </div>
                <div className="content-right">
                  <Field as="textarea" rows={13} name="description"></Field>
                  <Field name="contacts" type="number" placeholder="contact" />
                </div>
              </div>
              <div className="btn-cont">
                <button onClick={handleSlideNext}>Next</button>
              </div>
            </div>
          )}
          {slide === 3 && (
            <div className="social-links-sub-menu-container sub-menu-container">
              <div className="content">
                <div className="content-left">
                  <p>Website:</p>
                  <p>Twitter:</p>
                  <p>Instagram:</p>
                </div>
                <div className="content-right">
                  <Field name="website" type="url" placeholder="Link" />
                  <Field name="twitter" type="url" placeholder="Link" />
                  <Field name="instagram" type="url" placeholder="Link" />
                </div>
              </div>
              <div className="btn-cont">
                <button>Submit</button>
              </div>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default AppearanceSetting;
