import { SET_CARDS,SET_CARD_DEFAULT,SET_CREDIT } from '../actions/types';

const initialState = {
    cards: [],
    credits: 0
};

export default (state = initialState, action = {}) => {
  switch(action.type) {

    case SET_CARDS: return {...state,cards:action.data};
    case SET_CREDIT: return {...state,credits:action.credits};
    case SET_CARD_DEFAULT:
      let cards = state.cards.map(card => {
          card.isDefault = (card._id == action.id) ? true : false;
          return card;
      })
      return {...state,cards};
    default: return state;
  }
}
