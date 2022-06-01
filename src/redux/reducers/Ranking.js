const INITIAL_STATE = {
  playerRanking: [],
};

const ranking = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_TO_RANKING':
    return {
      ...state,
      timeSeconds: action.payload,
    };
  default:
    return state;
  }
};

export default ranking;
