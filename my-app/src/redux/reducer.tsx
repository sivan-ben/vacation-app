
import actions from './action.config';

const initialState = {
    user: null,
    userLoading: true,
    vacations: [],
    isAdmin: false
}


export default (state = initialState, action: any) => {
    const { type, payload } = action;

    switch (type) {
        case actions.SET_USER:
            return { ...state, user: payload.user, vacations: payload.vacations, userLoading: false };

        case actions.SET_VACATIONS:
            return { ...state, vacations: payload };

        case actions.SAVE_ADMIN:
            return { ...state, isAdmin: true, vacation: payload.vacations }

        case actions.DELETE_USER:
            return { ...state, user: null, vacations: null, userLoading: false, isAdmin: false };

        default: return state;
    }
}