import { statesList } from './statesList';

function transformStates(str) {
    const licenseStates = str.split('|');

    const abbreviatedLicenseStates = licenseStates.map((state) => {
        if(state.length > 2) {
            return statesList[state] ? statesList[state] : state;
        } else {
            return state;
        }
    });

    return abbreviatedLicenseStates.join(', ');
}

function transformHeaders(headers) {
    const headersWithCapitalLetter = headers.map((header) => {
        if(header === 'id') {
            return header.toUpperCase();
        } else {
            return header.replace(header[0], header[0].toUpperCase());
        }
    });
    headersWithCapitalLetter.push('Duplicate with');

    return headersWithCapitalLetter;
}

export {
    transformStates,
    transformHeaders,
}