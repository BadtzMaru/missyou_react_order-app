import React, { Component } from 'react';
import { Row, Col, Table, Button, Message } from 'antd';

// import Request from '../../utils/Request';

import style from './index.scss';
import NewPizza from './NewPizza';

export default class index extends Component {
	state = {
		menus: [],
	};
	// 钩子函数
	componentDidMount() {
		this.getMenusData();
	}
	// 获取菜单列表的数据
	getMenusData = () => {
		/*
        Request('/menu.json').then((res) => {
			if (res && res.status === 200 && res.data) {
				const {data} = res;
				this.setState(() => {
					const menus = [];
					for (const key in data) {
						menus.push({
							key,
							name: data[key].name,
						});
					}
					return { menus };
				});
			}
		});
        */
		this.setState({
			menus: [
				{ key: 1, name: '榴莲披萨' },
				{ key: 2, name: '芝士披萨' },
				{ key: 3, name: '水果披萨' },
			],
		});
	};
	renderMenuTable() {
		const columns = [
			{
				key: 'name',
				title: '品种',
				dataIndex: 'name',
			},
			{
				key: 'action',
				title: '删除',
				render: (text, record) => (
					<Button
						onClick={() => handleDelete(record)}
						className={style['delete-btn']}
					>
						<span>X</span>
					</Button>
				),
			},
		];
		const handleDelete = (record) => {
			/*
			Request(`/menu/${record.key}.json`, {
				method: 'delete',
			}).then((res) => {
				if (res && res.status === 200) {
					Message.success('删除成功');
					window.location.href = '/#/menus';
				} else {
					Message.error('删除失败');
				}
			});
			*/
			Message.success('删除成功');
			window.location.href = '/#/menus';
		};
		return (
			<Table
				pagination={false}
				className='menus-table'
				dataSource={this.state.menus}
				columns={columns}
				locale={{
					emptyText: '菜单没有任何商品',
				}}
			/>
		);
	}
	renderNewPizza() {
		return <NewPizza />;
	}
	render() {
		return (
			<Row className={style.admin}>
				<Col className={style.left} sm={24} md={16}>
					{this.renderNewPizza()}
				</Col>
				<Col className={style.right} sm={24} md={8}>
					<h3>菜单</h3>
					{this.renderMenuTable()}
				</Col>
			</Row>
		);
	}
}
