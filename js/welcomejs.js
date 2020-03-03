var userin = false;
var outbtn = document.getElementById('log-out');
var user = firebase.auth().currentUser;
let uid;
let userlevel = 1;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    outbtn.disabled = false;
    userin = true;
    uid = user.email.slice(0, 5);
    return firebase
      .database()
      .ref('/Users/' + uid)
      .once('value')
      .then(function(snapshot) {
        var tname = snapshot.val().Name;
        document.getElementById('welcomebox').innerHTML =
          'Welcome, ' + tname + '!';
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

function question() {
  window.location.href = '/question1.html';
}
