// @flow

import io from 'socket.io-client';
import Emitter from 'component-emitter';

import type {
    SubscriptionToNewBlocks,
    SubscriptionOptions,
    Block,
    LatestBlocksData,
} from 'src/utils/types';

import type { Socket } from 'socket.io-client';

const socketUrl = process.env.REACT_APP_API_SOCKET_URL_FANTOM;

class SubscribeToNewBlocks extends Emitter implements SubscriptionToNewBlocks {
    _socket: Socket;

    constructor(options?: SubscriptionOptions) {
        super();

        this._socket = io(socketUrl);
        this._socket
            .on('connect', () => {
                console.log('[SubscribeToNewBlocks]: Connected');
                this._socket.emit('subscribe');
            })
            .on('message', (msg: string) => {
                const data:
                    | {| event: 'subscribed' |}
                    | {| event: 'newBlock', block: Block |} = JSON.parse(msg);

                switch (data.event) {
                    case 'subscribed': {
                        console.log('[SubscribeToNewBlocks]: Subscribed to newBlock event');
                        break;
                    }
                    case 'newBlock': {
                        this.emit('blockData', { blocks: [data.block] });
                        break;
                    }
                    default: break;
                }
            })
            .on('errorEvent', (msg: string) => {
                this.emit('error', JSON.parse(msg));
            });

        return this;
    }

    subscribe() {
        return this;
    }

    async unsubscribe() {
        try {
            this._socket.disconnect();
            return true;
        } catch(err) {
            console.log(err);
            return false;
        }
    }

    addListener(type: 'blockData', handler: (latestBlocksData: LatestBlocksData) => void) {
        this.on(type, handler);

        return this;
    }
}

export default SubscribeToNewBlocks;