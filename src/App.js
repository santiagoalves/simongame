import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className={'simon'}>
                <div className={'head-button'} onClick={()=> console.log('red')}></div>
                <div className={'rigth-button'} onClick={()=> console.log('blue')}></div>
                <div className={'left-button'} onClick={()=> console.log('green')}></div>
                <div className={'footer-button'} onClick={()=> console.log('yellow')}></div>
            </div>
        );
    }
}

export default App;
