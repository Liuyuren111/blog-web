export const routes = [
    {
        path: "/",
        name: "layout",
        component: () => import("../view/LayoutPage.vue"),
        redirect: '/index',
        children: [
            {
                path: "/index",
                name: "index",
                component: () => import("../view/index/IndexPage.vue"),
                meta: {
                    title: '首页',
                    icon: ''
                }
            },
            {
              path: "/article",
              name: "article",
              redirect: '/article/list',
              children: [
                {
                  path: "/article/list",
                  name: "articleList",
                  component: () => import("../view/article/ArticleList.vue"),
                  meta: {
                    title: '文章列表',
                    icon: ''
                  }
                },
                {
                  path: "/article/add",
                  name: "articleAdd",
                  component: () => import("../view/article/ReleaseArticle.vue"),
                  meta: {
                    title: '新增文章',
                    icon: ''
                  }
                },
              ],
              meta: {
                title: '文章管理',
                icon: ''
              }
            },
            {
                path: "/user",
                name: "user",
                component: () => import("../view/user/UserPage.vue"),
                meta: {
                    title: '用户管理',
                    icon: ''
                }
            },
            {
                path: "/tag",
                name: "tag",
                component: () => import("../view/tag/TagPage.vue"),
                meta: {
                    title: '标签管理',
                    icon: ''
                }
            },
            {
                path: "/data",
                name: "data",
                component: () => import("../view/data/DataPage.vue"),
                meta: {
                    title: '数据统计',
                    icon: ''
                }
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../view/login/LoginPage.vue"),
    },
];
