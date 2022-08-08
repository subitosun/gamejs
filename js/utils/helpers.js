import { fieldDetails } from "./const.js";

export const htmlNodes = {
    alertContainer: document.querySelector("#alert"),
    countdown: document.querySelector("#countdown"),
    roundsSelect: document.querySelector("#rounds"),
    startBtn: document.querySelector("#start"),
    resetBtn: document.querySelector("#reset"),
    fieldsWrapper: document.querySelectorAll(".fields"),
    fields: document.querySelectorAll(`.${fieldDetails.className}`),
    pattern: document.querySelector("#pattern"),
    board: document.querySelector("#board"),
};

export const getSelectedRoundsCountValue = () =>
    htmlNodes.roundsSelect.options[htmlNodes.roundsSelect.selectedIndex].value;


export const isBoardField = (event) =>
    // event.target && event.target?.parentNode === htmlNodes.board;
    event.target && event.target.classList.contains(fieldDetails.className)


/**
 * Disable or enable game controls
 * 
 * @param {bool} startBtn 
 * @param {bool} resetBtn 
 * @param {bool} roundsSelect 
 */
export const disableControls = (startBtn = true, resetBtn = true, roundsSelect = true) => {
    htmlNodes.startBtn.disabled = startBtn;
    htmlNodes.resetBtn.disabled = resetBtn;
    htmlNodes.roundsSelect.disabled = roundsSelect;
}