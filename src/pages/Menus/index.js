import React from 'react';
import { Table, Button, Icon, Row, Col } from 'antd';

import style from './index.scss';

class index extends React.Component {
    state = {
        cart: [],
    };
    renderMenusTable() {
        const columns = [
            {
                key: 'size',
                title: '尺寸',
                dataIndex: 'size',
                render: (text) => {
                    return <span>{text}</span>;
                }
            },
            {
                key: 'price',
                title: '价格',
                dataIndex: 'price',
                render: (text) => {
                    return <span>{text}</span>;
                }
            },
            {
                key: 'action',
                title: '加入',
                render: (text, record) => {
                    const obj = {
                        children: (
                            <Button onClick={() => handleAddMenus(record)} className={style['add-btn']}><Icon type="plus" /></Button>
                        ),
                        props: []
                    };
                    if (!record.price) {
                        obj.props.colSpan = 0;
                    }
                    return obj;
                }
            },
        ];
        const handleAddMenus = (record) => {
            console.log(record);
        };
        let data = {
            1: {
                name: '榴莲披萨',
                description: '最好吃的榴莲披萨',
                options: [
                    { size: 9, price: 38 },
                    { size: 12, price: 48 },
                ]
            },
            2: {
                name: '意大利披萨',
                description: '最好吃的意大利披萨',
                options: [
                    { size: 9, price: 38 },
                    { size: 12, price: 48 },
                ]
            },
            3: {
                name: '水果披萨',
                description: '最好吃的水果披萨',
                options: [
                    { size: 9, price: 38 },
                    { size: 12, price: 48 },
                ]
            },
        };
        // 处理数据格式
        let dataSource = [];
        for (const key in data) {
            let item = data[key];
            dataSource.push({
                key: item.name,
                size: item.name,
            });
            item.options.forEach((ele, index) => {
                dataSource.push({ ...ele, name: item.name, key: key + '-' + index });
            });
        }

        return (
            <Table
                className="menus-table"
                columns={columns}
                dataSource={dataSource}
                pagination={false}
            />
        );
    }
    renderCartTable() {
        return (
            <div>hello</div>
        );
    }
    render() {
        return (
            <Row>
                <Col sm={24} md={16} >{this.renderMenusTable()}</Col>
                <Col sm={24} md={8} >{this.renderCartTable()}</Col>
            </Row>
        );
    }
}

export default index;
