import React,{Component} from 'react'
import {connect} from 'react-redux'
import { Card,Col,Row,Button ,Steps} from 'antd';

import {Route} from 'react-router-dom'
import '../stylesheet/_home.scss'
import classnames from 'classnames'
import Slider from './include/Slider'
const Step = Steps.Step;
class HomePage extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="home">
                <div id="home-intro">
                    <Slider items={
                        [
                            '/images/intro/1.png',
                            '/images/intro/2.png',
                            '/images/intro/3.png',
                        ]
                    } />
                </div>

                <div id="line-intro">

                    <div className="col-md-12 text-center">
                        <h3 className="font-i">for the love of the game
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