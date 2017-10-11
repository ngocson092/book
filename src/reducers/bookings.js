import { SET_BOOKINGS,SET_SHOW_MODE,SET_FILTER_STATUS } from '../actions/types';
import { GRID,STATUS} from '../define';

const initialState = {
    data: [],
    show_mode:GRID,
    active_status:STATUS['ALL']
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case SET_BOOKINGS: return {...state,data:action.data};
    case SET_SHOW_MODE: return {...state,show_mode:action.mode};
    case SET_FILTER_STATUS: return {...state,active_status:action.status};
    default: return state;
  }
}
