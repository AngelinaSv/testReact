class Duplicates {
    constructor () {
        this.phoneCache = new Map();
        this.emailCache = new Map();
    }

    addPhone(key, value) {
        this.phoneCache.set(key, value);
    }

    addEmail(key, value) {
        this.emailCache.set(key, value);
    }

    getPhoneDuplicates(key) {
        return this.phoneCache.get(key);
    }

    getEmailDuplicates(key) {
        return this.emailCache.get(key);
    }
}

export const duplicates = new Duplicates();