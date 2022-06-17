import { useWeb3Contract } from "react-moralis";
import { Modal, Input, useNotification } from "web3uikit";
import nftMarketplaceAbi from "../data/contractsData/NftMarketplace.json";
import { ethers } from "ethers";

export default function UpdateListingModal({
  nftAddress,
  tokenId,
  isVisible,
  marketplaceAddress,
  onClose,
}) {
  const dispatch = useNotification();

  const [priceToUpdateListingWith, setPriceToUpdateListingWith] = useState(0);

  const handleUpdateListingSuccess = () => {
    dispatch({
      type: "success",
      message: "Listing updated successfully",
      title: "Listing updated - please refresh (and move blocks)",
      position: "topR",
    });
    onClose && onClose();
    setPriceToUpdateListingWith("0");
  };

  const { runContractFunction: updateListing } = useWeb3Contract({
    abi: nftMarketplaceAbi,
    contractAddress: marketplaceAddress,
    functionName: "updateListing",
    params: {
      nftAddress: nftAddress,
      tokenId: tokenId,
      newPrice: ethers.utils.parseEther(priceToUpdateListingWith),
    },
  });

  return (
    <Modal
      isVisible={isVisible}
      onCancel={onClose}
      onCloseButtonPressed={onClose}
      onOk={() => {
        updateListing({
          onError: (error) => {
            console.log(error);
          },
          onSuccess: () => handleUpdateListingSuccess(),
        });
      }}
    >
      <Input
        label="Update listing price in L1 Currency (Eth)"
        name="New listing price"
        type="number"
        onChange={(event) => {
          setPriceToUpdateListingWith(event.target.value);
        }}
      />
    </Modal>
  );
}
