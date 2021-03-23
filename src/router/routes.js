const routes = [
  {
    name: 'login',
    path: '/login',
    component: () => import("../views/login/login.vue"),
    meta: {
      title: '登录界面'
    }
  }
];

export default routes;
