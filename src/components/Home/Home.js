import style from './home.css'
import React,{Component} from 'react'
import {connect} from 'react-redux'
class HomePage extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="home-page">
                <div className={style.intro}></div>
            </div>
        )
    }

}

const mapStateToProps = (state)=>{
    return {
    }
}

export default connect(mapStateToProps)(HomePage)