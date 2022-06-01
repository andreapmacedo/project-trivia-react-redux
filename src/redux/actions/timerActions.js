const setTimeSecond = (payload) => ({
  type: 'TIMER',
  payload,
});

// export const startLobbyPolling = () => (dispatch) => {
//   const ONE_SECOND = 1000;
//   const payload = setInterval(() => {
//     dispatch(setTimeSecond());
//   }, ONE_SECOND);
//   dispatch(setTimeSecond(payload));
// };

export default setTimeSecond;
