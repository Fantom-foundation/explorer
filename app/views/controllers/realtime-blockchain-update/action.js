import * as types from 'views/controllers/constants';

export function setRealtimeUpdateDetails({ isRealtimeUpdate }) {
  return {
    type: types.SET_REALTIME_UPDATE,
    realtimeUpdate: { isRealtimeUpdate },
  };
}
