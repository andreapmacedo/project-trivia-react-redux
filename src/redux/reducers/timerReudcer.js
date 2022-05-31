const INITIAL_STATE = {
  timeSeconds: 30,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'TIMER':
    return {
      ...state,
      timeSeconds: action.payload,
    };
  default:
    return state;
  }
};

export default gameReducer;
