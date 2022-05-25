const INITIAL_STATE = {
  questions: [],
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_QUESTIONS':
    return {
      ...state,
      questions: action.payload,
    };
  case 'ADD_CURRENT_QUESTION':
    return {
      ...state,
      currentQuestion: action.payload,
    };
  default:
    return state;
  }
};

export default gameReducer;
