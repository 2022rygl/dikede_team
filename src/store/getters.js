const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  userInfo: state => state.user.userInfo,
  detailInfo: state => state.user.detailInfo,
  userName: state => state.user.userInfo.userName
}
export default getters
