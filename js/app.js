import {
    htmlNodes,
    getSelectedRoundsCountValue,
    disableControls,
    isBoardField,
} from "./utils/helpers.js";
import { alertType, fieldDetails } from "./utils/const.js";
import AlertComponent from "./components/alert.js";
import Translations from "./translations.js";
import GameView from "./gameView.js";
import Game from "./game.js";
import { fieldsCount, roundsCount } from "./config.js";

const state = {
    game: null,
    canUserPlay: false
};

GameView.drawGameBoard();

htmlNodes.startBtn.addEventListener("click", e => {
    e.preventDefault();

    const selectedRoundsCount = getSelectedRoundsCountValue();

    if (selectedRoundsCount < roundsCount.min || selectedRoundsCount > roundsCount.max) {
        AlertComponent.displayAlert(alertType.warning, Translations.app_alert_error_incorrect_rounds_count_message);
    } else {
        startGame();
    }
});

htmlNodes.resetBtn.addEventListener("click", e => {
    e.preventDefault();

    GameView.drawGameBoard();

    disableControls(false, false, false);

    state.canUserPlay = false;
});

const startGame = () => {
    const selectedRoundsCount = getSelectedRoundsCountValue();

    state.game = new Game(selectedRoundsCount, fieldsCount);

    state.game.buildGame();

    GameView.runCountDown(() => {
        state.game.runGameStep(
            () => {
                GameView.disableGameBoard();

                state.canUserPlay = false;
            },
            () => {
                GameView.disableGameBoard(false);

                state.canUserPlay = true;
            }
        );
    });
}

htmlNodes.board.addEventListener('click', (e) => {
    if (state.canUserPlay && isBoardField(e)) {
        const isClickCorrect = state.game.decideMatch(e.target.dataset.index);

        if (state.game.success()) {
            AlertComponent.displayAlert(alertType.success, Translations.app_alert_success_game_completed);

            state.canUserPlay = false;

            return;
        }

        if (isClickCorrect) {
            state.game.runGameStep(
                () => {
                    GameView.disableGameBoard();

                    state.canUserPlay = false;
                },
                () => {
                    GameView.disableGameBoard(false);

                    state.canUserPlay = true;
                }
            );

            return;
        }

        if (false === isClickCorrect) {
            state.game.gameOver();

            GameView.disableGameBoard();

            state.canUserPlay = false;

            AlertComponent.displayAlert(alertType.danger, Translations.app_alert_error_incorrect_answer);
        }
    }
});

htmlNodes.board.addEventListener('mousedown', (e) => {
    if (!state.canUserPlay) {
        return;
    }

    e.target.classList.add('highlighted');
});

document.addEventListener('mouseup', (e) => {
    if (!state.canUserPlay) {
        return;
    }

    htmlNodes.board.querySelectorAll(".highlighted").forEach(highlightedField => {
        highlightedField.classList.remove('highlighted');
    });
});
