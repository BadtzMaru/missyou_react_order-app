export default {

	namespace: 'global',

	state: {
		userInfo: {
			email: null,
			pwd: null,
			key: null,
		},
	},

	subscriptions: {},

	effects: {
		*setUserInfo({ payload }, { put }) {
			yield put({
				type: 'set_userinfo',
				payload,
			});
		}
	},

	reducers: {
		set_userinfo(state, { payload }) {
			return { ...state, userInfo: payload };
		},
	},

};
