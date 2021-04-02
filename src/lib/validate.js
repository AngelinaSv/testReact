import validator from 'validator';

import { duplicates } from './Duplicates';

function validateAndTransform(rawRow, parsedObjectMap) {
    const validatedRow = {};
    let age;

    for(const [key, value] of Object.entries(rawRow)) {
        if(key === 'age') {
            age = value;

            validatedRow[key] = {
                value,
                isCorrect: validator.isInt(value, { min: 21 })
            }
        }

        if(key === 'experience') {
            validatedRow[key] = {
                value,
                isCorrect: validator.isInt(value, { min: 0, max: age })
            }
        }

        if(key === 'email') {
            if(!value) {
                throw new Error('Incorrect file');
            }

            const valueLowerCase = value.toLowerCase();
            const duplicatesEmail = duplicates.getEmailDuplicates(valueLowerCase);
            let isCorrect;

            if(duplicatesEmail) {
                duplicatesEmail.push(rawRow.id);
            } else {
                duplicates.addEmail(valueLowerCase, [rawRow.id]);
            }

            if(duplicates.getEmailDuplicates(valueLowerCase).length > 1) {
                // Getting first mentioned validated row that contains duplicate email
                const firstMentionedRow = parsedObjectMap.get(duplicatesEmail[0]);

                // According requirements we update this row only once with current parse row object id 
                if(!firstMentionedRow.email.duplicateWithEmail) {
                    firstMentionedRow.email.duplicateWithEmail = rawRow.id;
                } 
            }

            if(duplicates.getEmailDuplicates(valueLowerCase)[0] && rawRow.id === duplicates.getEmailDuplicates(valueLowerCase)[0]) {
                isCorrect = validator.isEmail(valueLowerCase);
            } else {
                isCorrect = false;
            }

            validatedRow[key] = {
                value,
                isCorrect,
                duplicateWithEmail: duplicates.getEmailDuplicates(valueLowerCase).length > 1 ? duplicates.getEmailDuplicates(valueLowerCase)[0] : null
            }
        }

        if(key === 'phone') {
            if(!value) {
                throw new Error('Incorrect file');
            }

            const valueLowerCase = value.toLowerCase();
            const duplicatesPhone = duplicates.getPhoneDuplicates(valueLowerCase);
            let isCorrect;

            if(duplicatesPhone) {
                duplicatesPhone.push(rawRow.id);
            } else {
                duplicates.addPhone(valueLowerCase, [rawRow.id]);
            }

            if(duplicates.getPhoneDuplicates(valueLowerCase).length > 1) {
                // Getting first mentioned validated row that contains duplicate email
                const firstMentionedRow = parsedObjectMap.get(duplicatesPhone[0]);

                // According requirements we update this row only once with current parse row object id 
                if(!firstMentionedRow.phone.duplicateWithPhone) {
                    firstMentionedRow.phone.duplicateWithPhone = rawRow.id;
                } 
            }

            if(duplicates.getPhoneDuplicates(valueLowerCase)[0] && rawRow.id === duplicates.getPhoneDuplicates(valueLowerCase)[0]) {
                isCorrect = /^\+?1?\d{10}$/.test(value);
            } else {
                isCorrect = false;
            }

            validatedRow[key] = {
                value,
                isCorrect,
                duplicateWithPhone: duplicates.getPhoneDuplicates(valueLowerCase).length > 1 ? duplicates.getPhoneDuplicates(valueLowerCase)[0] : null
            }
        }

        if(key === 'license states') {
            validatedRow[key] = {
                value,
                isCorrect: (/^([A-Z]{2}|([A-Z]{1}[a-z]+)?\|?)+$/.test(value) && value[0] !== '|' && value[value.length - 1] !== '|'),
            }
        }

        if(key === 'expiration date') {
            const currentDate = new Date();
            const expirationDate = new Date(value);

            validatedRow[key] = {
                value,
                isCorrect: (
                    validator.isDate(value, {
                        format: 'YYYY-MM-DD',
                        delimiters: ['-']
                    }) || 
                    validator.isDate(value, {
                        format: 'MM/DD/YYYY',
                        delimiters: ['/']
                    })
                ) && expirationDate.getTime() > currentDate.getTime()
            }
        }

        if(key === 'has children') {
            validatedRow[key] = {
                value,
                isCorrect: value ? validator.isBoolean(value.toLowerCase()) : true
            }
        }

        if(key === 'license number') {
            validatedRow[key] = {
                value,
                isCorrect: /^\w{6}$/.test(value)
            }
        }

        if(key === 'full name') {
            if(!value) {
                throw new Error('Incorrect file');
            }
            validatedRow[key] = {
                value,
                isCorrect: true
            }
        }

        if(key === 'yearly income') {
            validatedRow[key] = {
                value,
                isCorrect: (validator.isDecimal(value, { decimal_digits: 2 }) && value <= 1000000)
            }
        }

        if(key === 'id') {
            validatedRow[key] = value;
        }
    }

    parsedObjectMap.set(rawRow.id, validatedRow);
}

function selectDuplicate(emailDuplicate, phoneDuplicate) {
    if(emailDuplicate && phoneDuplicate) {
        if(emailDuplicate <= phoneDuplicate) {
            return emailDuplicate;
        } else {
            return phoneDuplicate;
        }
    } else {
        return emailDuplicate || phoneDuplicate;
    }
}

export {
    validateAndTransform,
    selectDuplicate,
}
