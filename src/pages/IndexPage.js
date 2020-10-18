import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
// 引入路由需要的组件
import { Switch } from 'dva/router';

import { SubRoutes, RedirectRoute, NoMatchRoute } from '../utils/SubRoutes';
import styles from './IndexPage.scss';
import NavBar from './NavBar';

const { Header, Content } = Layout;

function IndexPage(props) {
	const { routes } = props;
	return (
		<Layout className={styles.layout}>
			<Header className={styles.header}>
				<NavBar {...props} />
			</Header>
			<Content className={styles.content}>
				{/* 一级路由 */}
				<Switch>
					{
						routes.map((route, i) => (
							<SubRoutes key={i} {...route} />
						))
					}
					{/* 重定向 */}
					<RedirectRoute exact={true} from={"/"} routes={routes} />
					{/* 输入的连接不存在时,跳转到NoMatch */}
					<NoMatchRoute />
				</Switch>
			</Content>
		</Layout>
	);
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
