import React from 'react'
import { Form, Input, Button } from 'antd'
import axios from 'axios'

function Signup() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')

  const handleSubmit = (values) => {
    console.log("asdsad")
    if (password !== confirmPassword) {
      alert('Passwords do not match')
    } else {
      axios.post('http://localhost:5000/users/register', {
        email,
        password
      })
      .then((response) => {
        console.log(response.data)
        alert('Signed up successfully')
      })
      .catch((error) => {
        console.log(error)
        alert('Signup failed')
      })
    }
  }

  return (
    <Form onFinish={handleSubmit} className="signup-form">
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
      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        rules={[{ required: true, message: 'Please input your confirm password!' }]}
      >
        <Input.Password
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Signup
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Signup

