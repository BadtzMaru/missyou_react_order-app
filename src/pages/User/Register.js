import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';

import Logo from 'Assets/icon.png';
import style from './account.scss';
import { email_reg, pwd_reg } from '../../utils/Regexp.js';
import Request from '../../utils/Request';

class Register extends Component {
    // 自定义表单校验规则
    validatorForm = (rule, value, callback) => {
        if (value && rule.pattern && !value.match(rule.pattern)) {
            callback(rule.message);
        } else {
            callback();
        }
    };
    validatorPwd = (rule, value, callback) => {
        const form = this.props.form;
        if (value !== form.getFieldValue('pwd')) {
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
                Request('/usrs.json', {
                    method: 'post',
                    data: { email, pwd },
                }).then(res => {
                    if (res.status === 200 && res.data) {
                        this.props.history.push('/login');
                    }
                });
                // 模拟注册成功
                this.props.history.push('/login');
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
                    <Form.Item label="确认密码">
                        {getFieldDecorator('aPwd', {
                            rules: [
                                { required: true, message: '请输入密码' },
                                { pattern: pwd_reg, validator: this.validatorForm, message: '请输入正确的密码格式: 6-16位字母,数字或特殊字符_-.' },
                                { pattern: pwd_reg, validator: this.validatorPwd, message: '两次密码输入不一致' },
                            ],
                        })(
                            <Input type="password" maxLength={16} />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={this.handleSubmit} className="btn" type="primary">注册</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Form.create()(Register);
