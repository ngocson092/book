import React, {Component} from 'react';
import {Route,Link} from 'react-router-dom'
import {Row, Form} from 'antd';
import {connect} from 'react-redux'
import { Layout, Alert, Icon,Button,Menu } from 'antd';
import axios from 'axios';
import {API_URL} from '../../../actions/authActions'
import AddCardSection from './AddCardSection'
import CardSection from './CardSection'
import CreditSection from './CreditSection'

const {  Content, Sider } = Layout;
const FormItem = Form.Item;

class PaymentCredit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current:'card'
        }
    }
    goTo(route) {
        this.props.history.replace(`${route}`)
    }

    componentWillMount(){

        axios.get(API_URL + '/user/getCredits')
            .then(res=>{
                console.log(res.data);
            })


    }
    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
    }

    render() {

        let style_button = {
            padding:'10px 80px',
            margin:10,
            height:40
        }

        return (
            <div>
               <div style={{textAlign:'center',marginBottom:20,overflow:'hidden',background: '#efefef',boxShadow:'1px 1px 1px #ccc'}}>


                   <Menu
                       onClick={this.handleClick}
                       mode="horizontal"
                       defaultSelectedKeys={'card'}

                       selectedKeys={[this.state.current]}

                   >
                       <Menu.Item key="card">
                           <Link to="/my-account/payment-credits/card" className="btn">CARDS</Link>
                       </Menu.Item>
                       <Menu.Item key="credit">
                           <Link to="/my-account/payment-credits/credits" className="btn">CREDITS</Link>
                       </Menu.Item>
                   </Menu>
               </div>
                <Route  exact={true}  path={`${this.props.match.url}/`} component={CardSection}/>
                <Route  exact={true}  path={`${this.props.match.url}/card`} component={CardSection}/>
                <Route  exact={true}  path={`${this.props.match.url}/card/add-new`} component={AddCardSection}/>
                <Route  exact={true}  path={`${this.props.match.url}/credits`} component={CreditSection}/>
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        user:state.auth.user
    }
}
export default connect(mapStateToProps, {})(PaymentCredit)



