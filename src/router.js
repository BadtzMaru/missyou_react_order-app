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
				routes: [
					{
						path: '/about/history',
						model: [],
						component: () => import('./pages/About/History'),
					},
					{
						path: '/about/contact',
						model: [],
						component: () => import('./pages/About/Contact'),
						routes: [
							{
								path: '/about/contact/phone',
								model: [],
								component: () => import('./pages/About/Phone'),
							},
							{
								path: '/about/contact/address',
								model: [],
								component: () => import('./pages/About/Address'),
							},
						]
					},
					{
						path: '/about/orderingGuide',
						model: [],
						component: () => import('./pages/About/OrderingGuide'),
					},
					{
						path: '/about/delivery',
						model: [],
						component: () => import('./pages/About/Delivery'),
					},
				]
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
