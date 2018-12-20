/* global document, window, feathers, moment, io */

// Establish a Socket.io connection
const socket = io();
// Initialize our Feathers client application through Socket.io
const client = feathers();

client.configure(feathers.socketio(socket));
// Use localStorage to store our send token

// Login screen
const sendHTML = `<main class="login container">
  <div class="row">
    <div class="col-12 col-6-tablet push-3-tablet text-center heading">
      <h1 class="font-100">Socket IO</h1>
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

        <button type="button" id="send" class="button button-primary block signup">
          SEND
        </button>
      </form>
    </div>
  </div>
</main>`;

const addMessage = user => {
  const userList = document.querySelector('[name="output');

  if(userList) {
    userList.value = user.email;
    console.log(user.email)
  }
};

const showLogin = async (user) => {
 document.getElementById('app').innerHTML = sendHTML;
  addMessage(user);
};

const getInputText = () => {
  const user = {
    email: document.querySelector('[name="input"]').value
  };

  return user;
};

const send = input => {
      showLogin(input)
};

document.addEventListener('click', async ev => {
  if(ev.target.id == 'send') {
    // For signup, create a new user and then log them in
    const input = getInputText();
    // First create the user
    await client.service('users').create(input);
    // If successful log them in
    await send(input);
  }
});

// We will also see when new users get created in real-time
client.service('users').on('created', addMessage);

send();
