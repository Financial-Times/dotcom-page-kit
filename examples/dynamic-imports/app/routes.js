export default [
  {
    name: 'home',
    path: '/',
    component: () => import('./pages/Home')
  },
  {
    name: 'dogs',
    path: '/dogs',
    component: () => import('./pages/Dogs')
  }
]
