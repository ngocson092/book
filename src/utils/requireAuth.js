import React from 'react';
import {connect} from 'react-redux';
import {verifyToken} from '../actions/authActions';
import {message} from 'antd';

import {Spin} from 'antd';


export default function (ComposedComponent) {

    class Authenticate extends React.Component {

        state = {
            loading:true
        }

        goTo(route){
            this.props.history.replace(route)
        }


        componentWillReceiveProps() {

            console.log(this.props.isAuthenticated);

            if (this.props.isAuthenticated) {

                verifyToken().then(res=> {




                    this.setState({loading: false})


                }, ({response})=> {

                    if (response.data.error) {
                        message.error('You cannot access this page')
                        this.goTo('/')
                    }

                })

            } else {

                //this.goTo('/login')
            }
        }


        render() {


            return (this.state.loading) ?
                (<div className="loading-wrap">
                    <Spin tip="Loading..."/>
                </div>) :
                (<ComposedComponent {...this.props} />)

        }
    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated,
            user: state.auth.user
        };
    }

    return connect(mapStateToProps, {})(Authenticate);
}
