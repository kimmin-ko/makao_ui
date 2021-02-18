import {commonJs} from './common.js';

export {Member, memberJs};

class Member {
    #_email;
    #_name;
    #_password;
    #_account;
    #_phoneNumber;
    #_birthDate;

    constructor(email, name, password, account, phoneNumber, birthDate) {
        this.#_email = email;
        this.#_name = name;
        this.#_password = password;
        this.#_account = account;
        this.#_phoneNumber = phoneNumber;
        this.#_birthDate = birthDate;
        this._name = name;
    }

    get email() {
        return this.#_email;
    }

    set email(value) {
        this.#_email = value;
    }

    get name() {
        return this.#_name;
    }

    set name(value) {
        this.#_name = value;
    }

    get password() {
        return this.#_password;
    }

    set password(value) {
        this.#_password = value;
    }

    get account() {
        return this.#_account;
    }

    set account(value) {
        this.#_account = value;
    }

    get phoneNumber() {
        return this.#_phoneNumber;
    }

    set phoneNumber(value) {
        this.#_phoneNumber = value;
    }

    get birthDate() {
        return this.#_birthDate;
    }

    set birthDate(value) {
        this.#_birthDate = value;
    }

    toString() {
        return `\nemail: ${this.#_email}, \nname: ${this.#_name}, \npassword: ${this.#_password}, \naccount: ${this.#_account}, \nphoneNumber: ${this.#_phoneNumber}, \nbirthDate: ${this.#_birthDate}`;
    }

    toObject() {
        return {
            email: this.#_email,
            name: this.#_name,
            password: this.#_password,
            account: this.#_account,
            phoneNumber: this.#_phoneNumber,
            birthDate: this.#_birthDate
        }
    }
}

const memberJs = (function () {

    const MEMBER_PATH = '/api/members';
    const MEMBER_OPEN_PATH = '/open/api/members';

    const checkEmail = function (email) {
        return fetch(MEMBER_OPEN_PATH + `/exists/email/${email}`, {
            method: 'GET'
        })
            .then(response => {
                console.log(response);
                if (response.ok)
                    return response.json();
                else {
                    alert('이메일 확인 중 예기치 못한 오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.');
                    commonJs.errorLog(response);
                    return null;
                }
            });
    };

    const checkAccount = function (account) {
        return fetch(MEMBER_OPEN_PATH + `/exists/account/${account}`, {
            method: 'GET'
        }).then(response => {
            if (response.ok)
                return response.json()
            else {
                alert('계정 확인 중 예기치 못한 오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.');
                commonJs.errorLog(response);
                return null;
            }
        });
    };

    const join = function (member) {
        console.log(`member: ${member.toString()}`);

        return fetch(MEMBER_OPEN_PATH, {
            method: 'POST',
            body: JSON.stringify(member.toObject()),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(response.ok)
                return response.json()
        });
    };

    return {
        checkEmail,
        checkAccount,
        join
    };

})();