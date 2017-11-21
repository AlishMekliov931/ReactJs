import { combineReducers } from 'redux';
import authRedux from './authReduser';
import chirpReduser from './chirpReduser';
import usersReduser from './usersReduser';

const redusers = combineReducers({
    authRedux,
    chirpReduser,
    usersReduser
});
export default redusers;
