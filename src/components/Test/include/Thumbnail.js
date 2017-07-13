import React, {Component} from 'react'

export default function Thumbnail({images}){


        let
            active = images[0]

            ,next = images.filter(item=>item != active).pop()

            ,changeImage = ()=>{
                active = next

            }

        return (
            <div className="thumbnail">
                <img width="100%" src={active} />

                <span className="icon" onClick={changeImage} ><img width="100%" src={next} /></span>


            </div>
        );


}

