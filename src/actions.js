export const  SET_INFO_STEP_ONE ='SET_INFO_STEP_ONE'
export const  SET_BOOKTYPE ='SET_BOOKTYPE'

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
