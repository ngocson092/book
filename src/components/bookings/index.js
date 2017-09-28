/**
 * Created by lamtanphiho on 9/26/2017.
 */
import React,{Component} from 'react'
import {Layout, Table} from 'antd';
import Heade from '../bookings/heade';
const {  Content } = Layout;
const request   = require('request');
const dateFormat    = require('dateformat');

export default class Bookings extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dataSource : []
        };
    }
    componentDidMount = function () {
        let that = this;
        let user = localStorage.getItem("user");
        user = JSON.parse(user);
        request.get(process.env.API_URL + '/booking/user/getAllAppointments?offset=420', {
            headers: {
                'authorization': user.accessToken
            }
        }, function (error, response, body) {
            if(!error){
                body = JSON.parse(body);
                let dataSource = body.data.pastAppointment.map(book=>{
                    return {
                        title : book.titleOrDescription,
                        event_type : book.eventType,
                        book_date : dateFormat(book.appointmentDate, 'yyyy-mm-dd'),
                        book_time : book.appointmentStartTime + ' - ' + book.appointmentEndTime,
                        book_address : book.appointmentAddress,
                        agent_email : book.agentEmailId,
                        agent_name : book.agentName.firstName + ' ' +  book.agentName.lastName,
                    }
                })
                that.setState({
                    dataSource: dataSource
                })
            }
            console.log(error, body)
        })
    }
    render() {
        const dataSource = this.state.dataSource;

        const columns = [{
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: 'Event type',
            dataIndex: 'event_type',
            key: 'event_type',
        },{
            title: 'Book date',
            dataIndex: 'book_date',
            key: 'book_date',
        },{
            title: 'Book time',
            dataIndex: 'book_time',
            key: 'book_time',
        },{
            title: 'Book address',
            dataIndex: 'book_address',
            key: 'book_address',
        }, {
            title: 'Agent name',
            dataIndex: 'agent_name',
            key: 'agent_name',
        }, {
            title: 'Agent email',
            dataIndex: 'agent_email',
            key: 'agent_email',
        }];
        return (
            <div className="choose-address">
                <Layout>
                    <Heade />
                    <Content>
                        <div className="title">
                            <h1>Bookings</h1>
                        </div>

                        <Table dataSource={dataSource} columns={columns} />
                    </Content>
                </Layout>
                <style>{css}</style>
            </div>

        )
    }

}
const css = `
    .title {
        text-align: center;
        margin: 130px 0 50px 0;
        font-size: 30px;
    }
    .ant-table-wrapper{
        padding: 15px;
    }
    thead.ant-table-thead tr th {
    
        font-size: 16px;
        font-weight: bold;
    }
`;