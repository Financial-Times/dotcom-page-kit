export default [
  {
    name: 'home',
    path: '/',
    component: () => import('./pages/Home')
  },
  {
    name: 'dogs',
    path: '/dogs',
    component: () => import('./pages/DogsList')
  },
  {
    name: 'dog-images',
    path: '/dogs/:breed',
    component: () => import('./pages/DogImages')
  },
  {
    name: 'terms',
    path: '/terms',
    component: () => import('./pages/Terms')
  }
]
