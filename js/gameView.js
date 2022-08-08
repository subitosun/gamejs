import CountdownComponent from "./components/countdown.js";
import { fieldsCount, roundsCount } from "./config.js";
import { fieldDetails } from "./utils/const.js";
import { htmlNodes } from "./utils/helpers.js";

const drawFields = () => {
    htmlNodes.fieldsWrapper.forEach(wrapper => {
        for (let i = 1; i <= fieldsCount; i++) {
            let field = document.createElement('div');

            field.className = fieldDetails.className;
            field.dataset.index = i;

            wrapper.appendChild(field);
        }
    });
}

const drawRoundsCountSelectOptions = () => {
    for (let i = 1; i <= roundsCount.max; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;

        if (i === roundsCount.default) {
            option.selected = true;
        }

        htmlNodes.roundsSelect.appendChild(option);
    }
}

const disableGameBoard = (disable = true) => {
    if (disable) {
        htmlNodes.board.classList.add('disabled')
    } else {
        htmlNodes.board.classList.remove('disabled')
    }
}

const resetGameBoard = () => {
    const fields = document.querySelectorAll(`.${fieldDetails.className}`);

    fields.forEach(box => {
        box.remove();
    });

    htmlNodes.roundsSelect.innerHTML = '';

    disableGameBoard(true);
}

const runCountDown = (callback) => {
    let timeleft = 2;

    CountdownComponent.displayCountDown(timeleft + 1);

    const countDownTimer = setInterval(() => {
        CountdownComponent.displayCountDown(timeleft);

        if (timeleft < 1) {
            CountdownComponent.hideCountDown();

            clearInterval(countDownTimer);

            if (typeof callback === 'function') {
                callback();
            }
        }

        timeleft -= 1;
    }, 1000);

}

const drawGameBoard = () => {
    resetGameBoard();
    drawRoundsCountSelectOptions();
    drawFields();
}

const GameView = {
    drawGameBoard,
    disableGameBoard,
    runCountDown
};

export default GameView;
