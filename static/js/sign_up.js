import {Member, memberJs} from './member.js';

let validEmail = false;
let validAccount = false;

const emailInput = document.querySelector('#email');
const nameInput = document.querySelector('#name');
const pwInput = document.querySelector('#password');
const pwConfirmInput = document.querySelector('#password-confirm');
const accountInput = document.querySelector('#account');
const phoneNumberInput = document.querySelector('#phoneNumber');
const birthDateInput = document.querySelector('#birthDate');

document.querySelector('#check-email').addEventListener('click', _ => {
    checkEmail(emailInput.value)
        .then(data => {
            console.log('data: ' + data);
            if (!data) return;

            if (data.exists) {
                validEmail = false;
                alert('이미 존재하는 이메일입니다.\n다시 입력해 주세요.');
            } else {
                validEmail = confirm('사용 가능한 이메일입니다.\n사용 하시겠습니까?');
            }
        });
});

emailInput.addEventListener('keyup', _ => {
    validEmail = false;
});

document.querySelector('#check-account').addEventListener('click', _ => {
    checkAccount(accountInput.value)
        .then(data => {
            if (!data) return;

            if (data.exists) {
                validAccount = false;
                alert('이미 존재하는 계정입니다.\n다시 입력해 주세요.');
            } else {
                validAccount = confirm('사용 가능한 계정입니다.\n사용 하시겠습니까?');

            }
        });
});

accountInput.addEventListener('keyup', _ => {
    validAccount = false;
});

document.querySelector('#join-btn').addEventListener('click', async _ => {
    if (!emailInput.value) {
        alert('이메일을 입력해 주세요.');
        emailInput.focus();
        return;
    } else if (!validEmail) {
        alert('이메일 중복체크는 필수입니다.');
        return;
    } else if (!pwInput.value) {
        alert('비밀번호를 입력해 주세요.');
        pwInput.focus();
        return;
    } else if (!pwConfirmInput.value) {
        alert('비밀번호 확인을 입력해 주세요.');
        pwConfirmInput.focus();
        return;
    } else if (!checkPassword()) {
        alert('입력하신 비밀번호를 다시 확인해주세요.');
        pwInput.focus();
        return;
    } else if (!accountInput.value) {
        alert('계정을 입력해 주세요.');
        accountInput.focus();
        return;
    } else if (!validAccount) {
        alert('계정 중복체크는 필수입니다.');
        return;
    }

    const member = new Member(emailInput.value, nameInput.value, pwInput.value, accountInput.value, phoneNumberInput.value, birthDateInput.value);
    const response = await memberJs.join(member);

    console.log(response);
    location.href = '/loginForm';
});
async function checkEmail(email) {
    if (!email) {
        alert('이메일을 입력해 주세요.');
        return;
    } else if (!email.includes('@')) {
        alert('올바른 이메일 형식이 아닙니다.');
        return;
    }

    const response = await memberJs.checkEmail(email);

    if(!response) return;

    return response.data;
}

async function checkAccount(account) {
    if (!account) {
        alert('계정을 입력해 주세요.');
        return;
    }

    const response = await memberJs.checkAccount(account);

    if(!response) return;

    return response.data;
}

function checkPassword() {
    return pwInput.value === pwConfirmInput.value;
}