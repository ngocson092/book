import React, {Component} from 'react';
import HeaderTop from './Include/HeaderTop'
import HeaderBottom from './Include/HeaderBottom'

class Header extends Component {

    render() {

        return (
            <div id="header">
                <HeaderTop {...this.props}></HeaderTop>
                <HeaderBottom></HeaderBottom>
            </div>
        );
    }
}


export default Header
