import React, {Component} from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {storeGame} from '../actions';
import _ from 'lodash';
import {Redirect} from 'react-router-dom'
class AddGame extends Component {


    state = {
        title:'',
        url:'',
        errors:{},
        done:false

    }
    validate = (form)=> {
        let errors = {}
        if (form.title == '')
        {
            errors.title = 'title not empty'
        }
        if (form.url == '')
        {
            errors.url = 'url not empty'
        }else if(!form.url.match(/\.(jpeg|jpg|gif|png)$/)){
            errors.url = 'url is invalid'
        }

        return {
            isValid: _.isEmpty(errors),
            errors
        }

    }

    handleChange = (e)=>{

        let errors = Object.assign({},this.state.errors)

        delete errors[e.target.name]

        this.setState({[e.target.name]:e.target.value,errors})

    }




    submit = (e)=>{

        e.preventDefault()

        delete this.state.errors
        const {isValid,errors} = this.validate(this.state)

        if(isValid){
            this.props.storeGame(this.state)
                .then(
                    (data)=>{
                        this.setState({done:true,errors:{}})
                    },
                    err=>{
                    }
                )
        }else {
            this.setState({errors})
        }

    }



    render() {
        const Form = (
            <div>
                <form>
                    <h1>Add New Game</h1>
                    <br/>

                    <div className={classNames('pt-form-group',{'pt-intent-danger':!!this.state.errors.title})} >
                        <label className="pt-label">
                            Title
                            <span className="pt-text-muted">(required)</span>
                        </label>
                        <div className="pt-form-content">
                            <div className="pt-input-group">
                                <span className="pt-icon pt-icon-calendar"></span>
                                <input  onChange={this.handleChange} type="text"
                                        className="pt-input"
                                        name="title" id="" placeholder="Input..."/>
                            </div>
                            {this.state.errors.title && <div className="pt-form-helper-text">{this.state.errors.title}</div>}
                        </div>
                    </div>



                    <div className={classNames('pt-form-group',{'pt-intent-danger':!!this.state.errors.url})} >
                        <label className="pt-label">
                            URL
                            <span className="pt-text-muted">(required)</span>
                        </label>
                        <div className="pt-form-content">
                            <div className="pt-input-group">
                                <span className="pt-icon pt-icon-calendar"></span>
                                <input  onChange={this.handleChange} type="text"
                                        className="pt-input"
                                        name="url" id="" placeholder="Input..."/>
                            </div>

                            {this.state.errors.url && <div className="pt-form-helper-text">{this.state.errors.url}</div>}
                            {!(!!this.state.errors.url) && <img  className="img img-responsive thumbnail" src={this.state.url} /> }

                        </div>
                    </div>

                    <button type="button"  onClick={this.submit} className="pt-button pt-icon-add pt-large">Button</button>


                </form>
            </div>
        )

        return (this.state.done) ? <Redirect to={'/games'}/> :Form
    }

}

export default connect(null,{storeGame})(AddGame)
