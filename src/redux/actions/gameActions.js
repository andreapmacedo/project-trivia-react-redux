// const addQuestions = (payload) => ({
//   type: 'ADD_QUESTIONS',
//   payload,
// });

// export const addCurrentQuestions = (payload) => ({
//   type: 'ADD_CURRENT_QUESTION',
//   payload,
// });

// const validateToken = (responseCode) => {
//   const { history } = this.props;
//   const wrongCode = 3;
//   if (responseCode === wrongCode) {
//     localStorage.setItem('token', '');
//     history.push('/');
//   }
// };

// export const getQuestions = () => async (dispatch) => {
//   const token = localStorage.getItem('token');
//   const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
//   const response = await fetch(url);
//   const apiData = await response.json();
//   // validateToken(apiData.response_code);
//   dispatch(addQuestions(apiData.results));
// };

export default getQuestions;
