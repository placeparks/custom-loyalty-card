import { ThirdwebProvider, paperWallet, smartWallet, localWallet,  metamaskWallet} from "@thirdweb-dev/react"
import "../styles/globals.css"
import 'bootstrap/dist/css/bootstrap.css'

const activeChain = "mumbai"

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
    clientId= {process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
      supportedWallets={[
        smartWallet({
          factoryAddress: "0x44106B672501fEfE2151288F3e0be9Fbc08126B3",
          gasless: true,
          personalWallets: [
            paperWallet({
              paperClientId: "ebe107ca-1753-4388-bc12-d214c7a068af",
            }),
          ]
        })
      ]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  )
}

export default MyApp
