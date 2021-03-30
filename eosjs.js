const { JsonRpc, Api } = require('eosjs')
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig')
const { TextDecoder, TextEncoder } = require('util')
const env = require('./.env')
const random = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min)
const fetch = require('node-fetch')
const { Resources } = require('@greymass/eosio-resources')
const contractAccount = env.contractAccount
let api
const tapos = {
  blocksBehind: 12,
  expireSeconds: 30,
  broadcast: true
}
async function doAction(name, data, account, actor,permission) {
  try {
    if (!data) data = {}
    if (!account) account = contractAccount
    if (!actor) actor = 'eospowerupio'
    if (!permission) permission = 'workers'
    console.log("Do Action:", name, data)
    const authorization = [{actor:env.workerAccount,permission:env.workerPermission},{ actor, permission }]
    const {api} = init()

    const signed = await api.transact({
      // "delay_sec": 0,
      actions: [{ account, name, data, authorization }]
    }, {
      blocksBehind: 12,
      expireSeconds: 30,
      broadcast: false
    })
    let results = []
    for (endpoint of new Set(env.endpoints)) {
      const result = await api.pushSignedTransaction(signed).catch(err => {})
      let txid = null
      if(result?.transaction_id) txid = result?.transaction_id
      results.push({endpoint,result:txid})
    }
    console.log(results);

    // const txid = result.transaction_id
    // console.log(`https://bloks.io/transaction/` + txid)
    // console.log(txid)
    return results
  } catch (error) {
    console.error('DoAction Error:',error.toString())
    throw(error)
  }
}

function pickEndpoint(endpoints){
  return endpoints[random(0,endpoints.length - 1)]
}

function init(keys, apiurl) {
  if (!keys) keys = env.keys
  const signatureProvider = new JsSignatureProvider(keys)
  if (!apiurl) apiurl = pickEndpoint(env.endpoints)
  console.log('API:',apiurl)
  const resources = new Resources({ fetch, url:apiurl})
  var rpc = new JsonRpc(apiurl, { fetch })
  api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() })
  return { api, rpc,tapos,resources,doAction }
}

module.exports = init 