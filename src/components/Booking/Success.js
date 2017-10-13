import React, {Component} from 'react'
import {Row, Icon, Card, Layout, Button} from 'antd';
import {Redirect, Link} from 'react-router-dom'
const {Header} = Layout
class Success extends Component {
    constructor(props) {
        super(props);
    }

    goTo(route) {
        this.props.history.replace(route)
    }

    render() {


        return (
            <div style={{maxWidth:700,margin:'50px auto'}}>
                <Card>

                    <div style={{textAlign:'center',fontSize: 80,color: '#98d23d'}}>
                        <Icon style={{color:'dark-green'}} type="check-circle" />
                    </div>

                    <h2 className="head-title-center">Booking Successful </h2>
                    <div style={{textAlign:'center',marginBottom:100}}>
                        Your Booking has been successful, Thanks you for Booking in Photosesh
                        please check <Link to={'/projects'}>your bookings</Link> <br/>

                        <Button style={{marginTop:30,width:150,marginRight:10}} type={'primary'}> <Link style={{color:'#ffffff'}} to="/projects">Bookings</Link> </Button>
                        <Button style={{marginTop:30,width:150}} type={'primary'}> <Link style={{color:'#ffffff',marginTop:30,width:150}} to="/">Home Page</Link> </Button>
                    </div>

                </Card>

                <ul className="menu_simple">
                    <li><Link to={'/'}>My Bookings </Link></li> |
                    <li><Link to={'/book'}>Continue Booking </Link></li>


                </ul>

            </div>
        )
    }

}
export default Success