const PaymentBasket = (needRole) => {
    let token = localStorage.jwt
    let data = [];

    if(needRole === true) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        let username = JSON.parse(window.atob(base64)).username;
        let rolesToken = JSON.parse(window.atob(base64)).roles;

        data = {username, rolesToken}
        return data;
    } else {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        let username = JSON.parse(window.atob(base64)).username;
        return username;
    }

}

export default PaymentBasket;