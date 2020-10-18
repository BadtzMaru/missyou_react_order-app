import React from 'react';
import { Router, Switch } from 'dva/router';
import IndexPage from './pages/IndexPage';

import { SubRoutes } from './utils/SubRoutes';
import Home from './pages/Home';
import Menus from './pages/Menus';
import Admin from './pages/Admin';
import About from './pages/About';
import Login from './pages/User/Login';
import Register from './pages/User/Register';

const RouteConfig = [
	{
		path: '/', component: IndexPage, routes: [
			{ path: '/home', component: Home, redirect: true },
			{ path: '/menus', component: Menus },
			{ path: '/admin', component: Admin },
			{ path: '/about', component: About },
			{ path: '/login', component: Login },
			{ path: '/register', component: Register },
		]
	},
];

function RouterConfig({ history }) {
	return (
		<Router history={history}>
			<Switch>
				{
					RouteConfig.map((route, i) => (
						<SubRoutes key={i} {...route} />
					))
				}
			</Switch>
		</Router>
	);
}

export default RouterConfig;
