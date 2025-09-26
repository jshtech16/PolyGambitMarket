export function setCookie(name: string, value: any, days: any) {
    let cookieString = name + "=" + value + ";path=/";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        cookieString += ";expires=" + date.toUTCString();
    }
    document.cookie = cookieString;
}

// Get a cookie
export function getCookie(name: string) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        if (cookie[0] === name) {
            return cookie[1];
        }
    }
    return null;
}

// Remove a cookie
export function removeCookie(name: string) {
    setCookie(name, "", -1); // Set the expiration date to the past
}