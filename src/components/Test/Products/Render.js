import React, {Component} from 'react'
import classnames from 'classnames'
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

class Render extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        angle_active:'front'
    }

    componentDidMount() {

    }

    render() {

      
        const ProductCustomize =  Object.keys(this.props.product).map(angle=>{
            let src = '/images/'+ this.props.model + '_overlay_'+angle+'_600_ss.png'
            return (
                <div className={classnames(angle,{'active':this.state.angle_active === angle})}>
                    <div className="glove-overlay">
                        <img src={src} alt=""/>
                    </div>

                    {this.props.product[angle].map(item=>{

                        if(typeof this.props.angles !='undefined'){
                            return (

                                <div
                                    className={classnames("glove-item",item.name)}
                                    data-display-angle={angle}
                                    data-part={item.name}
                                    data-part-type={item.part_type}
                                    data-test={this.props.angles[angle][item.part_type][item.name]}
                                    style={{width: "600px", "fill-opacity": 1}}>

                                    <svg version="1.1"
                                         xmlns="http://www.w3.org/2000/svg"
                                         x="0px" y="0px"
                                         viewBox="0 0 583.2 583.2"
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

        return (
            <div className="glove-container">
                {ProductCustomize}
            </div>
        )

    }


}

const mapStateToProps = (state)=>{
    return {
        angles:state.design.angles
    }
}
export default connect(mapStateToProps,{})(Render)
