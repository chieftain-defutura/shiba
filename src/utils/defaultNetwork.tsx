import { useNetwork } from "wagmi";

function DefaultNetwork() {
  const { chain, chains } = useNetwork();

  return (
    <>
      {chain && <div>Connected to {chain.name}</div>}
      {chains && (
        <div>Available chains: {chains.map((chain) => chain.name)}</div>
      )}
    </>
  );
}

export default DefaultNetwork;
