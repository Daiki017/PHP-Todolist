$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

function errChk(){ //タスク登録時のエラーチェック
    var taskname = document.getElementById('taskname').value;
    var taskvalue = document.getElementById('taskvalue').value;

    if(taskname === "" || taskvalue === ""){
        if(!taskname.match(/\S/g) || !taskvalue.match(/\S/g)){
            alert("タスク名、またはまたは内容に不備があります。");
            return false;
        }

    }
}


function onSignIn(googleUser) {//googleでログインボタンを押下したときの処理
    var id_token = googleUser.getAuthResponse().id_token;
    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'https://blooming-ocean-46381.herokuapp.com/token_verify.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        console.log(xhr.responseText);
        if(xhr.responseText === 'true'){
            window.location.href = 'index.php';
        }else {
            window.location.href = 'googleinforegister.php';
        }
    };
    xhr.onerror = function () {
        console.log('送信できませんでした。');
    };
    xhr.send('idtoken=' + id_token);
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

function onLoad() {
    gapi.load('auth2', function() {
        gapi.auth2.init();
    });
}

function comptask(){
    var div = document.createElement('div');

    fetch('https://blooming-ocean-46381.herokuapp.com/completetask.php')
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        for(let count=0;count <20; count++){
            div = document.getElementById("comptaskid" + count)
            div.innerHTML = json.get[count].id

            div = document.getElementById("comptaskname" + count)
            div.innerHTML = json.get[count].name

            div = document.getElementById("comptaskvalue" + count)
            div.innerHTML = json.get[count].memo

            div = document.getElementById("compdeadline_date" + count)
            div.innerHTML = json.get[count].deadline_date
        }
    })
    .catch((error) => console.log(error));
}

document.getElementById("resettaskmodal").onclick = function() {
    document.edittaskform.reset();
}


