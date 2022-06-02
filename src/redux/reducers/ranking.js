const INITIAL_STATE = {
  playerRanking: [],
};

const ranking = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_RANKING':
    return {
      ...state,
      playerRanking: [...state.playerRanking, action.payload],
    };
  default:
    return state;
  }
};

export default ranking;
