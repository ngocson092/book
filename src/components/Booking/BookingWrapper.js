import React, {Component} from 'react';
import {Route,Link} from 'react-router-dom'
import {Row, Form} from 'antd';
import {connect} from 'react-redux'
import { Layout, Menu, Icon,Avatar } from 'antd';
import HeaderTop from '../common/Include/HeaderTop'
import Step1 from './ChooseAddress'
import Step2 from './PhotoseshType'
import Step3a from './DetailPhotoseshLight';
import Step4 from './NeedAPhotoSesh';
import Step5 from './photographers';
import Step6 from './BookingReview';
import Success from './Success';
import {logout} from '../../actions/authActions'

const {  Content } = Layout;


class BookingWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div id="booking-wrapper">
                <Route  exact={true}  path={`${this.props.match.url}/`} component={Step1} />
                <Route  exact={true}  path={`${this.props.match.url}/photosesh-type`} component={Step2}/>
                <Route  exact={true}  path={`${this.props.match.url}/photosesh-type/detail`} component={Step3a}/>
                <Route  exact={true}  path={`${this.props.match.url}/need-a-photosesh`} component={Step4}/>
                <Route  exact={true}  path={`${this.props.match.url}/photographers`} component={Step5}/>
                <Route  exact={true}  path={`${this.props.match.url}/booking-review`} component={Step6}/>
                <Route  exact={true}  path={`${this.props.match.url}/success`} component={Success}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fullname:state.auth.user.name.firstName + ' ' + state.auth.user.name.lastName,
        avatar: (state.auth.user.profilePicURL.thumb != '')?state.auth.user.profilePicURL.thumb:''
    }
}
export default connect(mapStateToProps, {logout})(BookingWrapper)



