export const  SET_INFO_STEP_ONE ='SET_INFO_STEP_ONE'

export function setInfoStepOne (data){
    return dispatch => {
        dispatch({
            type: SET_INFO_STEP_ONE,
            data:data
        })
    }
}
