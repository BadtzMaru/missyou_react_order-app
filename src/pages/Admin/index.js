import React, { Component } from 'react';
import { Row, Col, Table, Button } from 'antd';

import style from './index.scss';

export default class index extends Component {
    renderMenuTable() {
        const dataSource = [
            { key: 1, name: '披萨' }
        ];
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
                    <Button className={style['delete-btn']}>
                        <span>X</span>
                    </Button>
                )
            },
        ];
        return (
            <Table
                pagination={false}
                className="menus-table"
                dataSource={dataSource}
                columns={columns}
                locale={{
                    emptyText: '菜单没有任何商品',
                }}
            />
        );
    }
    render() {
        return (
            <Row className={style.admin}>
                <Col className={style.left} sm={24} md={16}>添加新的披萨</Col>
                <Col className={style.right} sm={24} md={8}>
                    <h3>菜单</h3>
                    {this.renderMenuTable()}
                </Col>
            </Row>
        );
    }
}
