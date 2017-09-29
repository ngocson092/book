import React, {Component} from 'react'
import {Form,Input,Button,Upload,message,Icon} from 'antd';
import {updateProfile} from '../../../../actions/userActions'
import axios from 'axios'
import PropTypes from 'prop-types';
const FormItem = Form.Item;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

class EditProfileForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: {},
            loading:false,

        }
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, inputs) => {
            if (!err) {
                this.setState({
                    loading:true
                })

                let data = new FormData();

                Object.keys(inputs).forEach((key)=>{
                    data.append(key,inputs[key]);
                })

                updateProfile(data)
                .then(res=>{
                    this.setState({ loading: false });
                },({response})=>{
                    this.setState({ loading: false });
                })
            }
        });
    }
    handleChangeAvatar = (info) => {
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
        }
    }

    render() {
        const imageUrl = this.state.imageUrl;
        const {getFieldDecorator} = this.props.form;



        return (
            <Form style={{maxWidth:500}} onSubmit={this.handleSubmit}>

                <p style={{
                    padding: 10,
                    background: "#ddd",
                    marginBottom: 10
                }}>Email : {this.props.user.email}</p>

                <FormItem
                    label="First Name"
                    hasFeedback
                >
                    {getFieldDecorator('firstName', {
                        rules: [{
                            required: true, message: 'First Name is not empty',
                        },
                        ],
                        initialValue: this.props.user.name.firstName
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>
                <FormItem
                    label="Last Name"
                    hasFeedback
                >
                    {getFieldDecorator('lastName', {
                        rules: [{
                            required: true, message: 'Last Name is not empty',
                        }
                        ],
                        initialValue: this.props.user.name.lastName
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>

                <FormItem
                    label="Address"
                    hasFeedback
                >
                    {getFieldDecorator('address', {
                        rules: [],
                        initialValue: (this.state.user.address != '') ? this.state.user.address : ''
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>
                <FormItem
                    label="Phone"
                    hasFeedback
                >
                    {getFieldDecorator('phone', {
                        rules: [],
                        initialValue: (this.props.user.phone != '') ? this.props.user.phone : ''
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>

                <FormItem
                    label="Avatar"
                    hasFeedback
                >
                    <Upload
                        className="avatar-uploader"

                        style={{
                            width: 150,
                            height: 150,
                            display: "block",
                            border: "1px dashed #d9d9d9",
                            borderRadius: 6,
                            cursor: "pointer"
                        }}

                        name="avatar"
                        showUploadList={false}
                        action="//jsonplaceholder.typicode.com/posts/"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChangeAvatar}
                    >
                        {
                            imageUrl ?
                                <img src={imageUrl} alt="" className="avatar"    style={{
                                    width: 150,
                                    height: 150
                                }} /> :
                                <Icon type="plus" className="avatar-uploader-trigger"    style={{
                                    width: 150,
                                    height: 150,
                                    display: "table-cell",
                                    verticalAlign: "middle",
                                    fontSize: 28,
                                    color: "#999"
                                }} />
                        }
                    </Upload>
                </FormItem>

                <Button
                    type="primary"
                    htmlType="submit"

                    icon="save"
                    loading={this.state.loading}
                >
                    Save
                </Button>


            </Form>
        )
    }
}

EditProfileForm.propTypes = {
    user: PropTypes.object.isRequired
}




export default Form.create()(EditProfileForm);
