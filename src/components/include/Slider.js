import React,{Component} from 'react'
import {Route,Link} from 'react-router-dom'
import classnames from 'classnames'
class Slider extends Component{
    constructor(props) {
        super(props);
        this.state = {active_slide:0

        };
        this.autoplay()
    }
    autoplay (){

        setInterval(()=>{
            let active_slide = this.state.active_slide

            if(active_slide <2)
            {



                return this.setState({active_slide: ++active_slide})
            }
            if(active_slide == 2)
            {
                return this.setState({active_slide: 0})
            }

        },3000)

    }

    render() {

        return (
            <div id="home">
                <div id="home-intro">
                    <ul>
                        {this.props.items.map((item,i)=>(
                            <li className={classnames({active:i===this.state.active_slide})}>
                                <img src={item} alt=""/>
                            </li>
                        ))}
                    </ul>
                    <Link to="/select_model" className="btn">Customize</Link>

                </div>
            </div>
        );
    }

}

export default Slider