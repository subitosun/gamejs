import { htmlNodes, disableControls } from '../utils/helpers.js';

const hideCountDown = () => {
    htmlNodes.countdown.style.display = 'none';
    htmlNodes.countdown.innerHTML = '';

    disableControls(true, false, true);
}

const displayCountDown = (timeLeft) => {
    htmlNodes.countdown.style.display = 'block';
    htmlNodes.countdown.innerHTML = timeLeft;

    disableControls();
}

const CountdownComponent = {
    hideCountDown,
    displayCountDown,
};

export default CountdownComponent;