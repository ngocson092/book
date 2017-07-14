import React, {Component} from 'react'
const LENGTH_OF_IMAGES = 3

class Thumbnail extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        active:null,
        next: null
    }

    componentDidMount() {
        let images = this.props.images,
            active = images[0],
            next = images[1]
        this.setState({active, next})
    }

    changeImage = () => {
        let images = this.props.images
        let {active,next} = this.state

        let indexActive = images.indexOf(active)

        if( indexActive == (LENGTH_OF_IMAGES-1)){
            active = images[0]
            next = images[1]
        }else{
            active = images[++indexActive]

            if(indexActive == (LENGTH_OF_IMAGES-1)){
                next = images[0]
            }else {
                next = images[++indexActive]

            }
        }

        this.setState({active,next})
    }


    render() {
        return(
            <div className="thumbnail">
                <img width="100%" src={this.state.active}/>
                <span className="icon" onClick={this.changeImage}>
                    <img width="100%" src={this.state.next}/>
                </span>
            </div>
        );
    }


}

export default Thumbnail