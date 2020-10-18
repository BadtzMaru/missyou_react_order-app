import React from 'react';

import style from './index.scss';

export default function index() {
    return (
        <div className={style.home}>
            <div className={style.background}>
                <h1>欢迎大家来到点餐系统</h1>
                <h2>这里有大家喜欢的pizza和小吃</h2>
            </div>
        </div>
    );
}
