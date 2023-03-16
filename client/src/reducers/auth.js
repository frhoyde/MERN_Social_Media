import { AUTH, LOGOUT } from '../constants/actionTypes';


const authReducer = (state = { authData: null}, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}));

            return { ...state, authData: action?.data };
        default:
           return state;  // always needs to return something
    }
}

export default authReducer;
