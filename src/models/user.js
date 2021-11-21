import { testApi } from "../services/user";
export default {
  namespace: "user",
  state: {
    userInfo: {
      name: "demo",
    },
  },
  effects: {
    *update({ payload }, { put, call }) {
      console.log("payload: ", payload);
      const response = yield call(testApi);
      yield put({ type: "setState", payload: { userInfo: payload } });
      return response;
    },
  },
  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
