const URL = 'https://forum2022.codeschool.cloud';
var app = new Vue({
  el: '#app',
  data: {
    loginEmailInput: '',
    loginPasswordInput: '',

    newEmailInput: '',
    newPasswordInput: '',
    fullNameInput: '',
  },
  methods: {
    //ask the server if we are logged in
    getSession: async function () {
      let response = await fetch(`${URL}/session`, {
        method: 'GET',
        credentials: 'include',
      });
      // Are we logged in?
      if (response.status == 200) {
        console.log('logged in');
        let data = await response.json();
        console.log(data);
      } else if (response.status == 401) {
        console.log('not logged in');
        let data = await response.json();
        console.log(data);
      } else {
        console.log(
          'Some sort of error when GETTING /session',
          response.status,
          response
        );
      }
    },
    // POST / session
    postSession: async function () {
      let loginCreds = {
        username: this.loginEmailInput,
        password: this.loginPasswordInput,
      };
      let response = await fetch(URL + '/session', {
        method: 'POST',
        body: JSON.stringify(loginCreds),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.status == 201) {
        console.log('successful login attempt');

        // clear inputs
        this.loginEmailInput = '';
        this.loginPasswordInput = '';
      } else if (response.status == 401) {
        console.log('Unsuccessful login attempt');

        alert('unsuccessful login');

        //clear password input

        this.loginPasswordInput = '';
      } else {
        console.log(
          'Some sort of error when POSTING /session',
          response.status,
          response
        );
      }

      console.log(response);
    },
    postUser: async function () {
      let newUser = {
        username: this.newEmailInput,
        password: this.newPasswordInput,
        fullname: this.fullNameInput,
      };
      let response = await fetch(URL + '/user', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      console.log(response);
    },
  },
  created: function () {
    this.getSession();
  },
});
