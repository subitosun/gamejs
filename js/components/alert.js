import { htmlNodes } from '../utils/helpers.js';
import { alertType } from '../utils/const.js';
import Translations from '../translations.js';

const hideAlert = () => {
    htmlNodes.alertContainer.style.zIndex = '-10';
    htmlNodes.alertContainer.style.opacity = '0';
    htmlNodes.alertContainer.innerHTML = '';
    htmlNodes.alertContainer.className = '';
}

const displayAlert = (type = alertType.info, message = Translations.app_alert_error_message) => {
    htmlNodes.alertContainer.style.zIndex = '10';
    htmlNodes.alertContainer.className = type;
    htmlNodes.alertContainer.style.opacity = '1';
    htmlNodes.alertContainer.innerHTML = `<p>${message}</p>`;

    setTimeout(
        () => {
            hideAlert();
        },
        3000
    );
}

const AlertComponent = {
    hideAlert,
    displayAlert,
};

export default AlertComponent;
