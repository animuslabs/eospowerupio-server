// generated by @greymass/abi2core

import { Asset, Float32, Name, Struct, UInt16, UInt32, UInt64 } from "@wharfkit/antelope"

@Struct.type("account_row")
export class AccountRow extends Struct {
    @Struct.field(Asset) balance!:Asset
}

@Struct.type("autobuyram")
export class Autobuyram extends Struct {
    @Struct.field(Name) payer!:Name
    @Struct.field(Name) watch_account!:Name
}

@Struct.type("autopowerup")
export class Autopowerup extends Struct {
    @Struct.field(Name) payer!:Name
    @Struct.field(Name) watch_account!:Name
    @Struct.field(UInt64) net_frac!:UInt64
    @Struct.field(UInt64) cpu_frac!:UInt64
    @Struct.field(Asset) max_payment!:Asset
}

@Struct.type("billaccount")
export class Billaccount extends Struct {
    @Struct.field(Name) owner!:Name
    @Struct.field(Name) contract!:Name
    @Struct.field(Asset.SymbolCode) symcode!:Asset.SymbolCode
}

@Struct.type("clearconfig")
export class Clearconfig extends Struct {
}

@Struct.type("clrwhitelist")
export class Clrwhitelist extends Struct {
}

@Struct.type("config")
export class Config extends Struct {
    @Struct.field(Float32) fee_pct!:Float32
    @Struct.field("bool") freeze!:boolean
    @Struct.field(Asset) per_action_fee!:Asset
    @Struct.field(Asset) minimum_fee!:Asset
    @Struct.field("string") memo!:string
}

@Struct.type("dobuyram")
export class Dobuyram extends Struct {
    @Struct.field(Name) payer!:Name
    @Struct.field(Name) receiver!:Name
    @Struct.field(UInt32) bytes!:UInt32
}

@Struct.type("dopowerup")
export class Dopowerup extends Struct {
    @Struct.field(Name) payer!:Name
    @Struct.field(Name) receiver!:Name
    @Struct.field(UInt64) net_frac!:UInt64
    @Struct.field(UInt64) cpu_frac!:UInt64
    @Struct.field(Asset) max_payment!:Asset
}

@Struct.type("extended_symbol")
export class ExtendedSymbol extends Struct {
    @Struct.field(Asset.Symbol) sym!:Asset.Symbol
    @Struct.field(Name) contract!:Name
}

@Struct.type("logbuyram")
export class Logbuyram extends Struct {
    @Struct.field("string") message!:string
    @Struct.field(Name) action!:Name
    @Struct.field(Name) payer!:Name
    @Struct.field(Name) receiver!:Name
    @Struct.field(Asset) cost!:Asset
    @Struct.field(Asset) fee!:Asset
    @Struct.field(Asset) total_billed!:Asset
    @Struct.field(Float32) received_ram_kb!:Float32
}

@Struct.type("logpowerup")
export class Logpowerup extends Struct {
    @Struct.field("string") message!:string
    @Struct.field(Name) action!:Name
    @Struct.field(Name) payer!:Name
    @Struct.field(Name) receiver!:Name
    @Struct.field(Asset) cost!:Asset
    @Struct.field(Asset) fee!:Asset
    @Struct.field(Asset) total_billed!:Asset
    @Struct.field(Float32) received_cpu_ms!:Float32
    @Struct.field(Float32) received_net_kb!:Float32
}

@Struct.type("open")
export class Open extends Struct {
    @Struct.field(Name) owner!:Name
    @Struct.field(ExtendedSymbol) extsymbol!:ExtendedSymbol
    @Struct.field(Name) ram_payer!:Name
}

@Struct.type("rmwatchaccnt")
export class Rmwatchaccnt extends Struct {
    @Struct.field(Name) owner!:Name
    @Struct.field(Name) watch_account!:Name
}

@Struct.type("setconfig")
export class Setconfig extends Struct {
    @Struct.field(Config) cfg!:Config
}

@Struct.type("state")
export class State extends Struct {
    @Struct.field(Name) contract!:Name
    @Struct.field(Asset) balance!:Asset
    @Struct.field(Name) receiver!:Name
    @Struct.field(Name) action!:Name
    @Struct.field(Float32) received_cpu_ms!:Float32
    @Struct.field(Float32) received_net_kb!:Float32
    @Struct.field(Float32) received_ram_kb!:Float32
    @Struct.field("string") memo!:string
}

@Struct.type("sxrebalance")
export class Sxrebalance extends Struct {
    @Struct.field(Asset) maintain_bal!:Asset
}

@Struct.type("tknwhitelist_row")
export class TknwhitelistRow extends Struct {
    @Struct.field(Name) contract!:Name
    @Struct.field(Asset) max_deposit!:Asset
}

@Struct.type("watchlist_row")
export class WatchlistRow extends Struct {
    @Struct.field(Name) account!:Name
    @Struct.field(UInt16) min_cpu_ms!:UInt16
    @Struct.field(UInt16) powerup_quantity_ms!:UInt16
    @Struct.field(UInt16) min_kb_ram!:UInt16
    @Struct.field(UInt16) buy_ram_quantity_kb!:UInt16
    @Struct.field("bool") active!:boolean
}

@Struct.type("watchaccount")
export class Watchaccount extends Struct {
    @Struct.field(Name) owner!:Name
    @Struct.field(WatchlistRow) watch_data!:WatchlistRow
}

@Struct.type("whitelisttkn")
export class Whitelisttkn extends Struct {
    @Struct.field(TknwhitelistRow) tknwhitelist!:TknwhitelistRow
}

@Struct.type("withdraw")
export class Withdraw extends Struct {
    @Struct.field(Name) owner!:Name
    @Struct.field(Asset) quantity!:Asset
    @Struct.field(Name) receiver!:Name
}
