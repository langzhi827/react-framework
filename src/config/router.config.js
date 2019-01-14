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
                path: '/app',
                component: '@/routes/app',
                routes: [
                    {
                        path: '/app/test',
                        component: '@/routes/app/routes/test'
                    }
                ]
            },
            { from: '/', to: '/404' }
        ]
    }
];