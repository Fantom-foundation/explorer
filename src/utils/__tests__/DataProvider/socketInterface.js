// @flow

import { Server } from 'mock-socket';

import SubscribeToNewBlocks from 'src/utils/DataProvider/socketInterface';

const serverUrl = process.env.REACT_APP_API_SOCKET_URL_FANTOM;
const mockBlock = {
    difficulty: '2',
    extraData: '0xstring',
    gasLimit: 10000,
    gasUsed: 1000,
    hash: '0xstring',
    logsBloom: 'string',
    miner: '0xstring',
    nonce: 100,
    number: 100,
    parentHash: '0xstring',
    sha3Uncles: '0xstring',
    size: 100,
    stateRoot: '0xstring',
    timestamp: 1500000,
    totalDifficulty: '0xstring',
    transactions: 0,
    transactionsRoot: '0xstring',
    uncles: [],
};
describe('SubscribeToNewBlocks interface', function() {
    it('should create correct interface', function() {
        const socket = new SubscribeToNewBlocks();
        expect(socket).toBeInstanceOf(SubscribeToNewBlocks);
        socket.unsubscribe();
    });

    it('should connect to server', function(done) {
        const mockServer = new Server(serverUrl);
        new SubscribeToNewBlocks();

        mockServer
            .on('connection', () => {
                expect(true).toBe(true);

                process.nextTick(() => mockServer.close());
                done();
            });
    });

    it('should subscribe to new blocks', function(done) {
        const mockServer = new Server(serverUrl);
        new SubscribeToNewBlocks();

        mockServer
            .on('subscribe', () => {
                expect(true).toBe(true);
                mockServer.emit(
                    'message',
                    JSON.stringify({ event: 'subscribed' }),
                );

                process.nextTick(() => mockServer.close());
                done();
            });
    });

    it('should get new block data', function(done) {
        const mockServer = new Server(serverUrl);
        const socket = new SubscribeToNewBlocks();

        socket.addListener('blockData', (latest) => {
            expect(latest).toEqual({ blocks: [mockBlock] });

            process.nextTick(() => mockServer.close());
            done();
        });

        mockServer
            .on('subscribe', () => {
                process.nextTick(() => {
                    mockServer.emit(
                        'message',
                        JSON.stringify({ event: 'newBlock', block: mockBlock }),
                    );
                });
            });
    });

    it('should unsubscribe from socket', function(done) {
        const mockServer = new Server(serverUrl);
        const socket = new SubscribeToNewBlocks();

        mockServer
            .on('subscribe', () => {
                expect(mockServer.clients().length).toBe(1);
                process.nextTick(() => {
                    socket.unsubscribe();
                });
            });

        mockServer
            .on('disconnect', () => {
                expect(mockServer.clients().length).toBe(0);

                mockServer.close();
                done();
            });
    });
});