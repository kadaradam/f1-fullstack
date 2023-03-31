import { lazy, Suspense } from 'react';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';

const Root = lazy(() => import('./Root'));
const NotFoundRoute = lazy(() => import('./NotFound'));
const DriversRoute = lazy(() => import('./Drivers'));

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={
				<Suspense fallback={<LoadingScreen />}>
					<Root />
				</Suspense>
			}
			errorElement={<NotFoundRoute />}
		>
			<Route
				path="drivers"
				element={
					<Suspense fallback={<LoadingScreen />}>
						<DriversRoute />
					</Suspense>
				}
			/>
		</Route>,
	),
);

const RenderRoutes = () => (
	<RouterProvider router={router} fallbackElement={<LoadingScreen />} />
);

export default RenderRoutes;
