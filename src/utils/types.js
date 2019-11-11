// @flow

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

export interface DataProvider {
    getLatestBlocksData(): Promise<LatestBlocksData | RequestError>;
    getBlocks(fromBlock: ?number, count: ?number, getBlockParams: [boolean] | []): Promise<Array<Block<Transaction | string>>>;
};
