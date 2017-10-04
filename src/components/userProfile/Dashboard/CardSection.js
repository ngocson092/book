import React, {Component} from 'react';
import {Route,Link} from 'react-router-dom'
import {Row, Form,Alert,Spin,Tag} from 'antd';
import {connect} from 'react-redux'
import { Layout, Menu, Icon,Button,Table  } from 'antd';
import {getCards} from '../../../actions/paymentActions'

const {  Content, Sider } = Layout;
const FormItem = Form.Item;

class CardSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards:[],
            loading:false
        }
    }
    goTo(route) {
        this.props.history.replace(`${route}`)
    }

    componentWillMount(){

        this.setState({loading:true})

        getCards().then(res=>{

            if(res.data.data){
                this.setState({loading:false})
                let cards = res.data.data.allCards
                this.setState({cards})
            }


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

        const CardList = ()=>{
            const columns = [{
                title: 'No',
                dataIndex: 'no',
               // render: text => <a href="#">{text}</a>,
            }, {
                title: 'Card Type',
                dataIndex: 'card_type',
            }, {
                title: 'Active',
                dataIndex: 'active',
            },{
                title: 'Last Four Digits',
                dataIndex: 'last_four_digits',
            }, {
                title: 'Card Default',
                dataIndex: 'card_default',
            }, {
                title: 'Added At',
                dataIndex: 'addedAt',
            }];

            let data_cards = this.state.cards.map((card,index)=>{
                return {
                    key: index,
                    no: index + 1,
                    card_type: card.cardType,
                    last_four_digits: card.lastFourDigits,
                    active: (card.isActive) ? (<Tag color="#87d068">actived</Tag>) : (<Tag>Inactive</Tag>),
                    card_default: (card.isDefault) ? (<Tag color="#87d068">yes</Tag>) : (<Tag>no</Tag>),
                    addedAt: card.addedAt
                }
            })

            return  <Table  columns={columns} dataSource={data_cards} />

        }


        return (
            <div>

                {(this.state.loading)&& (
                    <div style={{
                        textAlign: "center",
                        padding: "60px 0"
                    }}> <Spin></Spin> </div>
                )}

                {
                    (!this.state.loading)&& (
                        (this.state.cards.length == 0 ) ? (<Alert style={AlertStyle} message="No Cards Found" type="info" />) : (<CardList></CardList>)
                    )
                }

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



