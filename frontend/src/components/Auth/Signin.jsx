import React, { useState } from 'react'
import { Form, Input, Button, notification } from 'antd'
import axios from 'axios'
const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(null)

  const handleSubmit = (values) => {
    axios.post('http://localhost:5000/users/login', {
      email: values.email,
      password: values.password
    })
    .then(response => {
      setToken(response.data.token)
      localStorage.setItem('token', response.data.token)
      notification.success({
        message: 'Login successful',
        description: 'You have successfully logged in.',
      })
    })
    .catch(error => {
      notification.error({
        message: 'Login failed',
        description: error.message,
      })
    })
  }

  return (
    <Form className="signin-form" onFinish={handleSubmit}>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input
          value={email}
          onChange={e => setEmail(e.target.value)}
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
          onChange={e => setPassword(e.target.value)}
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

