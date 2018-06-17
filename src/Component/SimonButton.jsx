import React, { Component } from 'react';
import { simonModes } from '../Service/SimonService';
import Tone from 'tone';

const duration = '20n'

export default class SimonButton extends Component {

    constructor() {
        super();
        this.state = { active: false }
        this.synth = new Tone.Synth().toMaster();
    }

    activate(callback) {
        this.synth.triggerAttackRelease(this.props.note, duration)
        this.setState({ active: true },
            () => window.setTimeout(() => this.setState({ active: false }, callback), 150));
    }

    render() {
        const { className, onClick, simonMode } = this.props;
        const activated = this.state.active ? 'activated' : '';

        const onClicked = () => {
            const result = simonMode === simonModes.waitSuccessfullyRepeat
            result && this.activate(() => result && onClick())
        }
        return (
            <div className={`${className} ${activated}`} onClick={onClicked} >
            </div>
        );
    }

}
