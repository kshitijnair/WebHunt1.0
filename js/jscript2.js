var outbtn = document.getElementById('log-out');
var userIN = 0;
var currLevel;
let userLogin;
var username, currLevel;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    getUserDeets();

    outbtn.disabled = false;
  } else {
    // No user is signed in.
    currentUser = 'No user is in';
    outbtn.disabled = true;
    logout();
    console.log(currentUser); //this returns my user object
  }
});

function login() {
  var userEmail = document.getElementById('logemail').value;
  var userPwd = document.getElementById('logpassword').value;
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function() {
      return firebase.auth().signInWithEmailAndPassword(userEmail, userPwd);
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert('Wrong Credentials!' + errorMessage);
    });
}

function logout() {
  firebase
    .auth()
    .signOut()
    .then(function() {})
    .catch(function(error) {
      // An error happened.
      window.alert('Error: ' + errorMessage);
    });
  userin = false;
  outbtn.disabled = true;
}

function getUserDeets() {
  var user = firebase.auth().currentUser;

  userIN = userIN + 1;
  outbtn.disabled = false;
  document.getElementById('log-out').style.display = 'intial';
  uid = user.email.slice(0, 5);
  return firebase
    .database()
    .ref('/Users/' + uid)
    .once('value')
    .then(function(snapshot) {
      var uName = snapshot.val().Name;
      var uLevel = snapshot.val().Level;
      if (userIN > 0) {
        redirecpage(uLevel);
      }
    });
}

function redirecpage(currentlevel) {
  return firebase
    .database()
    .ref('/Users/' + uid)
    .once('value')
    .then(function(snapshot) {
      var uLevel = snapshot.val().Level;
      if (userIN > 0) {
        if (uLevel == 0) {
          outbtn.disabled = false;
          window.location.href = '/teamname.html';
        } else {
          outbtn.disabled = false;
          window.location.href = '/question' + uLevel + '.html';
        }
      }
    });
}

document
  .getElementById('logpassword')
  .addEventListener('keyup', function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById('submit').click();
    }
  });

function teamDisp() {
  userIN = userIN + 1;

  document.getElementById('logemail').innerHTML = 'Team Name: ';
  document.getElementById('submit').innerHTML = 'Submit';

  document.getElementById('logpassword').style.display = 'none';
  getTeam();
}

function getTeam() {
  var teamname = document.getElementById('logemail');
  var newpost = {
    Name: teamname
  };
  var updates = {};
  updates['Users/' + uid + '/'] = newpost;
  return firebase
    .database()
    .ref()
    .update(updates);
}

function addnewUser() {
  var nayauser;
  var text = '';
  var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  nayauser = text;
  let loginemail = nayauser + '@webhunt.vitap';
  let loginpass = 'password';
  firebase
    .auth()
    .createUserWithEmailAndPassword(loginemail, loginpass)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });

  var newpost = {
    Level: 0,
    Name: 'TeamName',
    Time: 0
  };
  var updates = {};
  updates['Users/' + nayauser + '/'] = newpost;
  return firebase
    .database()
    .ref()
    .update(updates);
}
