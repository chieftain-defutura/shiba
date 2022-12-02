import React, { useMemo, useState } from "react"
import { BsArrowLeftCircle } from "react-icons/bs"
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi"
import {
  DIGITAL_GOODS_ADDRESS,
  RESIDUAL_ADDRESS,
} from "../../../utils/contractAddress";
import residualABI from "../../../utils/abi/resideuABI.json";
import { useParams } from "react-router-dom";
import { useTransactionModal } from "../../../context/TransactionContext";

interface IResidualProps {
  setClickCard: any
}

const initialValues = {
  totalPercent: "0",
  filledShare: "0",
  shareHolders: [],
}

const Residual: React.FC<IResidualProps> = ({ setClickCard }) => {
  const { id } = useParams();
  const { setTransaction } = useTransactionModal();
  const [totalShare, setTotalShare] = useState("");
  const [shareAddress, setShareAddress] = useState("");
  const [sharePercent, setSharePercent] = useState("");
  const [removeUserIndex, setRemoveUserIndex] = useState("");

  const { data } = useContractRead({
    address: RESIDUAL_ADDRESS,
    abi: residualABI,
    functionName: "getBenificiary",
    args: [DIGITAL_GOODS_ADDRESS, id],
  })
  const { config } = usePrepareContractWrite({
    address: RESIDUAL_ADDRESS,
    abi: residualABI,
    functionName: "setPercent",
    args: [DIGITAL_GOODS_ADDRESS, id, totalShare],
  })
  const { config: addConfig } = usePrepareContractWrite({
    address: RESIDUAL_ADDRESS,
    abi: residualABI,
    functionName: "addBenificiary",
    args: [DIGITAL_GOODS_ADDRESS, id, shareAddress, sharePercent],
  })
  const { config: removeConfig } = usePrepareContractWrite({
    address: RESIDUAL_ADDRESS,
    abi: residualABI,
    functionName: "removeBenificiary",
    args: [DIGITAL_GOODS_ADDRESS, id, removeUserIndex, removeUserIndex],
  })

  const { writeAsync: setPercentAsync } = useContractWrite(config)
  const { writeAsync: addUserAsync } = useContractWrite(addConfig)
  const { writeAsync: removeUserAsync } = useContractWrite(removeConfig)

  const formattedData = useMemo(() => {
    if (!data) return initialValues

    const newData = data as any

    const shareHoldersList: { address: string; sharePercent: any }[] = []

    newData[2].forEach((address: string, i: number) => {
      newData[3].forEach((sharePercent: any, j: number) => {
        if (i === j) {
          shareHoldersList.push({
            address,
            sharePercent: sharePercent.toString(),
          })
        }
      })
    })

    return {
      totalPercent: newData[0].toString(),
      filledShare: newData[1].toString(),
      shareHolders: shareHoldersList.filter((f) => parseInt(f.address) !== 0),
    };
  }, [data]);

  const percent =
    100 - Number(formattedData?.filledShare) >= Number(sharePercent);

  const handleSetPercent = async () => {
    try {
      setTransaction({ loading: true, status: "pending" });
      const tx = await setPercentAsync?.();
      if (!tx) throw new Error("something went wrong");
      await tx.wait();
      setTransaction({ loading: true, status: "success" });
    } catch (error) {
      setTransaction({ loading: true, status: "error" });
    }
  };

  const handleAddUser = async () => {
    try {
      setTransaction({ loading: true, status: "pending" });
      const tx = await addUserAsync?.();
      if (!tx) throw new Error("something went wrong");
      await tx.wait();
      setTransaction({ loading: true, status: "success" });
    } catch (error) {
      setTransaction({ loading: true, status: "error" });
    }
  };

  const handleRemoveUser = async () => {
    try {
      setTransaction({ loading: true, status: "pending" });

      const tx = await removeUserAsync?.();
      if (!tx) throw new Error("something went wrong");
      await tx.wait();
      setTransaction({ loading: true, status: "success" });
    } catch (error) {
      setTransaction({ loading: true, status: "error" });
    }
  };

  return (
    <div className="residual-container">
      <BsArrowLeftCircle
        className="arrow-icon"
        onClick={() => setClickCard(null)}
      />
      <h2 className="title">Residual</h2>

      <div className="residual-container-sub-menu-container sub-menu-container">
        <div className="content" style={{ flexDirection: "column" }}>
          <div className="content-block">
            <h4>Set Residual %</h4>
            {formattedData.totalPercent === "0" ? (
              <>
                <input
                  placeholder="Max 10"
                  value={totalShare}
                  onChange={({ target }) => setTotalShare(target.value)}
                />
                <button
                  disabled={!setPercentAsync}
                  style={{ marginTop: "10px" }}
                  onClick={() => handleSetPercent()}
                >
                  Set Residual %
                </button>
              </>
            ) : (
              <input
                placeholder="Max 10"
                value={formattedData.totalPercent}
                disabled
                onChange={({ target }) => setTotalShare(target.value)}
              />
            )}
          </div>
          <div className="content-block">
            <h4>Residual Getters List and their Shares</h4>
            <select>
              {formattedData?.shareHolders.map((list, index) => (
                <option key={index.toString()}>
                  {`${list.address.slice(0, 6)}...${list.address.slice(
                    list.address.length - 6,
                  )}`}
                  &nbsp;
                  {list.sharePercent} Shares
                </option>
              ))}
            </select>
          </div>
          <div className="content-block">
            <div>
              <h4>Add Residual Getter</h4>
              <div className="add-getter-cont">
                <input
                  className="address"
                  placeholder="Address"
                  value={shareAddress}
                  onChange={({ target }) => setShareAddress(target.value)}
                />
                <input
                  className="share"
                  placeholder="Share"
                  value={sharePercent}
                  onChange={({ target }) => setSharePercent(target.value)}
                />
              </div>
              <p>Available Shares {100 - Number(formattedData?.filledShare)}</p>
              {!percent && (
                <div style={{ color: "red" }}>insufficient share</div>
              )}
            </div>
            <button
              disabled={!addUserAsync || !percent}
              style={{ marginTop: "10px" }}
              onClick={() => handleAddUser()}
            >
              Add user
            </button>
          </div>
          <div className="content-block">
            <h4>Remove Residual Getter</h4>
            <select
              value={removeUserIndex}
              onChange={({ target }) => setRemoveUserIndex(target.value)}
            >
              <option value="">Select Address to Remove</option>
              {formattedData?.shareHolders.map((list, index) => (
                <option key={index.toString()} value={index}>
                  {`${list.address.slice(0, 10)}...${list.address.slice(
                    list.address.length - 10,
                  )}`}
                </option>
              ))}
            </select>
          </div>
          <button
            disabled={!removeUserAsync}
            style={{ marginTop: "10px" }}
            onClick={() => handleRemoveUser()}
          >
            Remove user
          </button>
        </div>
      </div>
    </div>
  )
}

export default Residual
