export const isTokenValid = (token) => {
    if (!token) return false;
    try {
        const payloadBase64 = token.split('.')[1];
        if (!payloadBase64) return false;
        const decodedJson = atob(payloadBase64);
        const payload = JSON.parse(decodedJson);
        const exp = payload.exp;
        
        if (!exp) return false;
        
        if (Date.now() >= exp * 1000) {
            return false;
        }
        return true;
    } catch (e) {
        return false;
    }
};

export const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};
