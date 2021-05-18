const express =  require('express');
const app = express();
const axios = require('axios');
const qs = require('qs');

app.use(express.json())

const baseURL = "http://18.188.132.8:8080/auth/admin/realms/master/users/";
const loginURL = "http://18.188.132.8:8080/auth/realms/master/protocol/openid-connect/token";

app.post('/token', (req, res) => {
  var data = qs.stringify({
    'grant_type': 'password',
    'username': req.body.username,
    'password': req.body.password,
    'client_secret': 'a085f189-f554-4e4c-baf5-2b93c5eae7fe',
    'client_id': 'testeClient' 
  });
  var config = {
    method: 'post',
    url: loginURL,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data
  };
  
  axios(config)
  .then(function (response) {
    res.send(response.data)
  })
  .catch(function (error) {
    res.send(error)
  });
})

app.post('/users', (req, res) => {
  const token = req.headers.authorization;
  const data = req.body

  var config = {
    method: 'post',
    url: baseURL,
    headers: { 'Authorization': token },
    data
  };
  
  axios(config)
  .then(function (response) {
    res.send(response.data)
  })
  .catch(function (error) {
    res.send(error)
  });
})

app.get('/users', async (req, res) => {
  const token = req.headers.authorization;

  var config = {
    method: 'get',
    url: baseURL,
    headers: { 'Authorization': token },
  };
  
  axios(config)
  .then(function (response) {
    res.send(response.data)
  })
  .catch(function (error) {
    res.send(error)
  });
})

app.get('/users/:id', (req, res) => {
  const token = req.headers.authorization;
  const id = req.params.id

  var config = {
    method: 'get',
    url: baseURL + id,
    headers: { 
      'Authorization': token
    },
  };
  
  axios(config)
  .then(function (response) {
    res.send(response.data)
  })
  .catch(function (error) {
    res.send(error)
  });
})

app.put('/users/:id', (req, res) => {
  const token = req.headers.authorization;
  const id = req.params.id
  const data = req.body

  var config = {
    method: 'put',
    url: baseURL + id,
    headers: { 
      'Authorization': token
    },
    data
  };
  
  axios(config)
  .then(function (response) {
    res.send(response.data)
  })
  .catch(function (error) {
    res.send(error)
  });
})

app.patch('/users/:id', (req, res) => {
  const token = req.headers.authorization;
  const id = req.params.id

  var config = {
    method: 'put',
    url: `${baseURL}${id}/reset-password`,
    headers: { 
      'Authorization': token
    },
    data: {
      type: "password", 
      temporary: false, 
      value: req.body.value
    }
  };
  
  axios(config)
  .then(function (response) {
    res.send(response.data)
  })
  .catch(function (error) {
    res.send(error)
  });
})

app.delete('/users/:id', (req, res) => {
  const token = req.headers.authorization;
  const id = req.params.id

  var config = {
    method: 'delete',
    url: baseURL + id,
    headers: { 
      'Authorization': token
    },
  };
  
  axios(config)
  .then(function (response) {
    res.send(response.data)
  })
  .catch(function (error) {
    res.send(error)
  });
})

app.listen(8000, function () {
  console.log('Listening at http://localhost:8000');
});
