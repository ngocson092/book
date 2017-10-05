import { SET_CARDS,SET_CARD_DEFAULT } from '../actions/types';

export default (state = [], action = {}) => {
  switch(action.type) {

    case SET_CARDS:
      return action.data;
    case SET_CARD_DEFAULT:

        state = state.map(card=>{
          card.isDefault = (card._id == action.id) ? true : false;
          return card;
        })
        return state;

    default: return state;
  }
}
