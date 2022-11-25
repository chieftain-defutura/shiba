import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import Navigation from "../../components/Navigation/Navigation";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  DIGITAL_GOOD_SHOP,
  PHYSICAL_GOODS_SHOP,
  WEBSITE,
  CHARITY,
  UNATTACHED_DOMAIN_NAME,
  NFT_ART,
} from "../../constants/mintPageConstatnts";
import "./MintNftPage.css";
import FooterBottom from "../../components/FooterBottom/FooterBottom";
import {
  useContractReads,
  usePrepareContractWrite,
  useContractWrite,
  erc20ABI,
  useAccount,
  useProvider,
  useNetwork,
} from "wagmi";
import {
  DOMAIN_NFT_CONTRACT_ADDRESS,
  PAW_TOKEN_ADDRESS,
  SHIB_TOKEN_ADDRESS,
  LEASH_TOKEN_ADDRESS,
  SHOP_NFT_CONTRACT_ADDRESS,
} from "../../utils/contractAddress";
import domainABI from "../../utils/abi/domainABI.json";
import shopABI from "../../utils/abi/shopABI.json";
import { useTransactionModal } from "../../context/TransactionContext";

interface IContractData {
  title: string;
  contractAddress: string;
  tokenAddress?: string;
  allowance?: number;
}

const ContractData = [
  {
    title: UNATTACHED_DOMAIN_NAME,
    contractAddress: DOMAIN_NFT_CONTRACT_ADDRESS,
    // tokenAddress: PAW_TOKEN_ADDRESS,
    // allowance: 0,
  },
  {
    title: DIGITAL_GOOD_SHOP,
    contractAddress: DOMAIN_NFT_CONTRACT_ADDRESS,
    tokenAddress: SHIB_TOKEN_ADDRESS,
    allowance: 0,
  },
  {
    title: PHYSICAL_GOODS_SHOP,
    contractAddress: SHOP_NFT_CONTRACT_ADDRESS,
    // tokenAddress: LEASH_TOKEN_ADDRESS,
    // allowance: 0,
  },
  {
    title: WEBSITE,
    contractAddress: DOMAIN_NFT_CONTRACT_ADDRESS,
  },
  {
    title: CHARITY,
    contractAddress: DOMAIN_NFT_CONTRACT_ADDRESS,
  },
  {
    title: NFT_ART,
    contractAddress: DOMAIN_NFT_CONTRACT_ADDRESS,
  },
];

const GetTld = {
  address: DOMAIN_NFT_CONTRACT_ADDRESS,
  abi: domainABI,
};
const pawAllownaceData = {
  address: PAW_TOKEN_ADDRESS,
  abi: erc20ABI,
};
const shibAllownaceData = {
  address: SHIB_TOKEN_ADDRESS,
  abi: erc20ABI,
};
const leashAllownaceData = {
  address: LEASH_TOKEN_ADDRESS,
  abi: erc20ABI,
};

const MintNftPage: React.FC = () => {
  const { setTransaction } = useTransactionModal();
  const { address } = useAccount();
  const provider = useProvider({ chainId: 5 });
  const [isDropDownClick, setIsDropDownClick] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedNftType, setSelectedNftType] = useState<any>();
  const [selected, setSelected] = useState("");
  const [isInValid, setIsInvalid] = useState(false);
  const [NftContractData, setIsNftContractData] =
    useState<IContractData[]>(ContractData);
  const [inputData, setInputData] = useState("");
  const [mintData, setMintData] = useState([]);
  const [selectDomain, setSelectDomain] = useState("");

  const { chain } = useNetwork();

  const { data } = useContractReads({
    contracts: [
      {
        ...GetTld,
        functionName: "getTld",
      },
      {
        ...pawAllownaceData,
        functionName: "allowance",
        args: [address as any, DOMAIN_NFT_CONTRACT_ADDRESS],
      },
      {
        ...shibAllownaceData,
        functionName: "allowance",
        args: [address as any, DOMAIN_NFT_CONTRACT_ADDRESS],
      },
      {
        ...leashAllownaceData,
        functionName: "allowance",
        args: [address as any, DOMAIN_NFT_CONTRACT_ADDRESS],
      },
    ],
  });

  const { data: domainNamesData } = useContractReads({
    contracts: mintData.map((d) => ({
      ...GetTld,
      functionName: "getDomainName",
      args: [d],
    })),
  });
  const alteredDomainNamesData = (domainNamesData as string[]) ?? [];

  const domainData: string[] = (data?.[0] as string[]) ?? [];

  const { config } = usePrepareContractWrite({
    address: DOMAIN_NFT_CONTRACT_ADDRESS,
    abi: domainABI,
    functionName: "mintNFT",
    args: [inputData.concat(selected)],
  });
  const domainContract = useContractWrite(config);

  const { config: shopMints } = usePrepareContractWrite({
    address: SHOP_NFT_CONTRACT_ADDRESS,
    abi: shopABI,
    functionName: "mintNFT",
    args: [selectDomain, true],
  });
  const shopContract = useContractWrite(shopMints);

  const { config: tokenApprove } = usePrepareContractWrite({
    address: selectedNftType?.tokenAddress,
    abi: erc20ABI,
    functionName: "approve",
    args: [DOMAIN_NFT_CONTRACT_ADDRESS, ethers.constants.MaxUint256],
  });

  const tokenContract = useContractWrite(tokenApprove);

  useEffect(() => {
    if (domainData.length) setSelected(domainData[0]);
  }, [domainData]);

  const handleGetUserNft = useCallback(async () => {
    if (!address || !provider) return;
    const { data } = await axios.get(
      `https://deep-index.moralis.io/api/v2/${address}/nft?chain=0x5&token_addresses=${DOMAIN_NFT_CONTRACT_ADDRESS}`,
      {
        headers: {
          "X-API-KEY":
            "CayH0royiMVkNnueNQNqZuDdMzTXcGLLsSfCfcLgavOYctREcddcQfKNxgKQzOOj",
        },
      }
    );

    setMintData(data.result.map((r: any) => r.token_id));
  }, [address, provider]);

  useEffect(() => {
    handleGetUserNft();
  }, [handleGetUserNft]);

  useEffect(() => {
    if (!data) return;
    const NewNftContractData = [...NftContractData];
    NewNftContractData[0].allowance = Number(data[1].toString());
    NewNftContractData[1].allowance = Number(data[2].toString());
    // NewNftContractData[2].allowance = Number(data[3].toString());
    setIsNftContractData(NewNftContractData);
  }, [data]);

  useMemo(() => {
    if (!selectedOption) return;

    const contractdata = NftContractData.find(
      (f) => f.title === selectedOption
    );
    setSelectedNftType(contractdata);
  }, [selectedOption]);

  const canShowCreateButton = useMemo(() => {
    if (!selectedNftType) {
      setIsInvalid(true);
      return true;
    }
    if (!selectedNftType.hasOwnProperty("tokenAddress")) {
      setIsInvalid(false);
      return true;
    }
    setIsInvalid(false);

    if (selectedNftType?.allowance === 0) return false;
    return true;
  }, [selectedNftType]);

  const errorMessage = useMemo(() => {
    if (!selectedNftType) return;

    if (selectedNftType.title === UNATTACHED_DOMAIN_NAME) {
      if (!inputData) return "error please enter domain name";

      return undefined;
    }

    if (!selectDomain) return "error please select a domain";

    return undefined;
  }, [selectedNftType, selectDomain, inputData]);

  const handleApproveToken = async () => {
    try {
      setTransaction({ loading: true, status: "pending" });
      const data = await tokenContract.writeAsync?.();
      await data?.wait();
      setTransaction({ loading: true, status: "success" });
    } catch (error) {
      console.log(error);
      setTransaction({ loading: true, status: "error" });
    }
  };

  const mintButton = async () => {
    try {
      console.log(selectedNftType);
      if (!selectedNftType) return;

      if (selectedNftType?.title === UNATTACHED_DOMAIN_NAME) {
        setTransaction({ loading: true, status: "pending" });
        const data = await domainContract.writeAsync?.();
        await data?.wait();
        setTransaction({ loading: true, status: "success" });
      }

      if (selectedNftType?.title === PHYSICAL_GOODS_SHOP) {
        setTransaction({ loading: true, status: "pending" });
        const data = await shopContract.writeAsync?.();
        await data?.wait();
        setTransaction({ loading: true, status: "success" });
      }
    } catch (error) {
      console.log(error);
      setTransaction({ loading: true, status: "error" });
    }
  };

  return (
    <div>
      <Navigation />
      <HeaderNav />
      <div className="mint-nft-container">
        <div className="mint-nft-container-left">
          <div className="box">
            <h2 className="heading">My Items</h2>
            <div className="content-cont">
              <div className="content">
                <p className="name">My Movies</p>
                <p className="number">2</p>
              </div>
              <div className="content">
                <p className="name">My Music</p>
                <p className="number">5</p>
              </div>
              <div className="content">
                <p className="name">My Books</p>
                <p className="number">4</p>
              </div>
              <div className="content">
                <p className="name">My Courses</p>
                <p className="number">1</p>
              </div>
            </div>
          </div>
          <div className="box">
            <h2 className="heading">My Websites</h2>
            <div className="content-cont">
              <div className="content">
                <p className="name">My Websites</p>
                <p className="number">2</p>
              </div>
            </div>
          </div>
          <div className="box">
            <h2 className="heading">My Domains</h2>
            <div className="content-cont">
              <div className="content">
                <p className="name">My Domains</p>
                <p className="number">5</p>
              </div>
            </div>
          </div>
          <div className="box">
            <h2 className="heading">My Shops</h2>
            <div className="content-cont">
              <div className="content">
                <p className="name">My Digital Shop</p>
                <p className="number">1</p>
              </div>
              <div className="content">
                <p className="name">My Goods Shop</p>
                <p className="number"></p>
              </div>
            </div>
          </div>
          <div className="box">
            <h2 className="heading">My Charities</h2>
            <div className="content-cont">
              <div className="content">
                <p className="name">My Charities</p>
                <p className="number">1</p>
              </div>
            </div>
          </div>
          <div className="box">
            <h2 className="heading">Delivery</h2>
            <div className="content-cont">
              <div className="content">
                <p className="name">Have to Send</p>
                <p className="number">4</p>
              </div>
              <div className="content">
                <p className="name">Awaiting Delivery</p>
                <p className="number">2</p>
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
        <div className="mint-nft-container-right">
          <h2 className="heading">Mint NFT</h2>
          <div className="box-1">
            <div className="box-left">
              <p className="title">Please Select NFT token type:</p>
              <div className="content-container">
                <div className="content-title">
                  <p className="title">Total LEASH cost:</p>
                  <p className="title">Total SHIB cost:</p>
                </div>
                <div className="content-input">
                  <input />
                  <input />
                </div>
              </div>
            </div>
            <div className="box-right">
              <div
                className="custom-drop-down"
                onClick={() => setIsDropDownClick(!isDropDownClick)}
              >
                {selectedOption}
                <MdKeyboardArrowDown className="arrow-icon" />
              </div>
              <div
                className={
                  isDropDownClick
                    ? "drop-down-content active"
                    : "drop-down-content"
                }
              >
                <p
                  onClick={() => {
                    setSelectedOption(DIGITAL_GOOD_SHOP);
                    setIsDropDownClick(false);
                  }}
                >
                  Digital Goods Shop
                </p>
                <p
                  onClick={() => {
                    setSelectedOption(PHYSICAL_GOODS_SHOP);
                    setIsDropDownClick(false);
                  }}
                >
                  Physical Goods Shop
                </p>
                <p
                  onClick={() => {
                    setSelectedOption(WEBSITE);
                    setIsDropDownClick(false);
                  }}
                >
                  Website
                </p>
                <p
                  onClick={() => {
                    setSelectedOption(CHARITY);
                    setIsDropDownClick(false);
                  }}
                >
                  Charity
                </p>
                <p
                  onClick={() => {
                    setSelectedOption(NFT_ART);
                    setIsDropDownClick(false);
                  }}
                >
                  ART NFT
                </p>
                <p
                  onClick={() => {
                    setSelectedOption(UNATTACHED_DOMAIN_NAME);
                    setIsDropDownClick(false);
                  }}
                >
                  Unattached Domain Name
                </p>
              </div>
            </div>
          </div>
          <div className="box-2">
            <div className="box-left">
              <p className="title">Connect to:</p>
              <div className="content-container">
                <div className="content-title">
                  <div className="left">
                    <div className="circle active"></div>
                    <p className="title">New Domain Name:</p>
                  </div>
                  <div className="left">
                    <div className="circle"></div>
                    <p className="title">Existing Domain Name:</p>
                  </div>
                </div>
                <div className="content-input">
                  <div className="right">
                    <input
                      onChange={(e) => setInputData(e.target.value)}
                      placeholder="shoesboutique"
                    />
                    <select
                      className="custom-select-box"
                      onChange={(e) => setSelected(e.target.value)}
                    >
                      {domainData.map((f, index) => {
                        return (
                          <option key={index} value={f}>
                            {f}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="right-2">
                    <select
                      className="custom-select-box"
                      onChange={(e) => setSelectDomain(e.target.value)}
                    >
                      <option value="">please select</option>

                      {alteredDomainNamesData?.map((f, index) => {
                        return (
                          <>
                            <option key={index} value={f}>
                              {f}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="box-3">
            <div className="box-left">
              <div className="content">
                <p className="title">Total PAW cost:</p>
                <input />
              </div>
            </div>

            <div className="box-right">
              {errorMessage ? <div>{errorMessage}</div> : ""}

              {!canShowCreateButton ? (
                <button onClick={() => handleApproveToken()}>Approve</button>
              ) : (
                <button
                  onClick={() => {
                    mintButton();
                  }}
                  disabled={
                    isInValid ||
                    !!errorMessage ||
                    domainContract.isLoading ||
                    shopContract.isLoading
                  }
                >
                  Create
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <FooterBottom />
    </div>
  );
};

export default MintNftPage;
