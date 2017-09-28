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


        componentWillMount(){

            if (!localStorage.access_token) {
                this.goTo('/login')
            }else{

                /*
                * when already access_token from localstorage
                * next, check authenticated from verify token (localStoragaLoad.js)
                *
                * */


                if(typeof  this.props.isAuthenticated != 'undefined' && this.props.isAuthenticated){
                    this.setState({loading:false})
                }
            }
        }

        componentWillReceiveProps(props){
            if(props.isAuthenticated){
                this.setState({loading:false})
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
