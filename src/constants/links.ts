export const LINKS = {
	main: '/',
	catalog: '/catalog',
	profile: '/profile',
	payment: '/payment',
	product: '/product/:id',
} as const;

export const NAVIGATION_LINKS = {
	Catalog: LINKS.catalog,
	Profile: LINKS.profile,
};
