const axios = require('axios');
const { async } = require('rxjs');

(async () => {
  const {
    data: { token },
  } = await axios.post('http://localhost:3000/auth/login', {
    username: 'username',
    password: 'password',
  });

  try {
    const data = await axios.get('http://localhost:3000/auth', {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(data);
  } catch (err) {
    console.log(err);
  }
})();
