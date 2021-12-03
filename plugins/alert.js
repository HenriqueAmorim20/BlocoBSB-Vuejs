export default ({ app, store }, inject) => {
  inject('alert', {
    info (content = '') {
      store.commit('alert/showMessage', { content, color: '#1976d2', icon: 'info' })
    },
    error (content = '') {
      store.commit('alert/showMessage', { content, color: '#f44336', icon: 'error' })
    },
    warning (content = '') {
      store.commit('alert/showMessage', { content, color: '#ff9800', icon: 'warning' })
    },
    success (content = '') {
      store.commit('alert/showMessage', { content, color: '#82B152', icon: 'success' })
    },
  })
}

