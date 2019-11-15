// @flow

export type ExtractReturn<Fn> = $Call<<T>((...Array<any>) => T) => T, Fn>;

export type Transaction = {|
    blockHash: string,
    blockNumber: number,
    from: string,
    gas: number,
    gasPrice: string,
    hash: string,
    input: string,
    nonce: number,
    r: string,
    s: string,
    to: string,
    transactionIndex: number,
    v: string,
    value: string,
|};

export type Block<T> = {|
    difficulty: string,
    extraData: string,
    gasLimit: number,
    gasUsed: number,
    hash: string,
    logsBloom: string,
    miner: string,
    mixHash: string,
    nonce: string,
    number: number,
    parentHash: string,
    receiptsRoot: string,
    sha3Uncles: string,
    size: number,
    stateRoot: string,
    timestamp: number,
    totalDifficulty: string,
    transactions: Array<T>,
    transactionsRoot: string,
    uncles: Array<string>,
|};

export type LatestBlocksData = {|
    blocks?: Array<Block<string>>,
    transactions?: Array<Transaction>,
|};

export type RequestError = {|
    error: string
|};

export type SubscriptionOptions = {
    subscription: string,
    type: string,
    requestManager: any,
};

export type BlockHeader = {
    number: number,
    hash: string,
    parentHash: string,
    nonce: string,
    sha3Uncles: string,
    logsBloom: string,
    transactionRoot: string,
    stateRoot: string,
    receiptRoot: string,
    miner: string,
    extraData: string,
    gasLimit: number,
    gasUsed: number,
    timestamp: number | string,
}

export interface SubscriptionToNewBlocks {
    constructor(options: SubscriptionOptions): SubscriptionToNewBlocks;

    id: string;
    options: SubscriptionOptions;
    callback: () => void;
    arguments: any;

    subscribe(callback?: (error: Error, result: BlockHeader) => void): SubscriptionToNewBlocks;

    unsubscribe(
        callback?: (error: Error, result: boolean) => void
    ): Promise<?boolean>;

    on(type: 'data', handler: (data: BlockHeader) => void): SubscriptionToNewBlocks;

    on(type: 'changed', handler: (data: BlockHeader) => void): SubscriptionToNewBlocks;

    on(type: 'error', handler: (data: Error) => void): SubscriptionToNewBlocks;
}

export interface DataProvider {
    getLatestBlocksData(): Promise<LatestBlocksData | RequestError>;
    getBlocks(fromBlock: ?number, count: ?number, getBlockParams: [boolean] | []): Promise<Array<Block<Transaction | string>>>;
    subscribeToNewBlocks(): SubscriptionToNewBlocks,
    getNewBlockData(blockNum: number): Promise<LatestBlocksData>,
    getBlocksPageData(fromBlock?: number, count?: number): Promise<{| maxBlockHeight: number, blocks: Array<Block<Transaction | string>> |}>
}
