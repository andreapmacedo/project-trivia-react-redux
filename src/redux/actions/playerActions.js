export const player = (payload) => ({
  type: 'PLAYER',
  payload,
});

export const scoreUpdate = (payload) => ({
  type: 'SCORE_UPDATE',
  payload,
});

export const scoreReset = () => ({
  type: 'SCORE_RESET',
});
