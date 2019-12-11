// @flow

export type ExtractReturn<Fn> = $Call<<T>((...Array<any>) => T) => T, Fn>;

export type Transaction = {|
    hash: string,
    from: string,
    to: string,
    value: string,
    transactionIndex: number,
    blockHash: string,
    blockNumber: number,
    gas: number,
    gasPrice: string,
    input: string,
    nonce: number,
    r: string,
    s: string,
    v: string,
    // ...
    cumulativeGasUsed: number,
    fee: string,
    gasUsed: number,
    logs: Array<{ ... }>,
    status: boolean,
    timestamp: number,
    contractAddress?: string,
|};

export type NewBlockTransaction = {|
    hash: string,
    from: string,
    to: string,
    value: string,
    transactionIndex: number,
|};

export type TransactionReceipt = {|
    status: boolean,
    transactionHash: string,
    transactionIndex: number,
    blockHash: string,
    blockNumber: number,
    from: string,
    to: string,
    contractAddress?: string,
    cumulativeGasUsed: number,
    gasUsed: number,
    logs: Array<{ ... }>,
    logsBloom: string,
|};

export type Block = {|
    difficulty: string,
    extraData: string,
    gasLimit: number,
    gasUsed: number,
    hash: string,
    logsBloom: string,
    miner: string,
    nonce: number,
    number: number,
    parentHash: string,
    sha3Uncles: string,
    size: number,
    stateRoot: string,
    timestamp: number,
    totalDifficulty: string,
    transactions: number,
    transactionsRoot: string,
    uncles: Array<string>,
|};

export type LatestBlocksData = {|
    blocks?: Array<Block>,
    transactions?: Array<Transaction>,
|};

export type NewBlockData = {|
    blocks: Array<Block>,
    transactions: Array<NewBlockTransaction>,
|};

export type RequestError = {|
    error: Error
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
    constructor(options?: SubscriptionOptions): SubscriptionToNewBlocks;

    options: SubscriptionOptions;

    subscribe(callback?: (error: Error, result: BlockHeader) => void): SubscriptionToNewBlocks;

    unsubscribe(
        callback?: (error: Error, result: boolean) => void
    ): Promise<?boolean>;

    emit(event: string, ...args: Array<any>): boolean;

    on(type: 'data', handler: (data: BlockHeader) => void): SubscriptionToNewBlocks;

    on(type: 'changed', handler: (data: BlockHeader) => void): SubscriptionToNewBlocks;

    on(type: 'error', handler: (data: Error) => void): SubscriptionToNewBlocks;

    addListener(type: 'blockData', handler: (block: NewBlockData) => void): SubscriptionToNewBlocks;
}

export interface DataProvider {
    getLatestBlocksData(): Promise<LatestBlocksData | RequestError>;
    subscribeToNewBlocks(): SubscriptionToNewBlocks,
    getBlock(blockNumber: number): Promise<{| blockData: Array<Block> |} | RequestError>,
    getBlocksPageData(fromBlock?: number, count?: number): Promise<{|
        maxBlockHeight: number,
        blocks: Array<Block>,
        total: number,
    |} | RequestError>,
    getTransactionsByBlockNumber(blockNumber: number, offset?: number): Promise<{|
        blockData: Array<Transaction>,
        total: number,
    |} | RequestError>,
    getTransaction(transactionHash: string): Promise<{| transactionData: Array<Transaction> |} | RequestError>,
    getTransactionsPageData(offset: number, count?: number): Promise<{|
        maxBlockHeight: number,
        transactions: Array<Transaction>,
        total: number,
    |} | RequestError>
}
