module.exports = [
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