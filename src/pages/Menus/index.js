import React from 'react';
import { Table, Button, Icon, Row, Col } from 'antd';

// import Request from '../../utils/Request';

import style from './index.scss';

class index extends React.Component {
	state = {
		cart: [],
		menus: {},
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
				this.setState({
					menus: res.data,
				});
			}
		});
        */
		this.setState({
			menus: {
				1: {
					name: '榴莲披萨',
					description: '最好吃的榴莲披萨',
					options: [
						{ size: 9, price: 38 },
						{ size: 12, price: 48 },
					],
				},
				2: {
					name: '意大利披萨',
					description: '最好吃的意大利披萨',
					options: [
						{ size: 9, price: 38 },
						{ size: 12, price: 48 },
					],
				},
				3: {
					name: '水果披萨',
					description: '最好吃的水果披萨',
					options: [
						{ size: 9, price: 38 },
						{ size: 12, price: 48 },
					],
				},
			},
		});
	};
	renderMenusTable() {
		const columns = [
			{
				key: 'size',
				title: '尺寸',
				dataIndex: 'size',
				render: (text, record) => {
					if (record.price) {
						return <span>{text}</span>;
					}
					return {
						children: <strong>{text}</strong>,
						props: {
							colSpan: 2,
						},
					};
				},
			},
			{
				key: 'price',
				title: '价格',
				dataIndex: 'price',
				render: (text) => {
					return <span>{text}</span>;
				},
			},
			{
				key: 'action',
				title: '加入',
				render: (text, record) => {
					const obj = {
						children: (
							<Button
								onClick={() => handleAddMenus(record)}
								className={style['add-btn']}
							>
								<Icon type='plus' />
							</Button>
						),
						props: [],
					};
					if (!record.price) {
						obj.props.colSpan = 0;
					}
					return obj;
				},
			},
		];
		const handleAddMenus = (record) => {
			let { cart } = this.state;
			const index = cart.findIndex((item) => item.key === record.key);
			index >= 0
				? cart.splice(index, 1, {
						...cart[index],
						count: cart[index].count + 1,
				  })
				: (cart = [
						...cart,
						{
							...record,
							count: 1,
						},
				  ]);
			// 存储到状态中
			this.setState({
				cart: [...cart],
			});
		};
		let data = this.state.menus;
		// 处理数据格式
		let dataSource = [];
		for (const key in data) {
			let item = data[key];
			dataSource.push({
				key: item.name,
				size: item.name,
			});
			item.options.forEach((ele, index) => {
				dataSource.push({
					...ele,
					name: item.name,
					key: key + '-' + index,
				});
			});
		}

		return (
			<Table
				className='menus-table'
				columns={columns}
				dataSource={dataSource}
				pagination={false}
			/>
		);
	}
	renderCartTable() {
		const columns = [
			{
				key: 'count',
				title: '数量',
				dataIndex: 'count',
				render: (text, record) => (
					<span>
						<Button
							onClick={() => handleDecrease(record)}
							className={style['cart-btn']}
						>
							-
						</Button>
						<span>{record.count}</span>
						<Button
							onClick={() => handleIncrease(record)}
							className={style['cart-btn']}
						>
							+
						</Button>
					</span>
				),
			},
			{
				key: 'name',
				title: '菜单',
				dataIndex: 'name',
			},
			{
				key: 'price',
				title: '价格',
				dataIndex: 'price',
			},
		];
		const handleDecrease = (record) => {
			let { cart } = this.state;
			const index = cart.findIndex((item) => item.key === record.key);
			const current = cart[index];
			if (current.count <= 1) {
				cart.splice(index, 1);
			} else {
				cart.splice(index, 1, {
					...current,
					count: current.count - 1,
				});
			}
			this.setState({
				cart,
			});
		};
		const handleIncrease = (record) => {
			let { cart } = this.state;
			const index = cart.findIndex((item) => item.key === record.key);
			const current = cart[index];
			cart.splice(index, 1, {
				...current,
				count: current.count + 1,
			});
			this.setState({
				cart,
			});
		};
		return (
			<Table
				rowKey='key'
				pagination={false}
				className='menus-table cart'
				dataSource={this.state.cart}
				columns={columns}
				locale={{
					emptyText: '购物车没有任何商品',
				}}
			/>
		);
	}
	render() {
		const totalPrice = this.state.cart.reduce(
			(total, item) => (total += item.price * item.count),
			0
		);
		return (
			<Row>
				<Col sm={24} md={16}>
					{this.renderMenusTable()}
				</Col>
				<Col sm={24} md={8}>
					{this.renderCartTable()}
					<p className={style['total-price']}>总价: {totalPrice}</p>
					<Button className={style['submit-btn']} type='primary'>
						提交
					</Button>
				</Col>
			</Row>
		);
	}
}

export default index;
