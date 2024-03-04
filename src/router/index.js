import { createRouter, createWebHistory } from "vue-router";
 
function auth(to, from, next) {
  if (!localStorage.getItem("access_token")) {
    alert("Sessão expirou, favor realizar o login novamente")
    return next({ name: "login" });
  }
 
  next();
}
 
function guest(to, from, next) {
  if (localStorage.getItem("access_token")) {
    return next({ name: "enderecos.index" });
  }
 
  next();
}
 
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Auth/LoginView.vue"),
    },
    {
      path: "/login",
      name: "login",
      beforeEnter: guest,
      component: () => import("@/views/Auth/LoginView.vue"),
    },
    {
      path: "/enderecos",
      name: "enderecos.index",
      beforeEnter: auth,
      component: () => import("@/views/enderecos/IndexView.vue"),
    },
    

  ],
});
 
export default router;