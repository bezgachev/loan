export default class Form {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            loading: 'Loading...',
            success: 'Thanks! We will contact you soon',
            failure: 'Something went wrong...'
        };
        this.path = 'http://localhost:3000/question';
    }

    async postData(url, data) {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
        
        return await res.json();
    }

    clearInputs() {
        this.inputs.forEach(item => {
            item.value = '';
        });
    }

    checkMailInputs() {
        const mailInputs = document.querySelectorAll('[type="email"]');
        mailInputs.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key.match(/[^a-z 0-9 @ \- \.]/ig)) {
                    e.preventDefault();
                }
            });
        });
    }

    initMask() {
        let setCursorPosition = (pos, elem) => {
            elem.focus();
    
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };
    
        function createMask(e) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');
    
            if (def.length >= val.length) {
                val = def;
            }
    
            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });
    
            if (!e.target.hasAttribute('inputmode')) {
                e.target.setAttribute('inputmode', 'numeric');
            }
    
            if (e.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                } else {
                    checkNumberPhone(this);
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }
    
        function checkNumberPhone(e) {
            if (e.value.replace(/\D/g, '').length !== 11) {
                console.log('Номер введен не полностью');
            } else {
                console.log('Номер введен корректно');
            }
        }
    
        let inputs = document.querySelectorAll('[name="phone"]');
    
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
            input.addEventListener('click', createMask);
        });
    
    }

    init() {
        this.checkMailInputs();
        this.initMask();
        this.forms.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `;
                item.parentNode.appendChild(statusMessage);
                statusMessage.textContent = this.message.loading;

                const formData = new FormData(item),
                      json = JSON.stringify(Object.fromEntries(formData.entries()));

                this.postData(this.path, json)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                        setTimeout(() => this.clearInputs(), 2000);
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 6000);
                    });

            });
        });
    }
}