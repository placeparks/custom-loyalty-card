import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NFT } from "@thirdweb-dev/react";
import { LOYALTY_CARD_CONTRACT_ADDRESS } from "../const/addresses";

export default async function updateLoyaltyCard(nft, loyaltyCardPoints, nftTokenId) {
  try {
    console.log("PRIVATE_KEY:", process.env.NEXT_PUBLIC_TEMPLATE_PRIVATE_KEY);
      const sdk = ThirdwebSDK.fromPrivateKey(
          process.env.NEXT_PUBLIC_TEMPLATE_PRIVATE_KEY,
          "mumbai",
          {
              clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID,
          }
      );

      console.log("SDK created");

      const loyaltyContract = await sdk.getContract(LOYALTY_CARD_CONTRACT_ADDRESS);

      const metadata = {
          ...nft.metadata,
          attributes: [
              {
                  trait_type: "points",
                  value: loyaltyCardPoints + 10
              },
          ],
      };

      if (true) {
          const updateNFT = await loyaltyContract.erc721.update(nftTokenId, metadata);
          alert("Loyalty card updated");
      } else {
          alert("Loyalty card not updated");
          return { error: "You don't have enough points to update your loyalty card." };
      }

      return { success: "Loyalty card updated!" };
  } catch (error) {
      console.error(error);
  }
}
