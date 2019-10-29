import * as types from 'src/storage/constants';

export function setRealtimeUpdateDetails({ isRealtimeUpdate }) {
  return {
    type: types.SET_REALTIME_UPDATE,
    realtimeUpdate: { isRealtimeUpdate },
  };
}
