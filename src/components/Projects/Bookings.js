import React,{Component} from 'react'
import {connect} from 'react-redux';


import Header from './Include/Header';
import {GRID,LIST} from '../../define'
import {Layout} from 'antd';
import ShowGrid from './Include/Grid'
import ShowList from './Include/Grid'
const {  Content } = Layout;


class Bookings extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <div>
                <Header />

                <div>
                    {this.props.show_mode == GRID && (<ShowGrid {...this.props} />) }
                    {this.props.show_mode == LIST && (<ShowList />) }
                </div>

            </div>
        )
    }

}

const mapStateToProps = (state)=>{
    return {
        show_mode:state.projects.show_mode
    }
}


export default connect(mapStateToProps,{})(Bookings)

