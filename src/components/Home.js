import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Carousel } from 'antd';

import {Route,Link} from 'react-router-dom'
import '../stylesheet/_home.scss'
class HomePage extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="home">
                <div id="home-intro">

                    <Carousel effect="fade" autoplay>
                        <div><img src="/images/a1-side.png" alt=""/></div>
                        <div><img src="/images/a1-front.png" alt=""/></div>
                        <div><img src="/images/a1-back.png" alt=""/></div>

                    </Carousel>

                    <Link to="/select_model" className="btn">Customize</Link>

                </div>

                <div id="line-intro">

                    <div className="col-md-12 text-center">
                        <h3 className="font-i">Customize Baseball Glove
                        </h3>
                    </div>

                </div>

            </div>
        )
    }

}

const mapStateToProps = (state)=>{
    return {
    }
}

export default connect(mapStateToProps)(HomePage)