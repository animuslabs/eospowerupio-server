// generated by @greymass/abi2core

import {
    Asset,
    Float32,
    Name,
    Struct,
    TimePointSec,
    UInt16,
    UInt32,
    UInt64,
    UInt8,
} from '@greymass/eosio'

@Struct.type('balances')
export class Balances extends Struct {
    @Struct.field(UInt32) template_id!: UInt32
    @Struct.field(UInt16) balance!: UInt16
}

@Struct.type('claim')
export class Claim extends Struct {
    @Struct.field(Name) donator!: Name
}

@Struct.type('claimed')
export class Claimed extends Struct {
    @Struct.field(Name) account!: Name
    @Struct.field(UInt8) bronze_unclaimed!: UInt8
    @Struct.field(UInt16) bronze_claimed!: UInt16
    @Struct.field(UInt8) silver_claimed!: UInt8
    @Struct.field(UInt8) gold_claimed!: UInt8
}

@Struct.type('clrbalances')
export class Clrbalances extends Struct {
    @Struct.field(Name) scope!: Name
}

@Struct.type('clrclaimed')
export class Clrclaimed extends Struct {
}

@Struct.type('clrconfig')
export class Clrconfig extends Struct {
}

@Struct.type('clrleaderb')
export class Clrleaderb extends Struct {
    @Struct.field(UInt64) scope!: UInt64
}

@Struct.type('clrround')
export class Clrround extends Struct {
    @Struct.field(UInt64) round_id!: UInt64
}

@Struct.type('clrrounds')
export class Clrrounds extends Struct {
}

@Struct.type('nft_config')
export class NftConfig extends Struct {
    @Struct.field(Asset) mint_price_min!: Asset
    @Struct.field(Asset) mint_price_increase_by_rank!: Asset
    @Struct.field(UInt16) mint_quantity_cap_per_rank!: UInt16
    @Struct.field(UInt16) max_bronze_mint_per_round!: UInt16
    @Struct.field(UInt8) deposit_bronze_for_silver!: UInt8
    @Struct.field(UInt8) deposit_silver_for_gold!: UInt8
    @Struct.field(UInt8) bonus_silver_per_bronze_claimed!: UInt8
    @Struct.field(UInt8) bonus_gold_per_silver_claimed!: UInt8
    @Struct.field(Name) collection_name!: Name
    @Struct.field(Name) schema_name!: Name
    @Struct.field(UInt32) bronze_template_id!: UInt32
    @Struct.field(UInt32) silver_template_id!: UInt32
    @Struct.field(UInt32) gold_template_id!: UInt32
}

@Struct.type('config')
export class Config extends Struct {
    @Struct.field(UInt64) round_length_sec!: UInt64
    @Struct.field(TimePointSec) start_time!: TimePointSec
    @Struct.field(Asset) minimum_donation!: Asset
    @Struct.field('bool') enabled!: boolean
    @Struct.field(Float32) compound_decay_pct!: Float32
    @Struct.field(UInt64) decay_step_sec!: UInt64
    @Struct.field(UInt64) start_decay_after_steps!: UInt64
    @Struct.field(NftConfig) nft!: NftConfig
}

@Struct.type('leaderboard')
export class Leaderboard extends Struct {
    @Struct.field(Name) donator!: Name
    @Struct.field(UInt64) score!: UInt64
    @Struct.field(Asset) donated!: Asset
    @Struct.field(UInt64) times!: UInt64
    @Struct.field(TimePointSec) last_donation!: TimePointSec
}

@Struct.type('rounds')
export class Rounds extends Struct {
    @Struct.field(UInt64) id!: UInt64
    @Struct.field(Asset) total_donated!: Asset
    @Struct.field(UInt64) total_score!: UInt64
    @Struct.field(UInt64) donators!: UInt64
    @Struct.field(TimePointSec) start!: TimePointSec
    @Struct.field('bool') rewarded!: boolean
}

@Struct.type('rewards_data')
export class RewardsData extends Struct {
    @Struct.field(Name) donator!: Name
    @Struct.field(Asset) donated!: Asset
    @Struct.field(UInt64) score!: UInt64
    @Struct.field(UInt8) rank!: UInt8
    @Struct.field(UInt8) bronze_nfts_awarded!: UInt8
}

@Struct.type('rewardlog')
export class Rewardlog extends Struct {
    @Struct.field(Rounds) round_data!: Rounds
    @Struct.field(RewardsData, {array: true}) rewards_data!: RewardsData[]
}

@Struct.type('rewardround')
export class Rewardround extends Struct {
    @Struct.field(UInt64) round_id!: UInt64
}

@Struct.type('rmaccount')
export class Rmaccount extends Struct {
    @Struct.field(Name) donator!: Name
}

@Struct.type('setconfig')
export class Setconfig extends Struct {
    @Struct.field(Config) cfg!: Config
}

@Struct.type('simdonation')
export class Simdonation extends Struct {
    @Struct.field(Name) donator!: Name
    @Struct.field(Asset) donation!: Asset
}
