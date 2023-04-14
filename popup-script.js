const firebaseConfig = {
  apiKey: "AIzaSyBVvV9e-BNlGEaJLICnFbF4OKZ3OkyogMc",
  authDomain: "chromeextensionauth-645df.firebaseapp.com",
  projectId: "chromeextensionauth-645df",
  storageBucket: "chromeextensionauth-645df.appspot.com",
  messagingSenderId: "280190627954",
  appId: "1:280190627954:web:a4dfc09d83a580b41b52eb",
  measurementId: "G-1S8C0RW6BD",
};
firebase.initializeApp(firebaseConfig);

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      chrome.runtime.sendMessage({ message: "sign_in" }, function (response) {
        if (response.message === "success") {
          window.location.replace("./welcome.html");
        }
      });
      return false;
    },
    uiShown: function () {
      document.getElementById("sign_in_form").style.display = "none";
      // document.getElementById('wrapper').style.pointerEvents = 'none';
    },
  },
  signInFlow: "popup",
  // signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      customParameters: {
        prompt: "select_account",
      },
    },
  ],
  // Terms of service url.
  // tosUrl: '<your-tos-url>',
  // Privacy policy url.
  // privacyPolicyUrl: '<your-privacy-policy-url>'
};

// Add an event listener to the Signup button
document
  .querySelector('button[type="submit"]')
  .addEventListener("click", () => {
    ui.start("#sign_in_options", uiConfig);
  });
