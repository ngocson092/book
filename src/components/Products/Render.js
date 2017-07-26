import React, {Component} from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {Spin } from 'antd'
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

import {BASE_URL} from '../../CONFIG'

function imagesLoaded(parentNode) {
    const imgElements = parentNode.querySelectorAll('img');
    for (const img of imgElements) {
        if (!img.complete) {
            return false;
        }
    }
    return true;
}

class Render extends Component {

    state = { loading:true };

    changeAngle = (angle)=>{
        this.props.setActiveAngle(angle)
    }

    renderSpinner() {
        if (this.state.loading && !this.props.isthumb){
            return (
                /*
                * only render spin in main product custom
                * not render in sidebar of thumbs
                * */

                <Spin
                    size="large"
                    tip="Loading..."
                    className="spin-custom"
                />
            )
        }
        return null;
    }

    handleImageChange() {
        this.setState({
            loading: !imagesLoaded(this.refs.product_customize),
        });
    }

    renderImage(imageUrl) {
        return (
            <div>
                <img
                    src={imageUrl}
                    onLoad={this.handleImageChange.bind(this)}
                    onError={this.handleImageChange.bind(this)}
                />
            </div>
        );
    }

    render() {
        const ProductCustomize =  Object.keys(this.props.product).map((angle,i)=>{
            let src = BASE_URL+ 'images/'+ this.props.model + '_overlay_'+angle+'.png'
            return (
                <div key={i} onClick={()=>{ if(this.props.isthumb){ this.changeAngle(angle) } }} className={classnames(angle,{'active':this.props.angle_active === angle})}>

                    <div className="glove-overlay">
                        {this.renderImage(src)}
                    </div>
                    <div className="glove-shadow">
                        {this.renderImage(BASE_URL+ "images/glove-shadow.png")}
                    </div>

                    {this.props.product[angle].data.map((item,i)=>{

                        if(typeof this.props.angles !='undefined'){
                            return (
                                <div
                                    key={i}
                                    className={classnames("glove-item",item.name)}
                                    style={{width: !this.props.isthumb ? "800px" : "100px"}}>

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


       return  (

           <div>
               <div
                   ref="product_customize"
                   className={
                     classnames({
                         'wrap-products':!this.props.isthumb,
                         'wrap-thumbs':this.props.isthumb,
                         'hidden':this.state.loading
                     })
                   }>

                   {ProductCustomize}
               </div>
               {this.renderSpinner()}
           </div>


        )



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
