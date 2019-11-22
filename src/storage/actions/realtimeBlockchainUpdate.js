// @flow

import { SET_REALTIME_UPDATE } from 'src/storage/constants';

export function setRealtimeUpdateDetails({ isRealtimeUpdate }: {| isRealtimeUpdate: boolean |}) {
    return {
        type: SET_REALTIME_UPDATE,
        realtimeUpdate: { isRealtimeUpdate },
    };
}
