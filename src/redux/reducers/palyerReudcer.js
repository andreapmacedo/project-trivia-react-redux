const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const paylerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'PLAYER':
    return {
      ...state,
      assertions: action.value.name,
      score: action.value.email,
      gravatarEmail: action.value.picture,
    };
  default:
    return state;
  }
};

export default paylerReducer;
