 
const state = {
    userName: "",
    userId: undefined,
    isLogin: false,
    userToken: undefined,
    UserScore: undefined,
    isAdmin: false
  };
  
  const getters = {};
  const actions = {};
  const mutations = {
    setUserName: (state, payload) => {
      state.userName = payload;
    },
    setUserScore: (state, payload) => {
      state.UserScore = payload;
    },
    addUserScore: (state, payload) => {
      state.UserScore += payload;
    },
    setToken: (state, payload) => {
      state.teamToken = payload;
    },
    enterAdminMode: state => {
      state.isAdmin = true;
    },
    login: state => {
      state.isLogin = true;
    },
    logout: state => {
      state.isLogin = false;
      state.userName = "";
      state.isAdmin = false;
      state.UserScore = undefined
    }
  };
  
  export default {
    state,
    getters,
    actions,
    mutations
  }