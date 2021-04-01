import * as Papa from 'papaparse';

import { validateAndTransform } from './validate';

async function parseCSV(file) {
    return new Promise((res, rej) => {
        const result = new Map();
        let idCounter = 1;

        Papa.parse(file, {
            header: true,
            dynamicTyping: false,
            skipEmptyLines: true,
            step: (chunk, _parser) => {
                const enumerableChunk = {
                    id: idCounter++,
                    ...chunk.data
                };
                validateAndTransform(enumerableChunk, result /* Be careful, mutate this argument */);
            },
            complete: () => {
                res(Array.from(result.values()));
            },
            transform: (value, field) => {
                let result = value;
                result = result.trim();

                return result;
            },
            transformHeader: (header) => header.toLowerCase().trim()
        });
    });
}

export { 
    parseCSV 
};
