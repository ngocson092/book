import React, {Component} from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {storeGame} from '../actions';
import _ from 'lodash';

class AddGame extends Component {


    state = {
        title:'',
        url:'https://www.w3schools.com/css/trolltunga.jpg',
        errors:{}

    }

    handleChange = (e)=>{

        this.setState({[e.target.name]:e.target.value})

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

    submit = (e)=>{

        e.preventDefault()

        delete this.state.errors
        const {isValid,errors} = this.validate(this.state)


        if(isValid){
            this.props.storeGame(this.state)
        }else {
            this.setState({errors})
        }

    }



    render() {
        return (
            <div>
                <form action="" method="post" role="form">
                    <legend>Add New Game</legend>

                    <div className= {classNames('form-group ',{'has-error':!!this.state.errors.title})}>
                        <label>Title</label>
                        <input  onChange={this.handleChange} type="text" className="form-control" name="title" id="" placeholder="Input..."/>
                        {this.state.errors.title != '' && <div className="error">{this.state.errors.title}</div>}
                    </div>
                    <div className= {classNames('form-group ',{'has-error':!!this.state.errors.url})}>
                        <label>Url</label>
                        <input onChange={this.handleChange}  type="text" className="form-control" name="url" id="" placeholder="Input..."/>
                        {this.state.errors.url != '' && <div className="error">{this.state.errors.url}</div>}
                        {this.state.url != '' && <img  className="img img-responsive thumbnail" src={this.state.url} /> }
                    </div>
                    <button type="submit"
                            onClick={this.submit}
                            className="btn btn-primary">Submit</button>

                </form>
            </div>
        )
    }

}
const mapStateToProps = (state)=>{
    return {}
}

export default connect(mapStateToProps,{storeGame})(AddGame)
