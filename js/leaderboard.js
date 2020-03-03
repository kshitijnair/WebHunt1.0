var uid;
var userin = false;
var outbtn = document.getElementById('log-out');
var user = firebase.auth().currentUser;
var userref = firebase.database().ref('Users/');

userref.on('child_changed', function(data) {
  dispData(data);
  window.location.reload();
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    outbtn.disabled = false;
    userin = true;
    uid = user.email.slice(0, 5);
    var leaderBoard = firebase.database().ref('Users');
    leaderBoard.on('value', dispData, errData);
  } else {
    // No user is signed in.
    outbtn.disabled = true;
  }
});

function logout() {
  firebase
    .auth()
    .signOut()
    .then(function() {})
    .catch(function(error) {
      // An error happened.
      window.alert('Error: ' + errorMessage);
    });
  window.location.href = '/index.html';
}

function checkAns() {
  var answerText = document.getElementById('answerBox').value;
  answerText = answerText.replace(/\s+/g, '');
}

function dispData(data) {
  //console.log(data.val());

  var updateUser = firebase.database().ref('/Users');

  var levelData = data.val();
  var uniqids = Object.keys(levelData);
  var levelDataArray = Object.keys(levelData).map(function(key) {
    return [levelData[key]];
  });
  const arr = levelDataArray.map(item => item[0]);
  const arrr = arr.map(item => {
    return [item.Level, item.Name];
  });
  const Arrr = arrr.map(item => item[0]);
  let finalArr = [];
  for (const i of _.sortBy(Arrr)) {
    arr.map(item => {
      if (item.Level === i) {
        finalArr.push(item);
      }
    });
  }

  const body = document.querySelector('body');
  const div = document.createElement('div');

  _.reverse(_.uniqBy(finalArr, 'Name')).map(item => {
    console.log(item);
    const jumbotron = document.createElement('div');
    const jumbotronText = document.createElement('p');
    const spanLevel = document.createElement('span');
    jumbotron.className = 'jumbotron';
    jumbotronText.className = 'lead';
    spanLevel.className = 'spanLevel';
    jumbotronText.textContent = `${item.Name}`;
    spanLevel.textContent = `Level : ${item.Level}`;
    jumbotronText.appendChild(spanLevel);
    jumbotron.appendChild(jumbotronText);
    div.appendChild(jumbotron);
    jumbotron.style.backgroundColor = '#ffc1e3';
    return 0;
  });
  body.appendChild(div);
}

function redirectGame() {
  window.history.back();
}

function errData(err) {
  console.log('Error!');
  console.log(err);
}
