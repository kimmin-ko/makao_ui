import {Member, memberJs} from './member.js';

document.querySelector('#login-btn').addEventListener('click', _ => {
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    loginJs.login(email, password);
});

const loginJs = (function () {

    const login = function (email, password) {
        return fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        }).then(response => {
            if (response.ok) {
                localStorage.setItem('refreshToken', response.headers.get('refresh-token'));

                location.href = '/home';
            } else if (response.status === 403 || response.status === 401) {
                document.querySelector('#login-guide').innerHTML = '아이디 혹은 비밀번호가 일치하지 않습니다. 다시 확인해 주세요.';
            } else {
                console.log('알 수 없는 오류');
                console.warn(response);
            }
        });
    };

    return {login};

})();