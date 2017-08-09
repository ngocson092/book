import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Route,Link} from 'react-router-dom'
import { Carousel } from 'antd';

import '../stylesheet/_home.scss'
class HomePage extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="home">
                <div className="intro"></div>
            </div>
        )
    }

}

const mapStateToProps = (state)=>{
    return {
    }
}

export default connect(mapStateToProps)(HomePage)