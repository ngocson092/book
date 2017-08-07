export const  SET_ANGLE_COLOR ='SET_ANGLE_COLOR'
export const  INIT_ANGLE_COLOR ='INIT_ANGLE_COLOR'
export const  SET_ACTIVE_ANGLE ='SET_ACTIVE_ANGLE'
export const  SET_ANGLE_PART_COLOR ='SET_ANGLE_PART_COLOR'
export const  INCREASE ='INCREASE'
export const  ANGLES = [
    'front',
    'back',
    'side'
]
export function setAnglePartColor (angle,part_type,part_name,color){
    return dispatch => {
        dispatch({
            type: SET_ANGLE_PART_COLOR,
            data:{angle,part_type,part_name,color}
        })
    }
}
