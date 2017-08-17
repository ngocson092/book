export const  SET_INFO_STEP_ONE ='SET_INFO_STEP_ONE';
export const  SET_BOOKTYPE ='SET_BOOKTYPE';
export const  SET_EVENT_LIST ='SET_EVENT_LIST';

export function setInfoStepOne (data){
    return dispatch => {
        dispatch({
            type: SET_INFO_STEP_ONE,
            data:data
        })
    }
}

export function setBooktype (booktype){
    return dispatch => {
        dispatch({
            type: SET_BOOKTYPE,
            data:booktype
        })
    }
}
export function setEventList (eventlist){
    return dispatch => {
        dispatch({
            type: SET_EVENT_LIST,
            data:eventlist
        })
    }
}
