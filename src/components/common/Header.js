import React, {Component} from 'react';
import {connect} from 'react-redux'

import HeaderTop from './Include/HeaderTop'
import HeaderBottom from './Include/HeaderBottom'
import {logout} from '../../actions/authActions'
class Header extends Component {

    render() {

        return (
            <div id="header">
                <HeaderTop {...this.props}/>
                <HeaderBottom></HeaderBottom>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        fullname:state.auth.user.name.firstName + ' ' + state.auth.user.name.lastName,
        avatar: (state.auth.user.profilePicURL.thumb != '')?state.auth.user.profilePicURL.thumb:''
    }
}
export default connect(mapStateToProps,{logout})(Header)
