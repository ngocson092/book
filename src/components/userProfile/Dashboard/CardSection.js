import React, {Component} from 'react';
import {Route,Link} from 'react-router-dom'
import {Row, Form,Alert} from 'antd';
import {connect} from 'react-redux'
import { Layout, Menu, Icon,Button } from 'antd';
import axios from 'axios';
import {API_URL} from '../../../actions/authActions'

const {  Content, Sider } = Layout;
const FormItem = Form.Item;

class CardSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards:[]
        }
    }
    goTo(route) {
        this.props.history.replace(`${route}`)
    }

    componentWillMount(){

        axios.get(API_URL + '/payment/user/getCards')
            .then(res=>{
                this.setState({cards:res.data})
            })


    }

    render() {

        const ListCard = this.state.cards.map(card=>{
            return <li>{card.cardNumber}</li>
        })

        const AlertStyle = {
            padding: 100,
            textAlign: 'center',
            marginBottom: 10
        }

        return (
            <div>
                {(this.state.cards.length == 0 ) ? (<Alert style={AlertStyle} message="No Cards Found" type="info" />) : (<ListCard></ListCard>)}

                <Button><Link to="/my-account/payment-credits/card/add-new">Add Card</Link></Button>
            </div>



        );
    }
}



const mapStateToProps = (state) => {
    return {
        user:state.auth.user
    }
}
export default connect(mapStateToProps, {})(CardSection)



