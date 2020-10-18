import React, { Component } from 'react';
import { Tabs } from 'antd';
import { Switch } from 'dva/router';

import style from './index.scss';
import SubRoutes, { RedirectRoute } from '../../utils/SubRoutes';

const { TabPane } = Tabs;

export default class index extends Component {
    // 点击Tab切换路由
    handleChangeTab = (key) => {
        if (this.props.location.pathname !== key) {
            this.props.history.push(key);
        }
    };
    render() {
        const { routes, app } = this.props;
        return (
            <div className={style.about}>
                <Tabs
                    className={style.tabs}
                    tabPosition="left"
                    activeKey={this.props.location.pathname}
                    onChange={this.handleChangeTab}
                >
                    <TabPane tab="历史订餐" key="/about/history"></TabPane>
                    <TabPane tab="联系我们" key="/about/contact"></TabPane>
                    <TabPane tab="点餐文档" key="/about/orderingGuide"></TabPane>
                    <TabPane tab="快递信息" key="/about/delivery"></TabPane>
                </Tabs >
                <div className={style.routes}>
                    <Switch>
                        {
                            routes.map((route, i) => (
                                <SubRoutes
                                    key={i}
                                    {...route}
                                    app={app}
                                />
                            ))
                        }
                        <RedirectRoute exact={true} from={"/about"} routes={routes} />
                    </Switch>
                </div>

            </div>
        );
    }
}
