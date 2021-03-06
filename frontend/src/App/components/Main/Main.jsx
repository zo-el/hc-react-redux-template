import React from 'react';
import { connect } from 'react-redux';
import Header from '../common/Header';
import Footer from '../common/Footer';
import './Main.css';
import { NEW_LIST_ENTRY } from '../../ducks/data';

class Main extends React.Component{
    constructor(props) {
        super(props);
        // Local componen't state necessary for React's Controlled Components (<input>)
        this.state = {
            item: '',
            keys: []
        };

        // binding functions for React's Controlled Components (<input>)
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handler of <input> onChange (for React's Controlled Components Pattern)
    handleInputChange(e) {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        });
    }

    // handler of <form> onSubmit (for React's Controlled Components Pattern)
    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.item, this.props.list.length);
        this.setState({item: ''});
    }

    printCheck(i) {
        if(i === 2) 
            return <div className="checkmark" title="Message saved in DHT">&#x2611;</div>
        else if(i === 1)
            return <div className="checkmark" title="Message sent to DHT">&#x2610;</div>
        else 
            return <div className="checkmark red" title="Message sending failed">!</div>
    }

    render(){
        return (
            <div>
                <Header {...this.props.user}/>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 m-auto highlight">
                            <div className="counter-container">
                                <div className="counter-number text-center">{this.props.list.length}</div>
                                <div className="input-container">
                                    <form onSubmit={this.handleSubmit}>
                                        <fieldset>
                                            <div className="form-group">
                                                <input 
                                                    className="form-control" 
                                                    type="text" 
                                                    name="item"
                                                    placeholder="Type produce name" 
                                                    value={this.state.item} 
                                                    onChange={this.handleInputChange}
                                                    autoComplete="off"
                                                />
                                                <small className="form-text text-muted">Enter items for shopping list</small>
                                            </div>
                                            <button type="submit" className="btn btn-primary">&rarr;</button>
                                        </fieldset>
                                    </form>
                                </div>
                                <ul className="list-group">
                                    {this.props.list.map(
                                        (e, i) => <li className="list-group-item" key={i}>{e.text}{this.printCheck(e.status)}</li> 
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        )
    };
}

// Mapping of Redux state to Component's props
const mapStateToProps = ( state ) => {
    return {
        list: state.data.list,
        user: state.data.user
    }
};

// Functions dispatching Redux actions for later consumption by middleware and reducers
// Those functions are passed to Component as props with help of connect() below
const mapDispatchToProps = ( dispatch ) => {
    
    return {
        onSubmit: (val, i) => {
            dispatch({
                type: NEW_LIST_ENTRY,
                payload: {entryID: i, text:val, status: 0}
            });
        }
    }
}

// Actual maping of Redux components to React props for "Main" component
export default connect (
    mapStateToProps, 
    mapDispatchToProps
)(Main);