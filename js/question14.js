var uid, hash;
var userin = false;
var outbtn = document.getElementById('log-out');
var user = firebase.auth().currentUser;
var leveldata = 14;

window.onload = function timer() {
  var timer_elem = document.getElementById('navbar-timer');
  var seconds = 0;
  var minutes = 0;
  var hours = 0;
  setInterval(function() {
    seconds++;
    if (seconds == 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes == 60) {
      minutes = 0;
      hours++;
    }
    timer_elem.textContent = `${hours
      .toString()
      .padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
};

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    outbtn.disabled = false;
    userin = true;
    uid = user.email.slice(0, 5);

    var d1 = new Date(); //"now"
    var d2 = new Date('2019/03/10 10:00:00'); //"now"
    var diff = Math.round(Math.abs(d2.getTime() - d1.getTime()) / 1000);

    var userLogin = firebase.database().ref('Users/' + uid);
    userLogin.once('value', function(data) {
      var username = data.val().Name;

      var newpost = {
        Level: leveldata,
        Name: username,
        Time: diff
      };
      var updates = {};
      updates['Users/' + uid + '/'] = newpost;
      return firebase
        .database()
        .ref()
        .update(updates);
    });

    return firebase
      .database()
      .ref('/Hashes')
      .once('value')
      .then(function(snapshot) {
        hash = snapshot.val().l14;
      });
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
  answerText = answerText.toLowerCase();
  answerText = answerText.replace(/\s+/g, '');

  if (answerText == hash) {
    window.location.href = '/question15.html';
    //alert('issa correct!');
  } else {
    alert('Wrong Answer, Detective!');
  }
}

function redirectLB() {
  window.location.href = '/leaderboard.html';
}

document.getElementById('answerBox').addEventListener('keyup', function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById('button-addon2').click();
  }
});
