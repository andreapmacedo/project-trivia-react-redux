const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'PLAYER':
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case 'SCORE_UPDATE':
    return {
      ...state,
      score: action.payload.score,
      assertions: action.payload.assertions,
    };
  case 'SCORE_RESET':
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  default:
    return state;
  }
};

export default playerReducer;
