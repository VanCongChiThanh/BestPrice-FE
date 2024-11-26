import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/user/HomeView.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import CrawlView from "../views/admin/CrawlView.vue";
import ProductManagement from "../views/admin/ProductManagement.vue";
import product from "../views/user/ProductView.vue";
import productprice from "../views/user/ProductPrice.vue";
import DashBoard from "@/views/admin/DashBoard.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/product/:id?", // id category
    name: "product",
    component: product,
    props: true,
  },
  {
    path: "/productprice/:id",
    name: "productprice",
    component: productprice,
    props: true,
  },
  {
    path: "/admin",
    component: AdminLayout,
    redirect: "/admin/dashboard",
    children: [
      {
        path: "crawl",
        component: CrawlView,
        name: "adminCrawl",
      },
      {
        path: "product",
        component: ProductManagement,
        name: "productManagement",
      },
      {
        path: "dashboard",
        component: DashBoard,
        name: "Dashboard",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
