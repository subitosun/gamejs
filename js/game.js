import { fieldDetails } from "./utils/const.js";

export default class Game {
    constructor (roundsCount = 1, elementsCount = 1) {
        this.roundsCount = roundsCount;         // number of rounds in the game
        this.elementsCount = elementsCount;     // number of fields on the game board
        this.drawnFields = [];                  // drawn fields indexes
        this.currentHighlightFieldIndex = 0;    // highlighted field index
        this.clickEventIndex = 0;               // click event index in each round
        this.currentRound = 0;                  // current game round
        this.lastMatchDecision = false;         // last round click success
    }

    resetGame() {
        this.drawnFields = [];
        this.currentHighlightFieldIndex = 0;
        this.clickEventIndex = 0;
        this.currentRound = 0;
    }

    buildGame() {
        this.resetGame();

        this.drawnFields = Array.from(
            { length: this.roundsCount },
            () => Math.floor(Math.random() * (this.elementsCount - 1 + 1)) + 1
        );

        /**
         * console.log on purpose to make it easier 
         * to check the numbers drawn on game start
         */
        console.log('this.drawnFields', this.drawnFields);
    }

    runGameStep(beforeHighlightingCallback, afterHighlightingCallback) {
        this.currentHighlightFieldIndex = 0;
        this.clickEventIndex = 0;

        ++this.currentRound;

        if (typeof beforeHighlightingCallback === 'function') {
            beforeHighlightingCallback();
        }

        this.highlightRoundElements(afterHighlightingCallback);
    }

    highlightRoundElements(afterHighlightingCallback) {
        let i = 0;

        const highlightTimer = setInterval(() => {
            this.unhighlightElements();

            if (i % 2) {
                const element = document.querySelector(`[data-index="${this.drawnFields[this.currentHighlightFieldIndex]}"]`);

                element?.classList?.add('highlighted');
            }

            if (this.currentHighlightFieldIndex >= this.currentRound) {
                clearInterval(highlightTimer);

                this.unhighlightElements();

                if (typeof afterHighlightingCallback === 'function') {
                    afterHighlightingCallback();
                }
            }

            if (i % 2) {
                ++this.currentHighlightFieldIndex;
            }

            ++i;
        }, 500);
    }

    highlightLastStepElements(limitToCurrentStep = false) {
        for (let i = 0; i <= this.currentRound; i++) {
            if (limitToCurrentStep && i >= this.currentRound) {
                break;
            }

            const element = document.querySelector(`[data-index="${this.drawnFields[i]}"]`);

            element?.classList?.add('highlighted');
        }
    }

    unhighlightElements() {
        const elements = document.querySelectorAll(`.${fieldDetails.className}`);

        elements.forEach(element => {
            element.classList.remove('highlighted');
        });
    }

    decideMatch(index) {
        ++this.clickEventIndex;
        this.lastMatchDecision = false;

        if (parseInt(index) !== parseInt(this.drawnFields[this.clickEventIndex - 1])) {
            return false;
        }

        if (this.clickEventIndex === this.currentRound) {
            this.lastMatchDecision = true;

            return true;
        }

        return;
    }

    success() {
        if (this.lastMatchDecision && this.currentRound === this.drawnFields.length) {
            this.highlightLastStepElements();

            return true;
        }

        return false;
    }

    gameOver() {
        this.currentHighlightFieldIndex = 0;

        this.highlightRoundElements(() => {
            this.highlightLastStepElements(true);

            this.resetGame();
        });
    }
}