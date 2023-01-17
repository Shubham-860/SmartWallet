export const SET_TOTAL_BALANCE = 'SET_TOTAL_BALANCE';
export const SET_DB = 'SET_DB';

export const setTotalBalance = totalBalance => dispatch => {
    dispatch({
        type: SET_TOTAL_BALANCE,
        payload: totalBalance,
    });
};
export const setDB = db => dispatch => {
    dispatch({
        type: SET_DB,
        payload: db,
    });
};