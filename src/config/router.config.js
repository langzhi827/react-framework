module.exports = [
    {
        path: '/404',
        component: '@/routes/404',
    },
    {
        path: '/',
        component: '@/components/layouts/BaseLayout',
        dynamic: false,
        routes: [
            {
                breadcrumbName: '首页',
                path: '/app',
                component: '@/routes/app',
                routes: [
                    {
                        breadcrumbName: '测试',
                        path: '/app/test',
                        component: '@/routes/app/routes/test'
                    }
                ]
            },
            { from: '/', to: '/404' }
        ]
    }
];