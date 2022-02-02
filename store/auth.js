export const state = () => ({
  user: null,
  isAdmin: false,
});

export const mutations = {
  LOGIN(state, user) {
    state.user = user;
    state.isAdmin = user.email == this.$config.admin || false;
  },
  LOGOUT(state) {
    state.user = null;
    state.isAdmin = false;
  },
  GET(state) {
    return state;
  },
};

export const actions = {
  LOGIN(state, user) {
    return new Promise((resolve) => {
      localStorage.setItem("user", JSON.stringify(user));
      state.commit("LOGIN", user);
      resolve(user);
    });
  },
  LOGOUT(state) {
    return new Promise((resolve) => {
      localStorage.removeItem("user");
      state.commit("LOGOUT");
      resolve(true);
    });
  },
  GET(state) {
    return state.state;
  },
};
