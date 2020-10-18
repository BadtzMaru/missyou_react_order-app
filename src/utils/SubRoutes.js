import React from 'react';
import { Route, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';

import NoMatch from '../components/NoMatch';

const DynamicComponent = (app, model, component, routes) => dynamic({
    app,
    models: () => model,
    component: () =>
        component().then(res => {
            const Component = res.default || res;
            return props => <Component {...props} app={app} routes={routes} />;
        })
    ,
});

export function SubRoutes({ routes, component, app, model }) {
    return (
        <Route
            component={DynamicComponent(app, model, component, routes)}
        />
    );
}

// 从定向封装组件
export function RedirectRoute({ routes, from, exact }) {
    const routeR = routes.filter(item => {
        return item.rediirect;
    });
    const to = routeR.length ? routeR[0].path : routes[0].path;
    return <Redirect exact={exact} from={from} to={to} />;
}

export function NoMatchRoute({ status = 404 }) {
    return (
        <Route
            render={props => <NoMatch {...props} status={status} />
            }
        />
    );
}