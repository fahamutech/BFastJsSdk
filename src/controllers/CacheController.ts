import {CacheAdapter} from "../adapters/CacheAdapter";

export class CacheController {

    constructor(private readonly appName: string,
                private readonly database: string,
                private readonly  collection: string,
                private readonly cacheAdapter: CacheAdapter) {
    }

    async keys(): Promise<string[] | undefined> {
        return this.cacheAdapter.keys(this.database, this.collection);
    }

    async clearAll(): Promise<boolean> {
        return this.cacheAdapter.clearAll(this.database, this.collection);
    }

    async get<T extends any>(identifier: string, options: { secure?: boolean } = {secure: false}): Promise<T> {
        return this.cacheAdapter.get<T>(identifier, this.database, this.collection, {secure: options.secure});
    }

    async set<T>(identifier: string, data: T, options: { dtl?: number, secure?: boolean } = {secure: false}): Promise<T> {
        return this.cacheAdapter.set(identifier, data, this.database, this.collection, options);
    }

    async remove(identifier: string, force = true): Promise<boolean> {
        return this.cacheAdapter.remove(identifier, this.database, this.collection, true);
    }

}
