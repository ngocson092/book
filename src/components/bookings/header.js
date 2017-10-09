/**
 * Created by lamtanphiho on 9/26/2017.
 */
import React,{Component} from 'react'
import {Layout, Icon} from 'antd';
import {Link} from 'react-router-dom';
const {Header} = Layout;

export default class Bookings extends Component{
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Header id="header">
                <Link className="logo" to={'/book'}>Photosesh - Book Now</Link>
                <Link className={'menu'} to={'/bookings'}>  Bookings</Link>

                <Link className={'menu'} to={'/'}><Icon type="home" />
                    Home
                    <span className="menu menu-middle"> | </span>
                </Link>
                <style>{css}</style>
            </Header>
        )
    }

}

const css = `
    .menu {
      display: inline-block;
      color: #525252;
      text-decoration: none;
      font-size: 20px;
      float:right
    }
    .menu-middle{
        margin: 0 10px;
    }
`;