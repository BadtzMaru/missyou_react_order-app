import React from 'react';
import { Router, Switch } from 'dva/router';

import SubRoutes from './utils/SubRoutes';

// 私有路由的开关
const isAuthority = true;

const RouteConfig = [
	{
		path: '/',
		component: () => import('./pages/IndexPage'),
		model: [],
		routes: [
			{
				path: '/home',
				component: () => import('./pages/Home'),
				redirect: true,
				model: [import('./models/home')],
				isAuthority,
			},
			{
				path: '/menus',
				component: () => import('./pages/Menus'),
				model: [],
				isAuthority,
			},
			{
				path: '/admin',
				component: () => import('./pages/Admin'),
				model: [],
				isAuthority,
			},
			{
				path: '/about',
				component: () => import('./pages/About'),
				model: [],
				isAuthority,
			},
			{
				path: '/login',
				component: () => import('./pages/User/Login'),
				model: [],
			},
			{
				path: '/register',
				component: () => import('./pages/User/Register'),
				model: [],
			},
		]
	},
];

function RouterConfig({ history, app }) {
	return (
		<Router history={history}>
			<Switch>
				{
					RouteConfig.map((route, i) => (
						<SubRoutes
							key={i}
							{...route}
							app={app}
						/>
					))
				}
			</Switch>
		</Router>
	);
}

export default RouterConfig;
