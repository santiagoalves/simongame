
export const buttons = ['head', 'rigth', 'left', 'footer'];

export const simonModes = {
    waitStart: 0,
    playing: 1,
    waitSuccessfullyRepeat: 2
}

export const notes = ['a3', 'b3', 'c4', 'd4']

const randomButton = buttonsRef => {
    const max = 3, min = 0;
    let button = Math.floor(Math.random() * (max - min + 1)) + min
    return buttonsRef[buttons[button]]
}

const _this = {
    buttons: [],
    buttonsPlayed: [],
    clickCount: 0
}

export default class SimonService {

    static init(buttons) {
        _this.buttons = buttons;
    }

    static start() {
        let count = 0;
        let intervalCode = 0;
        const { buttonsPlayed, buttons } = _this;
        buttonsPlayed.push(randomButton(buttons))
        const callback = () => {
            if (count < buttonsPlayed.length) {
                buttonsPlayed[count++].activate();
            } else {
                window.clearInterval(intervalCode);
                _this.clickCount = count = 0;
                SimonService.afterRepeatPlayedButtons()
            }
        }
        intervalCode = window.setInterval(callback, 1000);
    }

    static clickedButton(buttonClicked) {
        if (_this.buttonsPlayed[_this.clickCount++] !== buttonClicked) {
            _this.buttonsPlayed = []
            SimonService.whenFailedToRepeat()
            return
        }
        if (_this.clickCount === _this.buttonsPlayed.length) {
            SimonService.afterPlayerSuccessfullyRepeat()
        }
    }

}