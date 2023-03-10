import { SET_TOTAL_BALANCE, SET_DB } from "./Actions";

const initialState = {
    totalBalance: 0,
    db:[]
    // temp db
    // db: [
    //     {
    //     id:1,
    //     money: 55555,
    //     income: true,
    //     iconCategory: "Food & Drinks",
    //     iconIndex: 0,
    //     description: 'paw Bhaji',
    //     date: new Date(),
    //     time: new Date(),
    // }, {
    //     id:2,
    //     money: 90120,
    //     income: false,
    //     iconCategory: "Food & Drinks",
    //     iconIndex: 0,
    //     description: 'paw Bhaji',
    //     date: new Date(),
    //     time: new Date(),
    // },   {
    //     id:3,
    //     money: 900,
    //     income: true,
    //     iconCategory: "Food & Drinks",
    //     iconIndex: 0,
    //     description: 'paw Bhaji',
    //     date: new Date(),
    //     time: new Date(),
    // },],

}

console.log("db")
function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TOTAL_BALANCE:
            return { ...state, totalBalance: action.payload };
        case SET_DB:
            return { ...state, db: action.payload };
        default:
            return state;
    }
}

export default userReducer;