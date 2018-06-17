import React, { Component } from 'react';
import './App.css';
import SimonButton from './Component/SimonButton'
import SimonService, { buttons, simonModes, notes } from './Service/SimonService'
import Tone from 'tone'

class App extends Component {

    constructor() {
        super();
        this.state = {
            currentSimonMode: simonModes.waitStart,
            disabled: false
        }

        console.log(this.state.aaaa)
        this.synth = new Tone.Synth().toMaster()
        buttons.forEach(button => this[button] = React.createRef())
    }

    componentDidMount() {
        const buttonRefs = {};
        buttons.forEach(button => buttonRefs[button] = this[button].current);
        SimonService.init(buttonRefs);
    }

    render() {

        const { currentSimonMode } = this.state

        const onStart = () => {
            const playingMode = { currentSimonMode: simonModes.playing }

            SimonService.afterRepeatPlayedButtons = () => {
                this.setState({ currentSimonMode: simonModes.waitSuccessfullyRepeat })
            }

            SimonService.afterPlayerSuccessfullyRepeat = () => {
                debugger
                this.setState(playingMode, SimonService.start)
            }

            SimonService.whenFailedToRepeat = () => {
                this.setState({ disabled: false, currentSimonMode: simonModes.waitStart }, () => {
                    window.alert('Você não conseguiu repetir corretamente')
                })
            }
            this.setState({ disabled: true, ...playingMode }, SimonService.start)
        }

        return (
            <div>
                <div className={'simon'}>
                    {
                        buttons.map((button, index) =>
                            (<SimonButton key={index} className={`${button}-button`}
                                ref={this[button]} simonMode={currentSimonMode} note={notes[index]}
                                onClick={() => SimonService.clickedButton(this[button].current)} />)
                        )
                    }
                </div>
                <hr />
                <br />
                <button type={'button'} disabled={this.state.disabled} onClick={onStart}>Start</button>
            </div>
        )
    }
}

export default App;