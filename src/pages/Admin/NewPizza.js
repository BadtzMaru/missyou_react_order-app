import React, { Component } from 'react';
import { Form, Input } from 'antd';

class NewPizza extends Component {
	render() {
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 2 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 22 },
			},
			colon: false,
		};
		return (
			<div>
				<h3>添加新的披萨</h3>
				<Form>
					<Form.Item {...formItemLayout} label='品种'>
						<Input />
					</Form.Item>
					<Form.Item {...formItemLayout} label='描述'>
						<Input />
					</Form.Item>
					<p>
						<strong>选项1: </strong>
					</p>
					<Form.Item {...formItemLayout} label='尺寸'>
						<Input />
					</Form.Item>
				</Form>
			</div>
		);
	}
}

export default Form.create()(NewPizza);
