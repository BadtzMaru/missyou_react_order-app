import React from 'react';
import { Router, Switch } from 'dva/router';

import { SubRoutes } from './utils/SubRoutes';

const RouteConfig = [
	{
		path: '/',
		component: () => import('./pages/IndexPage'),
		model: [],
		routes: [
			{ path: '/home', component: () => import('./pages/Home'), redirect: true, model: [import('./models/home')] },
			{ path: '/menus', component: () => import('./pages/Menus'), model: [] },
			{ path: '/admin', component: () => import('./pages/Admin'), model: [] },
			{ path: '/about', component: () => import('./pages/About'), model: [] },
			{ path: '/login', component: () => import('./pages/User/Login'), model: [] },
			{ path: '/register', component: () => import('./pages/User/Register'), model: [] },
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
