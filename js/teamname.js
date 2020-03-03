var userin = false;
var outbtn = document.getElementById('log-out');
var uid;
document.getElementById('next').style.display = 'none';

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    outbtn.disabled = false;
    userin = true;
    uid = user.email.slice(0, 5);
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

function addTeam() {
  var teamn = document.getElementById('teamname').value;
  document.getElementById('submit').style.display = 'none';
  document.getElementById('next').style.display = 'block';

  var newpost = {
    Level: 1,
    Name: teamn,
    Time: 0
  };
  var updates = {};
  updates['Users/' + uid + '/'] = newpost;
  return firebase
    .database()
    .ref()
    .update(updates);
}

function welcome() {
  window.location.href = '/welcome.html';
}

document.getElementById('teamname').addEventListener('keyup', function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById('submit').click();
  }
});
