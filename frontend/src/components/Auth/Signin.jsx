import React from 'react'
import { Form, Input, Button } from 'antd'
import axios from 'axios'

function Signin() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [token, setToken] = React.useState(null)

  const handleSubmit = (e) => {
    
    axios.post('http://localhost:5000/users/login', {
      email,
      password
    })
    .then(response => {
      setToken(response.data.token)
      alert('Login successful')
    })
    .catch(error => {
      alert('Login failed')
    })
  }

  if (token) {
    return (
      <div>
        <h1>Login successful</h1>
        <p>Token: {token}</p>
      </div>
    )
  }

  return (
    <Form onFinish={handleSubmit} className="signin-form">
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Signin
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Signin

