/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
	path: '/',
	component: () => import('@/views/layouts/index'),
	redirect: '/home',
	meta: {
		title: '首页',
		keepAlive: false
	},
	children: [{
			path: '/home',
			name: 'Home',
			component: () => import('@/views/home/index'),
			meta: {
				title: '首页',
				keepAlive: false,
				tabBar:true,  //是否显示底部标签栏 true 显示 false不显示
				navBar:false, //是否显示顶部导航栏 true 显示 false不显示
				//requireAuth:true //是否需要登录才能进
			}
		},
		{
			path: '/register',
			name: 'Register',
			component: () => import('@/views/home/register'),
			meta: {
				title: '注册',
				keepAlive: false,
				tabBar:false,
				navBar:false
			}
		},
		{
			path: '/login',
			name: 'Login',
			component: () => import('@/views/home/login'),
			meta: {
				title: '登录',
				keepAlive: false,
				tabBar:false,
				navBar:false
			}
		},
		{
			path: '/productDetails',
			name: 'ProductDetails',
			component: () => import('@/views/productDetails/productDetails'),
			meta: {
				title: '商品详情',
				keepAlive: false,
				tabBar:false,
				navBar:true
			}
		},
		{
			path: '/cart',
			name: 'Cart',
			component: () => import('@/views/cart/cart'),
			meta: {
				title: '购物车',
				keepAlive: false,
				tabBar:false,
				navBar:true,
				requireAuth:true
				
			}
		},
		{
			path: '/creationOrder',
			name: 'CreationOrder',
			component: () => import('@/views/order/creationOrder'),
			meta: {
				title: '创建订单',
				keepAlive: false,
				tabBar:false,
				navBar:true,
				requireAuth:true
			}
		},
		{
			path: '/order',
			name: 'Order',
			component: () => import('@/views/order/order'),
			meta: {
				title: '订单详情',
				keepAlive: false,
				tabBar:false,
				navBar:true,
				requireAuth:true
			}
		},
		{
			path: '/orderType',
			name: 'OrderType',
			component: () => import('@/views/order/orderType'),
			meta: {
				title: '订单',
				keepAlive: false,
				tabBar:true,
				navBar:true,
				requireAuth:true
			}
		},
		
		{
			path: '/contactList',
			name: 'ContactList',
			component: () => import('@/views/contactList/contactList'),
			meta: {
				title: '联系人列表',
				keepAlive: false,
				tabBar:false,
				navBar:true,
				requireAuth:true
			}
		},
		{
			path: '/newContact',
			name: 'NewContact',
			component: () => import('@/views/contactList/newContact'),
			meta: {
				title: '联系人',
				keepAlive: false,
				tabBar:false,
				navBar:true,
				requireAuth:true
			}
		},
		{
			path: '/productClassify',
			name: 'ProductClassify',
			component: () => import('@/views/classify/productClassify'),
			meta: {
				title: '商品分类',
				keepAlive: false,
				tabBar:true,
				navBar:true
			}
		},
		{
			path: '/paySuccess',
			name: 'PaySuccess',
			component: () => import('@/views/order/paySuccess'),
			meta: {
				title: '支付成功',
				keepAlive: false,
				tabBar:false,
				navBar:true,
				requireAuth:true
			}
		},
		{
			path: '/userIndex',
			name: 'User',
			component: () => import('@/views/user/index'),
			meta: {
				title: '',
				keepAlive: false,
				tabBar:true,
				navBar:false,
				requireAuth:true
			}
		},

		
		{
			path: '/productList',
			name: 'ProductList',
			component: () => import('@/views/productList/productList'),
			meta: {
				title: '商品列表',
				keepAlive: false,
				tabBar:true,
				navBar:true
			}
		},

		{
			path: '/collect',
			name: 'Collect',
			component: () => import('@/views/collect/collect'),
			meta: {//我的收藏或者足迹
				title: '我的收藏',
				keepAlive: false,
				tabBar:false,
				navBar:true,
				requireAuth:true //是否需要登录才能进
			}
		},
		{
			path: '/rpwd',
			name: 'Rpwd',
			component: () => import('@/views/user/rpwd'),
			meta: {
				title: '修改密码',
				keepAlive: false,
				tabBar:true,
				navBar:true,
				requireAuth:true
			}
		},
		{
			path: '/wallet',
			name: 'Wallet',
			component: () => import('@/views/user/wallet'),
			meta: {
				title: '我的钱包',
				keepAlive: false,
				tabBar:true,
				navBar:true,
				requireAuth:true
			}
		},
		{
			path: '/search',
			name: 'Search',
			component: () => import('@/views/home/search'),
			meta: {
				title: '搜索',
				keepAlive: false,
				tabBar:true,
				navBar:false
			}
		},
		
		{
			path: '/nullPage',
			name: 'NullPage',
			component: () => import('@/views/home/nullPage'),
			meta: {
				title: '404',
				keepAlive: false,
				tabBar:true,
				navBar:false,
				requireAuth:false
			}
		},
		

	]
}]
