import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import { LOYALTY_CARD_CONTRACT_ADDRESS } from "../../const/addresses"

export default async function handler(req, res) {
  try {
    const { address } = JSON.parse(req.body)

    if (!process.env.NEXT_PUBLIC_TEMPLATE_PRIVATE_KEY) {
      throw new Error(
        "You're missing WALLET_PRIVATE_KEY in your .env.local file."
      )
    }

    const sdk = ThirdwebSDK.fromPrivateKey(process.env.NEXT_PUBLIC_TEMPLATE_PRIVATE_KEY, "mumbai", {
      secretKey: process.env.SECRET_KEY
    })

    console.log("SDK created")
    const loyaltyContract = await sdk.getContract(LOYALTY_CARD_CONTRACT_ADDRESS)

    const payload = {
      to: address,
      metadata: {
        name: "Loyalty Card",
        description: `This is a loyalty card for ${address}`,
        image: "https://pin.ski/45bt9wN",
        attributes: [
          {
            trait_type: "points",
            value: 0
          }
        ]
      }
    }

    console.log("Creating signature")
    const signedPayload = await loyaltyContract.erc721.signature.generate(
      payload
    )
    console.log("Signature created")

    return res.status(200).json({
      signedPayload: JSON.parse(JSON.stringify(signedPayload))
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
