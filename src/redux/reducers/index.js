import { combineReducers } from 'redux';
import player from './playerReducer';
import ranking from './ranking';

const rootReducer = combineReducers({ player, ranking });

export default rootReducer;
