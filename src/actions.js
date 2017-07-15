import axios from 'axios'

export const  SET_ANGLE_COLOR ='SET_ANGLE_COLOR'
export function setAngleColor (color){
    return dispatch => {
        dispatch({
            type: SET_ANGLE_COLOR,
            color
        })
    }
}
