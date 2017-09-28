/**
 * Created by lamtanphiho on 9/26/2017.
 */
import React,{Component} from 'react'
import {Layout, Table, Popconfirm} from 'antd';
import Heade from '../bookings/heade';
import EditableCell from './editTableCell';
const {  Content } = Layout;
const request   = require('request');
const dateFormat    = require('dateformat');

export default class Bookings extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dataSource : [],
        };
    }
    componentDidMount = function () {
        let that = this;
        request.get(process.env.API_URL + '/booking/user/getAllAppointments?offset=420', {
            headers: {
                'authorization': localStorage.access_token
            }
        }, function (error, response, body) {
            if(!error){
                body = JSON.parse(body);
                let data = body.data.pastAppointment.concat(body.data.upcomingAppointment)
                let dataSource = data.map((book,i)=>{
                    return {
                        title : {
                            editable: false,
                            value: book.titleOrDescription
                        },
                        event_type : book.eventType,
                        book_date : {
                            editable: false,
                            value: dateFormat(book.appointmentDate, 'yyyy-mm-dd')
                        },
                        start_time : {
                            editable: false,
                            value: book.appointmentStartTime,
                        },
                        end_time:  {
                            editable: false,
                            value: book.appointmentEndTime,
                        },
                        book_address : book.appointmentAddress,
                        agent_email : book.agentEmailId,
                        agent_name : book.agentName.firstName + ' ' +  book.agentName.lastName,
                        status: book.appointmentStatus,
                        key: i
                    }
                })

                that.setState({
                    dataSource: dataSource
                })
            }

        })
    }
    handleChange(key, index, value) {
        const { dataSource } = this.state;
        dataSource[index][key].value = value;
        this.setState({ dataSource });
    }
    edit(index) {
        const { dataSource } = this.state;
        Object.keys(dataSource[index]).forEach((item) => {
            if (dataSource[index][item] && typeof dataSource[index][item].editable !== 'undefined') {
                dataSource[index][item].editable = true;
            }
        });
        this.setState({ dataSource });
    }
    editDone(index, type) {
        const { dataSource } = this.state;
        Object.keys(dataSource[index]).forEach((item) => {
            if (dataSource[index][item] && typeof dataSource[index][item].editable !== 'undefined') {
                dataSource[index][item].editable = false;
                dataSource[index][item].status = type;
            }
        });
        this.setState({ dataSource }, () => {
            Object.keys(dataSource[index]).forEach((item) => {
                if (dataSource[index][item] && typeof dataSource[index][item].editable !== 'undefined') {
                    delete dataSource[index][item].status;
                }
            });
        });
    }
    renderColumns(data, index, key, text) {
        const { editable, status } = data[index][key];
        if (typeof editable === 'undefined') {
            return text;
        }
        return (<EditableCell
            editable={editable}
            value={text.value}
            onChange={value => this.handleChange(key, index, value)}
            status={status}
        />);
    }
    render() {
        const dataSource = this.state.dataSource;

        const columns = [{
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            fixed: 'left',
            render: (text, record, index) => this.renderColumns(this.state.dataSource, index, 'title', text),
        }, {
            title: 'Event type',
            dataIndex: 'event_type',
            key: 'event_type',
        },{
            title: 'Book date',
            dataIndex: 'book_date',
            key: 'book_date',
            width: 100,
            render: (text, record, index) => this.renderColumns(this.state.dataSource, index, 'book_date', text),
        },{
            title: 'Start time',
            dataIndex: 'start_time',
            key: 'start_time',
            width: 100,
            render: (text, record, index) => this.renderColumns(this.state.dataSource, index, 'start_time', text),
        },{
            title: 'End time',
            dataIndex: 'end_time',
            key: 'end_time',
            width: 100,
            render: (text, record, index) => this.renderColumns(this.state.dataSource, index, 'end_time', text),
        },{
            title: 'Book address',
            dataIndex: 'book_address',
            key: 'book_address',
        }, {
            title: 'Agent name',
            dataIndex: 'agent_name',
            key: 'agent_name',
            width: 100,
        }, {
            title: 'Agent email',
            dataIndex: 'agent_email',
            key: 'agent_email',
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            sorter: (a, b) => a.status.length  - b.status.length ,
        },{
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,

            render: (text, record, index) => {
                if(dataSource[index].status =='PENDING'){
                    const { editable } = dataSource[index].title;
                    return (
                        <div className="editable-row-operations">
                            {
                                editable ?
                                <span>
                                    <a onClick={() => this.editDone(index, 'save')}>Save</a>
                                    <Popconfirm title="Sure to cancel?" onConfirm={() => this.editDone(index, 'cancel')}>
                                    <a>Cancel</a>
                                    </Popconfirm>
                                </span>
                                            :
                                <span>
                                    <a onClick={() => this.edit(index)}>Edit</a>
                                </span>
                            }
                        </div>
                    );
                }
                else return '';

            },
        }];

        return (
            <div className="choose-address">
                <Layout>
                    <Heade />
                    <Content>
                        <div className="title">
                            <h1>Bookings</h1>
                        </div>

                        <Table dataSource={dataSource} columns={columns} scroll={{ x: 1300 }}/>
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
    .ant-popover.ant-popover-placement-top{
        left: 90% !important
    }
    .editable-row-operations a {
        margin-right: 8px;
    }
`;