import { Name, NameType } from '@greymass/eosio';
import { ResourceCosts } from './eosio';
import { Logpowerup } from './types/eospowerupio.types';
import { Dopowerup } from '@prisma/client';
export declare let resourcesCosts: ResourceCosts;
export declare function doPowerup(payer: NameType, receiver: NameType, cpuQuantityMs: number, netQuantityMs: number): Promise<import("./eosio").DoActionResponse>;
export declare function doAutoPowerup(payer: NameType, watch_account: NameType, cpuQuantityMs: number, netQuantityMs: number): Promise<import("./eosio").DoActionResponse>;
export interface FreePowerupResult {
    status: 'success' | 'error' | 'reachedFreeQuota' | 'blacklisted';
    powerupLog?: Logpowerup;
    txid?: string;
    recentPowerups?: Dopowerup[];
    errors?: any[];
    nextPowerup?: number;
}
export declare function freePowerup(accountName: string | Name, params?: any): Promise<FreePowerupResult>;
export declare function getStats(): Promise<import(".prisma/client").Stats>;