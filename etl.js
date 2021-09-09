const axios = require('axios');
const { async } = require('rxjs');

(async () => {
  const { data } = await axios.post('http://localhost:3000/auth/login', {
    username: 'username',
    password: 'password',
  });

  console.log(data);
})();
