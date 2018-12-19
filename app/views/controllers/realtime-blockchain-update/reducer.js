import { fromJS } from 'immutable';
import { SET_REALTIME_UPDATE } from '../constants';

const initialState = fromJS({
  realtimeUpdate: {
    isRealtimeUpdate: false,
  },
});

function realtimeUpdateReducer(state = initialState, action) {
  console.log(' realtimeUpdate action:  ', action);
  switch (action.type) {
    case SET_REALTIME_UPDATE:
      return state.set('realtimeUpdate', action.realtimeUpdate);
    default:
      return state;
  }
}

export default realtimeUpdateReducer;
