function validateInputList() {
  const inputEl = document.querySelectorAll('.group-valid .input-valid');

  Array.from(inputEl).forEach((item, index) => {
    item.addEventListener('input', (e) => {
      const el = e.target;
      const type = el.getAttribute('type');
      const ruleText = (el.value.length < 3 || el.value.length > 10);
      const ruleEmail = (!el.value.match(/^[\.\w_-]+@[a-z]+\.[a-z]{2,3}$/i));
      const rulePwd = (!el.value.match(/(?=.*?[A-Z])(?=(.*[\W]){1,})(?!.*\s).{8,}$/g));
      const msg =  __getMessage(type);
      
      if (type === 'text') {
        ruleText ? __createMessageBox(el, index, msg) : __deleteMessageBox(el, index);
      }
      if (type === 'email') {
        ruleEmail ? __createMessageBox(el, index, msg) : __deleteMessageBox(el, index);
      }
      if (type === 'password') {
        rulePwd ? __createMessageBox(el, index, msg) : __deleteMessageBox(el, index);
        __createPasswordBar(el);
        __modifyColorPasswordBar(el, rulePwd);
      }
      __comparePasswords(index);
    });
  });
}

function __createMessageBox(el, index, msg) {
  if (document.getElementById(`box-valid-${index}`)) {
    document.getElementById(`box-valid-${index}`).classList.remove('d-none');
    __toggleTwoClass(el, 'border-validated-valid', 'border-error-valid');
    return false;
  }

  let div = document.createElement('div');
  let p = document.createElement('p');

  div.classList.add('box-valid');
  div.setAttribute('id', `box-valid-${index}`);
  p.classList.add('msg-valid');
  p.textContent = msg;
  div.append(p);
  el.after(div);

  __toggleTwoClass(el, 'border-validated-valid', 'border-error-valid');
}

function __deleteMessageBox(el, index) {
  if (!document.getElementById(`box-valid-${index}`)) return false;

  const child = document.getElementById(`box-valid-${index}`);
  (child && !child.classList.contains('d-none')) && child.classList.add('d-none');

  __toggleTwoClass(el, 'border-error-valid', 'border-validated-valid');
}

function __comparePasswords(index) {
  if (!document.querySelectorAll('.input-valid[type="password"]')[0]
      || document.querySelectorAll('.input-valid[type="password"]').length < 2) return false;
  
  const inputEl1 = document.querySelectorAll('.input-valid[type="password"]')[0];
  const inputEl2 = document.querySelectorAll('.input-valid[type="password"]')[1];
  const boxEl2 = document.querySelector(`#box-valid-${index}`);

  if ((inputEl1.value && inputEl2.value) && boxEl2 && boxEl2.classList.contains('box-valid')) {
    if (inputEl1.value !== inputEl2.value && !document.getElementsByClassName('msg-confirmation')[0]) {
      let p = document.createElement('p');
  
      p.classList.add('msg-confirmation');
      p.textContent = 'mots de passe différents !';
      boxEl2.append(p);
    }
    else if (inputEl1.value === inputEl2.value && document.getElementsByClassName('msg-confirmation')[0]) {
      document.getElementsByClassName('msg-confirmation')[0].remove();
    }
  }
}

function __createPasswordBar(el) {
  if (document.querySelector('.bar-valid')) return false;

  const idEl = el.getAttribute('id');
  let bar = document.createElement('div');
  let childBar = document.createElement('span');
  childBar.classList.add('bgcolor-error-valid');
  childBar.setAttribute('data-id', idEl);
  bar.classList.add('bar-valid');
  bar.append(childBar);
  el.after(bar);
}

function __modifyColorPasswordBar(el, rule) {
  const idEl = el.getAttribute('id');
  if (!document.querySelector(`[data-id="${idEl}"]`)) return false;

  const childBar = document.querySelector(`[data-id="${idEl}"]`);
  childBar.classList = '';

  if (rule) {
    childBar.classList.add('bgcolor-error-valid');
  }
  else if (el.value.length < 12) {
    childBar.classList.add('bgcolor-warning-valid');
  }
  else {
    childBar.classList.add('bgcolor-validated-valid');
  }
}

function __getMessage(type) {
  switch (type) {
    case 'text':
      return '3 et 10 caractères requis !';
    case 'email':
      return 'au minimum 8 caractères, une majuscule et un caractère spécial requis !';
    case 'password':
      return 'format de l\'email incorrecte !';
  }
}

function __toggleTwoClass(el, removeCls, addCls) {
  el.classList.remove(removeCls);
  el.classList.add(addCls);
}

function submitForm() {
  document.getElementById('btn-submit').addEventListener('click', e => {
    e.preventDefault();
  })
}



document.addEventListener('DOMContentLoaded', () => {
  validateInputList();
  submitForm();
});