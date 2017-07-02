import React,{Component} from 'react'
import {connect} from 'react-redux'
import { storeGame } from '../actions';

class AddGame extends Component{

    render(){
        return (
            <div>
                <form action="" method="post" role="form">
                    <legend>Add New Game</legend>

                    <div className="form-group">
                        <label for="">Title</label>
                        <input type="text" className="form-control" name="title" id="" placeholder="Input..."/>

                    </div>
                    <div className="form-group">
                        <label for="">Url</label>
                        <input type="text" className="form-control" name="url" id="" placeholder="Input..."/>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>

                </form>
            </div>
        )
    }

}

export default AddGame