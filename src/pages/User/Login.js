import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Message } from 'antd';

import Logo from 'Assets/icon.png';
import style from './account.scss';
import { email_reg, pwd_reg } from '../../utils/Regexp.js';
import Request from '../../utils/Request';


class Login extends Component {
    // 自定义表单校验规则
    validatorForm = (rule, value, callback) => {
        if (value && rule.pattern && !value.match(rule.pattern)) {
            callback(rule.message);
        } else {
            callback();
        }
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { email, pwd } = values;
                // 发起网络请求
                Request('/usrs.json').then(res => {
                    const { data, status } = res;
                    if (res && status === 200 && data) {
                        let users = [];
                        for (const key in data) {
                            users.push({
                                ...data[key],
                                key,
                            });
                        }
                        users = users.filter(user => {
                            return user.pwd === pwd && user.email === email;
                        });
                        if (users && users.length) {
                            this.props.dispatch({
                                type: 'global/setUserInfo',
                                payload: users[0],
                            }).then(() => {
                                localStorage.setItem('email', users[0].email);
                                localStorage.setItem('key', users[0].key);
                                this.props.history.push('/');
                            });
                        } else {
                            Message.error('邮箱或密码错误');
                        }
                    }
                });
                // 模拟登录成功
                this.props.dispatch({
                    type: 'global/setUserInfo',
                    payload: {
                        email: '707380414@qq.com',
                        pwd: 'abc123456',
                        key: 'abcdefg123456',
                    },
                }).then(() => {
                    localStorage.setItem('email', '707380414@qq.com');
                    localStorage.setItem('key', 'abcdefg123456');
                    this.props.history.push('/');
                });
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={style.account}>
                <img src={Logo} alt="logo" className={style.logo} />
                <Form className="account-form">
                    <Form.Item label="邮箱">
                        {getFieldDecorator('email', {
                            rules: [
                                { required: true, message: '请输入邮箱' },
                                { pattern: email_reg, validator: this.validatorForm, message: '请输入正确的邮箱格式' }
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="密码">
                        {getFieldDecorator('pwd', {
                            rules: [
                                { required: true, message: '请输入密码' },
                                { pattern: pwd_reg, validator: this.validatorForm, message: '请输入正确的密码格式: 6-16位字母,数字或特殊字符_-.' },
                            ],
                        })(
                            <Input type="password" maxLength={16} />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={this.handleSubmit} className="btn" type="primary">登录</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default connect()(Form.create()(Login));