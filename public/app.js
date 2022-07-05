const URL = 'https://forum2022.codeschool.cloud';
var app = new Vue({
  el: '#app',
  data: {
    page: 'login',
    loginEmailInput: '',
    loginPasswordInput: '',

    newEmailInput: '',
    newPasswordInput: '',
    fullNameInput: '',
    threads: [],
  },
  methods: {
    setPage: function (page) {
      this.page = page;
    },
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
      // parse response body
      let body;
      try {
        body = response.json();
        //console.log(body);
      } catch (error) {
        console.log('Response body was not json.');
      }

      // check if login successful
      if (response.status == 201) {
        console.log('successful login attempt');

        // clear inputs
        this.loginEmailInput = '';
        this.loginPasswordInput = '';
        // go to home page

        // this.loadHomePage();
      } else if (response.status == 401) {
        console.log('Unsuccessful login attempt');
        // let user know
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
      let body;
      try {
        body = response.json();
      } catch (error) {
        console.error('Error parsing body as JSON:', error);
        body = 'An Unknown Error has occurred';
      }
      if (response.status == 201) {
        //user successfully created
        this.newEmailInput = '';
        this.newPasswordInput = '';
        this.fullNameInput = '';
        console.log(response);
        this.setPage('login');
      } else {
        //error creating user
        this.newPasswordInput = '';
        // create notification
      }
    },
  },
  created: function () {
    this.getSession();
  },
});
