import React, {Component} from 'react';
import {connect} from 'react-redux'
import ChangePasswordForm from './Include/ChangePasswordForm'

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    goTo(route) {
        this.props.history.replace(`${route}`)
    }


    render() {

        return (
            <div>
                <h2 className="head-title">Change Password</h2>
                <ChangePasswordForm />
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {

    }
}
export default connect(mapStateToProps, {})(ChangePassword)



