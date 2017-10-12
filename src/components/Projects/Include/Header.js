import style from './header.css'

import React,{Component} from 'react'
import {Layout, Row, Col,Icon} from 'antd';
import {setShowMode,setFilterStatus} from '../../../actions/manageBookingsAction'
import {connect} from 'react-redux';
import classnames from 'classnames'
import {GRID,LIST,STATUS} from '../../../define'
const {  Content } = Layout;


class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <div className={style.header}>
                <Row>
                    <Col xs={{span: 24, offset: 0}}
                         sm={{span: 12, offset: 0}}
                         md={{span: 8, offset: 0}}
                         lg={{span: 8, offset: 0}}
                         xl={{span: 8, offset: 0}}>

                        View Model <br/>
                        <div style={{borderBottom: '1px solid #f5f5f5'}}>

                            <a onClick={()=>{ this.props.setShowMode(GRID) }}
                               className={classnames(style.btn_view_mode,(this.props.show_mode == GRID)? style.active : '' )}> { this.props.show_mode == GRID && (<Icon type="check" />)}  <span>Grid <Icon type="appstore-o" /></span></a>
                            <a  onClick={()=>{ this.props.setShowMode(LIST) }}
                                className={classnames(style.btn_view_mode,(this.props.show_mode == LIST)? style.active : '' )}> { this.props.show_mode == LIST && (<Icon type="check" />)}  <span>List <Icon type="bars" /></span></a>
                        </div>


                    </Col>

                    <Col xs={{span: 24, offset: 0}}
                         sm={{span: 12, offset: 0}}
                         md={{span: 16, offset: 0}}
                         lg={{span: 16, offset: 0}}
                         xl={{span: 16, offset: 0}}>
                        <ul className={style.list_status_right}>
                            {Object.keys(STATUS).map(key=>{
                                return (<li key={key}><a onClick={(e)=>{ e.preventDefault(); this.props.setFilterStatus(STATUS[key])}} className={classnames((this.props.active_status == STATUS[key])? style.active_status:'' )} href="">{key}</a></li>)
                            })}
                        </ul>
                    </Col>
                </Row>


            </div>
        )
    }

}

const mapStateToProps = (state)=>{
    return {
        show_mode:state.projects.show_mode,
        active_status:state.projects.active_status
    }
}


export default connect(mapStateToProps,{setShowMode,setFilterStatus})(Header)

