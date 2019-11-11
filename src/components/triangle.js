import React, { Component } from 'react';

class Triangle extends Component {

    constructor(props) {
        super(props);

        this.state = {
           side_1: '',
           side_2: '',
           side_3: '',

           side_1_error: false,
           side_2_error: false,
           side_3_error: false,

           button_disable: true,

           show_output: false,

           triangle: '',
           show_triangle: false,
           invalid_triangle: false

        }
    }

    onFormSubmit(event){
        event.preventDefault();
        var side_1 = parseFloat(this.state.side_1);
        var side_2 = parseFloat(this.state.side_2);
        var side_3 = parseFloat(this.state.side_3);
        if (side_1 + side_2 > side_3 && side_1 + side_3 > side_2 && side_3 + side_2 > side_1){
            if (side_1 === side_2 && side_2 === side_3){
                this.setState({triangle: 'Equilateral',  show_triangle: true, invalid_triangle: false})
            }else if(side_1 === side_2 || side_1 === side_3 || side_2 === side_3){
                this.setState({triangle: 'Isosceles', show_triangle: true, invalid_triangle: false})
            }else{
                this.setState({triangle: 'Scalene',  show_triangle: true, invalid_triangle: false})
            }
        }else{
            this.setState({invalid_triangle: true, show_triangle: false})
        }
    }

    async handleSideChange_1(event){
        if (!event.target.value.match(/^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/)){
            this.setState({side_1_error: true, button_disable: true})
        }else{
            this.setState({side_1_error: false})
        }
        await this.setState({side_1: event.target.value})
        this.check_button_state()
    }

    async handleSideChange_2(event){
        if (!event.target.value.match(/^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/)){
            this.setState({side_2_error: true, button_disable: true})
        }else{
            this.setState({side_2_error: false})
        }
        await this.setState({side_2: event.target.value})
        this.check_button_state()
    }

    async handleSideChange_3(event){
        if (!event.target.value.match(/^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/)){
            this.setState({side_3_error: true, button_disable: true})
        }else{
            this.setState({side_3_error: false})
        }
        await this.setState({side_3: event.target.value})
        this.check_button_state()
    }

    check_button_state(){
        if (this.state.side_1 && this.state.side_2 && this.state.side_3 && !this.state.side_1_error && !this.state.side_2_error && !this.state.side_3_error){
            this.setState({button_disable: false})
        }
    }

    render(){
        return (
            <div className="container">
                <h4 style={{color: 'blue'}}> This function takes in the length of the triangle's sides and </h4>
                <h4 style={{color: 'blue'}}> returns the type of the triangle(equilateral, isosceles or scalene) </h4>
                <p style={{color: 'blue'}}> All fields are live-checked so that you cannot submit until your input format is correct</p>
                <form onSubmit={this.onFormSubmit.bind(this)}>

                    <div className="form-group">
                        <label><b>Enter First Side:</b></label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Enter First Side:" 
                            value={this.state.side_1} 
                            onChange={this.handleSideChange_1.bind(this)}>
                        </input>
                        <small className="form-text text-muted">Please enter a non-negative integar or float number (e.g., 12, 1.3, 1.68).</small>
                    </div>

                    {this.state.side_1_error && <div style={{color: 'red'}}> Invalid input. The input has to be a non-negative integer or a float number </div>}

                    <div className="form-group">
                        <label><b>Enter Second Side: </b></label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Enter Second Side:" 
                            value={this.state.side_2} 
                            onChange={this.handleSideChange_2.bind(this)}>
                        </input>
                        <small className="form-text text-muted">Please enter a non-negative integar or float number (e.g., 12, 1.3, 1.68).</small>
                    </div>

                    {this.state.side_2_error && <div style={{color: 'red'}}> Invalid input. The input has to be a non-negative integer or a float number </div>}

                    <div className="form-group">
                        <label><b>Enter Third Side: </b></label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Enter Third Side:" 
                            value={this.state.side_3} 
                            onChange={this.handleSideChange_3.bind(this)}>
                        </input>
                        <small className="form-text text-muted">Please enter a non-negative integar or float number (e.g., 12, 1.3, 1.68).</small>
                    </div>

                    {this.state.side_3_error && <div style={{color: 'red'}}> Invalid input. The input has to be a non-negative integer or a float number </div>}

                    <button 
                       className="btn btn-primary" 
                       disabled = {this.state.button_disable}
                    > 
                           Submit 
                    </button>
                </form>

                { this.state.show_triangle && <h2 style={{color: 'blue', marginTop: '20px'}}> {this.state.triangle} triangle</h2>}

                { this.state.invalid_triangle && <h2 style={{color: 'red', marginTop: '20px'}}>This is not a valid triangle</h2>}

            </div>
        )
    }
}

export default Triangle