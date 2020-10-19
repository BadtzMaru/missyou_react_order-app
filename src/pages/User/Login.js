import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';

import Logo from 'Assets/icon.png';
import style from './account.scss';

export default class Login extends Component {
    render() {
        return (
            <div className={style.account}>
                <img src={Logo} alt="logo" className={style.logo} />
                <Form className="account-form">
                    <Form.Item label="邮箱">
                        <Input />
                    </Form.Item>
                    <Form.Item label="密码">
                        <Input type="password" />
                    </Form.Item>
                    <Form.Item>
                        <Button className="btn" type="primary">登录</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
