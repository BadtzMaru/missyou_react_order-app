import React from 'react';
import { connect } from 'dva';

import style from './index.scss';

function index(props) {
    return (
        <div className={style.home}>
            <div className={style.background}>
                <h1>欢迎大家来到点餐系统</h1>
                <h2>这里有大家喜欢的pizza和小吃</h2>
                <p>{props.text}</p>
            </div>
        </div>
    );
}

// 关联 home.js 和 当前的组件 index.js(Home组件)
export default connect(({ home }) => ({ ...home }))(index);
