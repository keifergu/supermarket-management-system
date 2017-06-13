import React, { Component } from 'react';
import { Button, Input } from 'antd';

export default class Login extends Component {
	render() {
		return (
			<div>
				<Input placeholder="username"/>
				<Input placeholder="passwprd"/>
				<Button type="primary" icon="login">Login</Button>				
			</div>
		);
	}
}
