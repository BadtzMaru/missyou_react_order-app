import React from 'react';
import { connect } from 'dva';
import { Route, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';

import NoMatch from '../components/NoMatch';

const DynamicComponent = (app, model, component, routes, isAuthority, userInfo) => dynamic({
    app,
    models: () => model,
    component: () =>
        component().then(res => {
            if (isAuthority) {
                // 判断userInfo.id是否有内容
                if (!localStorage.key || !localStorage.email) {
                    return () => <Redirect to="/login" />;
                }
            }
            const Component = res.default || res;
            return props => <Component {...props} app={app} routes={routes} />;
        })
    ,
});

function SubRoutes({ routes, component, app, model, isAuthority, userInfo }) {
    return (
        <Route
            component={DynamicComponent(app, model, component, routes, isAuthority, userInfo)}
        />
    );
};

export default connect(({ global }) => ({
    userInfo: global.userInfo
}))(SubRoutes);

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