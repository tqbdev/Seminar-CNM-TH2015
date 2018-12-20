/* global document, window, feathers, moment, io */

// Establish a Socket.io connection
const socket = io();
// Initialize our Feathers client application through Socket.io
const client = feathers();

client.configure(feathers.socketio(socket));
// Use localStorage to store our login token

// Login screen
const loginHTML = `<main class="login container">
  <div class="row">
    <div class="col-12 col-6-tablet push-3-tablet text-center heading">
      <h1 class="font-100">Log in or signup</h1>
    </div>
  </div>
  <div class="row">
    <div class="col-12 col-6-tablet push-3-tablet col-4-desktop push-4-desktop">
      <form class="form">
        <fieldset>
          <input class="block" type="text" name="output" placeholder="Output">
        </fieldset>

        <fieldset>
          <input class="block" type="text" name="input" placeholder="Input">
        </fieldset>

        <button type="button" id="login" class="button button-primary block signup">
          SEND
        </button>
      </form>
    </div>
  </div>
</main>`;

// Add a new user to the list
const addUser = user => {
  const userList = document.querySelector('[name="output');

  if(userList) {
    // Add the user to the list
    userList.value = user.email;
    console.log(user.email)
  }
};

// Show the login page
const showLogin = async (user) => {
 document.getElementById('app').innerHTML = loginHTML;
   // Find all users
  // const users = await client.service('users').find();
  // users.data.forEach(addUser);
  addUser(user);
};

// Retrieve email/password object from the login/signup page
const getCredentials = () => {
  const user = {
    email: document.querySelector('[name="input"]').value
  };

  return user;
};

// Log in either using the given email/password or the token from storage
const login = credentials => {
      showLogin(credentials)
};

document.addEventListener('click', async ev => {
  if(ev.target.id == 'login') {
    // For signup, create a new user and then log them in
    const credentials = getCredentials();
    // First create the user
    await client.service('users').create(credentials);
    // If successful log them in
    await login(credentials);
  }
});

// We will also see when new users get created in real-time
client.service('users').on('created', addUser);

login();
