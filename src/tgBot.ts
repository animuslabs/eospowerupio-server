import { Name } from "@wharfkit/antelope"
import { accountExists, sleep, checkQuota, freeDailyQuota } from "./lib/utils"
import { Telegraf, Markup, Context } from "telegraf"
import { readFileSync } from "fs-extra"
import db from "./lib/db"
import env from "./lib/env"

import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"
import { freePowerup, FreePowerupResult } from "./lib/serverActions"
import ms from "ms"
const token = env.telegramKey
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo("en-US")

if (token === undefined) {
  throw new Error("telegramKey Missing!")
}

const bot = new Telegraf(token)

export default async function init(...inputs:any) {
  try {
    bot.use(Telegraf.log())


    bot.command("start", async(ctx:Context) => {
      registerUser(ctx)
      await ctx.replyWithPhoto({ source: readFileSync("../images/powerupBanner.jpg") }, { caption: "Welcome to eospowerup.io Bot, powered by Boid and Eden on EOS." })
      await showMainMenu(ctx)
    }).catch(err => console.error(err.toString()))

    // bot.command('test', async (ctx: Context) => {
    //   registerUser(ctx)
    // }).catch(err => console.error(err.toString()))

    bot.hears("Free PowerUp", (ctx) => handleFreePowerUp(ctx)).catch(err => console.error(err.toString()))

    bot.launch()
    process.once("SIGINT", () => bot.stop("SIGINT"))
    process.once("SIGTERM", () => bot.stop("SIGTERM"))
  } catch (error) {
    console.error(error.toString())
  }
}
async function handleFreePowerUp(ctx:Context) {
  if (!(await checkUserQuota(ctx))) return
  await ctx.reply("Enter the name of the EOS account to PowerUp")
  let listener = bot.hears(/[sS]*/, async ctx => {
    try {
      if (!(await checkUserQuota(ctx))) return
      await triggerPowerUp(ctx, env.contractAccount.toString(), ctx.message.text)
      // bot.hears('Free PowerUp', (ctx) => handleFreePowerUp(ctx)).catch(err => console.error(err.toString()))
      showMainMenu(ctx)
      // listener.stop()
    } catch (error) {
      console.error(error)
    }
  })
}
async function registerUser(ctx:Context):Promise<string> {
  try {
    "Checking User Registration..."
    console.log(ctx.message.from.id)
    const from = ctx.message.from
    const result = await db.user.upsert({
      where: { telegramId: from.id },
      create: { telegramHandle: from.username, telegramId: from.id },
      update: {}
    })
    console.log("User Registered", result)
    return result.id
  } catch (error) {
    console.log(error.toString())
    ctx.reply("Error: " + error.toString())
    return null
  }
}
async function checkUserQuota(ctx:Context):Promise<boolean> {
  const userid = await registerUser(ctx)
  const tgQuota = await checkQuota(userid)
  if (tgQuota.error) {
    await ctx.reply(tgQuota.error)
    showMainMenu(ctx)
    return false
  } else if (tgQuota.nextPowerup) {
    await ctx.replyWithHTML(`
    <strong>Free PowerUp Error:</strong>
    ❌ Free PowerUp Quota reached for this account.
    ⏲️ Next free PowerUp available:
    ${timeAgo.format(new Date(tgQuota.nextPowerup))}
    `)
    await displayAd(ctx)
    showMainMenu(ctx)
    return false
  } else {
    ctx.reply(`You have ${tgQuota.quotaAvailable} of ${freeDailyQuota} free PowerUps available today.`)
    return true
  }
}

async function showMainMenu(ctx:Context) {
  await ctx.reply("Choose an action below...", Markup.keyboard(["Free PowerUp"]).resize().oneTime())
}

async function triggerPowerUp(ctx:Context, payer:string, name:string) {
  displayAd(ctx)
  const statusMsg = await ctx.reply("Validating Account...")
  name = name.trim().toLowerCase()
  const valid = await accountExists(name)
  if (!valid) return bot.telegram.editMessageText(ctx.chat.id, statusMsg.message_id, null, name + " is not a valid EOS Account")

  console.log(valid)
  let dots:string[] = []
  let powerupResult:FreePowerupResult
  if (payer == env.contractAccount.toString()) {
    freePowerup(name).then(el => {
      powerupResult = el
    }).catch(error => {
      powerupResult = error
    })
  }
  while (!powerupResult) { // eslint-disable-line no-unmodified-loop-condition
    await sleep(500)
    dots.push("⚡")
    await bot.telegram.editMessageText(ctx.chat.id, statusMsg.message_id, null, "Powering Up" + dots.join(""))
    if (dots.length == 5) dots = []
  }
  // await bot.telegram.deleteMessage(ctx.chat.id, statusMsg.message_id).catch(err => console.error(err.toString()))
  if (!powerupResult.status || powerupResult.status == "error") {
    ctx.replyWithHTML(`
    <strong>${name} Free PowerUp Error:</strong>
    ❌ ${JSON.stringify(powerupResult.errors)}
  `)
  } else if (powerupResult.status == "success") {
    await db.dopowerup.update({ where: { txid: powerupResult.txid }, data: { User: { connect: { telegramId: ctx.message.from.id } } } })
    await ctx.replyWithHTML(`
    <strong>${name} received</strong>
    ⚡ CPU ${powerupResult.powerupLog.received_cpu_ms.value.toFixed(0)} ms
    ⛓️ NET ${powerupResult.powerupLog.received_net_kb.value.toFixed(0)} kb
    🔗 <a href="https://bloks.io/transaction/${powerupResult.txid}">txid</a>
  `)
  } else if (powerupResult.status == "reachedFreeQuota") {
    bot.telegram.deleteMessage(ctx.chat.id, statusMsg.message_id).catch(err => console.error(err.toString()))
    await ctx.replyWithHTML(`
    <strong>${name} Free Quota Reached!</strong>
    ⏲️ Next free PowerUp available:
    ${new Date(powerupResult.nextPowerup).toUTCString()}
  `)
    displayAd(ctx)
  } else {
    await ctx.reply(JSON.stringify(powerupResult))
  }
}

if (require.main === module) {
  console.log("Starting Telegram Bot")
  init(...process.argv).catch(console.error)
    .then((result) => console.log("Finished"))
}


// async function displayAd(ctx: Context) {
//   return ctx.replyWithPhoto({ source: readFileSync('../images/avatar-banner.webp') }, {
//     caption: `<strong>Design your own NFT avatar and earn BOID when others mint your deisign.</strong>
//     <a href="https://avatar.boid.com">Boid Avatars</a>
//     `, parse_mode: "HTML"
//   })
// }
async function displayAd(ctx:Context) {
  return ctx.replyWithPhoto({ source: readFileSync("../images/boidfrontier.jpg") }, {
    caption: `<strong>Try the new seamless IBC service from the team behind Boid and EOSPowerup.</strong>
    <a href="https://antelopex.io">antelopex.io</a>
    `,
    parse_mode: "HTML"
  })
}

//PowerUp Bronze NFT staking is now live! You can stake your Bronze NFT to receive additional CPU when claiming free PowerUps. Visit eospowerup.io/nft/activate for details.
