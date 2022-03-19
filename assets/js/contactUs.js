//---------------------------Variable-------------------------------
var button = document.getElementById('contactUs');
var inputs = document.getElementsByClassName('contactInput');
var inputGood = document.getElementsByClassName('valid-feedback');
var inputBad = document.getElementsByClassName('invalid-feedback');

var mailData = {"firstN": "", "name": "", "email": "", "phone": "", "msg": "", "isSuccess": false};
var mailTo = "Samuel.deliens@gmail.com";
var mail = "#";
mailError = {"firstNError": "", "nameError": "", "emailError": "", "phoneError": "", "msgError": ""};

//---------------------------Listener-------------------------------
button.addEventListener('mouseenter', function() {
    getForm();
});
document.addEventListener('change', function() {
    getForm();
    checkError();
});
document.getElementById('contactUs').addEventListener("click", function(event) {
    validate();   
});

//---------------------------Étape-------------------------------
function getForm() {
    getInput();
    verifName("firstN", "firstNError");
    verifName("name", "nameError");
    verifEmail("email", "emailError");
    verifMsg("msg", "msgError");
    if (mailData["isSuccess"]) {
        createLink();
    }
}
function createLink() {
    mail = "mailto:"+mailTo;
    mail += "?subject=Email from your website by "+mailData["firstN"]+" "+mailData["name"];
    mail += " <"+mailData["email"]+">";
    mail += "&body= "+mailData["msg"];
}
function validate() {
    if (mailData["isSuccess"]) {
        window.location.href=mail;
        init();
        setTimeout(function() {
            location.reload();
        },500);
    } else {
        checkError();
    }
}

function init() {
    var mailData = {"firstN": "", "name": "", "email": "", "phone": "", "msg": "", "isSuccess": false};
    mail = "#";
}

//---------------------------Récup-------------------------------
function getInput() {
    mailData["firstN"] = cleanInput(document.getElementById('firstnameInput').value);
    mailData["name"] = cleanInput(document.getElementById('nameInput').value);
    mailData["email"] = cleanInput(document.getElementById('emailInput').value);
    mailData["phone"] = cleanInput(document.getElementById('phoneInput').value);
    mailData["msg"] = cleanInput(document.getElementById('messageInput').value);
    mailData["isSuccess"] = true;
}
function cleanInput(input) {
    input = input.trim();
    input = strip_tags(input);
    input = htmlspecialchars(input);
    return input
}

//---------------------------Verif-------------------------------
function verifName(input, error) {
    if (!checkName(mailData[input])) {
        mailData["isSuccess"] = false;
        mailError[error] = true;
    } else {
        mailError[error] = false; 
    }
}
function verifEmail(input, error) {
    if (!checkEmail(mailData[input])) {
        mailData["isSuccess"] = false;
        mailError[error] = true;
    } else {
        mailError[error] = false; 
    }
}
function verifMsg(input, error) {
    if (!checkMsg(mailData[input])) {
        mailData["isSuccess"] = false;
        mailError[error] = true;
    } else {
        mailError[error] = false; 
    }
}

//---------------------------Erreur-------------------------------
function checkError() {
    if(!mailData["isSuccess"]) {
        if(mailError["firstNError"]) showError(0); 
        else showSuccess(0);
        if(mailError["nameError"]) showError(1); 
        else showSuccess(1);
        if(mailError["emailError"]) showError(2); 
        else showSuccess(2);
        if(mailError["msgError"]) showError(3); 
        else showSuccess(3);
    } 
}
function showError(int) {
    inputBad[int].style.display = "block";
    inputGood[int].style.display = "none";
}
function showSuccess(int) {
    inputGood[int].style.display = "block";
    inputBad[int].style.display = "none";
}

//---------------------------General-------------------------------
function strip_tags(str, allow){
 // making sure the allow arg is a string containing only tags in lowercase (<a><b><c>)
 allow = (((allow || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');

 var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
 var commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
 return str.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
 return allow.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 :'';
 });
}
function htmlspecialchars(str) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return str.replace(/[&<>"']/g, function(m) { return map[m]; });
}

//---------------------------Condition Input-----------------------
function checkName(name) {
    var re = /^[a-zA-Z\s]{3,15}$/;
    return re.test(name); 
}
function checkEmail(email) {
    var re = /^(([^<()[\]\\.,;:\s@\]+(\.[^<()[\]\\.,;:\s@\]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function checkMsg(input) {
    var re = /^[a-zA-Z0-9\s]{10,300}$/;
    return re.test(input); 
}