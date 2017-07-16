export const  SET_ANGLE_COLOR ='SET_ANGLE_COLOR'
export const  INIT_ANGLE_COLOR ='INIT_ANGLE_COLOR'
export const  SET_ACTIVE_ANGLE ='SET_ACTIVE_ANGLE'
export const  INCREASE ='INCREASE'
export const  ANGLES = [
    'front',
    'back',
    'side'
]
export function setAngleColor (angle,part_type,part_name,color){
    return dispatch => {
        dispatch({
            type: SET_ANGLE_COLOR,
            data:{angle,part_type,part_name,color}
        })
    }
}

export function initAngleColor (data){
    return dispatch => {
        dispatch({
            type: INIT_ANGLE_COLOR,
            data
        })
    }
}


export function setActiveAngle (angle){
    return dispatch => {
        dispatch({
            type: SET_ACTIVE_ANGLE,
            angle
        })
    }
}

