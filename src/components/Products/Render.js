import React, {Component} from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
/*
*
* var arr = []
 $('#glove-holder .glove-angle.front .glove-item svg path').each((i,item)=>{

 let name = $(item).closest('.glove-item').data('part')
 arr.push({
 name:name,
 svg:$(item).attr('d')
 }

 )

 })
*
* */

import {setActiveAngle} from '../../actions'


class Render extends Component {


    componentWillMount(){
        console.log(1);
    }

    componentDidMount(){
        console.log(2);
    }

    changeAngle = (angle)=>{
        this.props.setActiveAngle(angle)
    }


    render() {
        const ProductCustomize =  Object.keys(this.props.product).map((angle,i)=>{
            let src = '/images/'+ this.props.model + '_overlay_'+angle+'_600_ss.png'
            return (
                <div    key={i} onClick={()=>{ if(this.props.isthumb){ this.changeAngle(angle) } }} className={classnames(angle,{'active':this.props.angle_active === angle})}>

                    <div className="glove-overlay">
                        <img src={src} alt=""/>
                    </div>
                    <div className="glove-shadow">
                        <img src="/images/glove-shadow.png" alt=""/>
                    </div>

                    {this.props.product[angle].data.map((item,i)=>{

                        if(typeof this.props.angles !='undefined'){
                            return (
                                <div
                                    key={i}
                                    className={classnames("glove-item",item.name)}
                                    style={{width: !this.props.isthumb ? "600px" : "100px"}}>

                                    <svg version="1.1"
                                         xmlns="http://www.w3.org/2000/svg"
                                         x="0px" y="0px"
                                         viewBox={this.props.product[angle].viewbox}
                                    >
                                        <g>
                                            <path style={{fill:this.props.angles[angle][item.part_type][item.name]}} d={item.svg}></path>
                                        </g>
                                    </svg>
                                </div>


                            )
                        }



                    })}
                </div>
            )
        })

        return  (<div className={classnames({'wrap-products':!this.props.isthumb,'wrap-thumbs':this.props.isthumb})}>{ProductCustomize}</div>)



    }

}



Render.PropTypes = {
    product:PropTypes.object.isRequired,
    angles:PropTypes.array.isRequired,
    isthumb:PropTypes.bool.isRequired,
    model: PropTypes.string.isRequired
}


const mapStateToProps = (state)=>{
    return {
        angles:state.design.angles,
        angle_active:state.design.angle_active

    }
}
export default connect(mapStateToProps,{setActiveAngle})(Render)