export function isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

export function getFebDays(year) {
    return isLeapYear(year) ? 29 : 28;
}

export function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
    console.log(`Cookie set: ${name}=${value}, expires in ${days} days`);
    console.log("Current cookies:", document.cookie);
}

export function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) {
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
    }
    return null;
}

export function generateSecretKey(length = 32) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?';
    let secretKey = '';
    const cryptoObj = window.crypto || window.msCrypto;
    if (!cryptoObj) {
        throw new Error("No secure crypto object available");
    }
    const array = new Uint8Array(length);
    cryptoObj.getRandomValues(array);
    for (let i = 0; i < length; i++) {
        secretKey += charset[array[i] % charset.length];
    }
    return secretKey;
}

export function setEncryptedCookie(name, value, days) {
    const encryptedValue = CryptoJS.AES.encrypt(value, 'your-secret-key').toString();
    setCookie(name, encryptedValue, days);
}

export function getEncryptedCookie(name) {
    const encryptedValue = getCookie(name);
    if (encryptedValue) {
        const bytes = CryptoJS.AES.decrypt(encryptedValue, 'your-secret-key');
        return bytes.toString(CryptoJS.enc.Utf8);
    }
    return null;
}

export function changeToCountDown() {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('vi-VN');
    document.querySelector('.date-1').textContent = `Hôm nay: ${formattedDate}`;
}
