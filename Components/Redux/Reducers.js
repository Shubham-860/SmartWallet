import {SET_DB, SET_TOTAL_BALANCE} from "./Actions";

const initialState = {
    totalBalance: 0,
    db: []
}

console.log("db")

function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TOTAL_BALANCE:
            return {...state, totalBalance: action.payload};
        case SET_DB:
            return {...state, db: action.payload};
        default:
            return state;
    }
}

export default userReducer;