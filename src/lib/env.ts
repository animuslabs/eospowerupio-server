import { readJSONSync } from "fs-extra"
import { Name, PrivateKey } from "@wharfkit/antelope"
require("dotenv").config()


type chains = "eos" | "kylin" | "jungle"
interface eosioConfig {
  chain:string
  keys:PrivateKey[]
  endpoints:URL[]
  workerAccount:Name
  workerPermission:Name
  contractAccount:Name
  nftContract?:Name
  telegramKey?:string
  discordKey?:string
}
type eosioConfigs = { [k in chains]?:eosioConfig }
interface envType {
  default:chains
  chain:eosioConfigs
}

const readEnv:envType = readJSONSync("../.env.json")
// console.log('readENV', readEnv);
let useChain = process.env.CHAIN
if (useChain) useChain = useChain.toLowerCase()
if (!useChain) useChain = readEnv.default
const untyped = readEnv.chain[useChain]
const typed:eosioConfig = {
  chain: useChain,
  contractAccount: Name.from(untyped.contractAccount),
  endpoints: untyped.endpoints.map(el => new URL(el)),
  keys: untyped.keys.map(el => PrivateKey.from(el)),
  workerAccount: Name.from(untyped.workerAccount),
  workerPermission: Name.from(untyped.workerPermission),
  telegramKey: untyped?.telegramKey,
  discordKey: untyped?.discordKey,
  nftContract: untyped?.nftContract
}
const config:eosioConfig = typed
export default config
