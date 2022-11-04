import { Flex, Spinner } from '@chakra-ui/react';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom';
import JobApply from '../pages/jobApply/JobApply';

import { JobDetailPage } from '../pages/JobDetailPage/JobDetailPage';
import JobsApplied from '../pages/jobsApplied/JobsApplied';
import MyAccount from '../pages/myAccount/MyAccount';
import Recover from '../pages/recover/Recover';
import { webRoutes } from '../utilities/web.routes';
import { OnlyGuestRoute, ProtectedRoute } from './components';

const SignIn = lazy(() => import('../pages/signIn/SignIn'));
const SignUp = lazy(() => import('../pages/signUp/SignUp'));
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));

export function Router() {
	return (
		<BrowserRouter>
			<ReactRoutes>
				{
					// Public routes
				}
				<Route
					path={webRoutes.login}
					element={
						<Suspense
							fallback={
								<Flex alignItems={'center'} justifyContent={'center'} py={10}>
									<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.500" size="xl" />
								</Flex>
							}
						>
							<OnlyGuestRoute>
								<SignIn />
							</OnlyGuestRoute>
						</Suspense>
					}
				/>

				<Route
					path={webRoutes.register}
					element={
						<Suspense
							fallback={
								<Flex alignItems={'center'} justifyContent={'center'} py={10}>
									<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.500" size="xl" />
								</Flex>
							}
						>
							<OnlyGuestRoute>
								<SignUp />
							</OnlyGuestRoute>
						</Suspense>
					}
				/>
				<Route path={webRoutes.companies} element={<p>Companies page</p>} />

				<Route
					index
					path={webRoutes.root}
					element={
						<Suspense
							fallback={
								<Flex alignItems={'center'} justifyContent={'center'} py={10}>
									<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.500" size="xl" />
								</Flex>
							}
						>
							<HomePage />
						</Suspense>
					}
				/>

				<Route
					index
					path={webRoutes.recover}
					element={
						<Suspense
							fallback={
								<Flex alignItems={'center'} justifyContent={'center'} py={10}>
									<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.500" size="xl" />
								</Flex>
							}
						>
							<OnlyGuestRoute>
								<Recover />
							</OnlyGuestRoute>
						</Suspense>
					}
				/>

				<Route path={webRoutes.jobsV2 + '/:id'} element={<JobDetailPage />} />
				{
					// Protected routes
				}
				<Route
					path="/profile"
					element={
						<ProtectedRoute>
							<MyAccount />
						</ProtectedRoute>
					}
				/>

				<Route
					path={webRoutes.apply}
					element={
						<ProtectedRoute>
							<JobApply />
						</ProtectedRoute>
					}
				/>
				<Route
					path={webRoutes.jobsApplied}
					element={
						<ProtectedRoute>
							<JobsApplied />
						</ProtectedRoute>
					}
				/>
			</ReactRoutes>
		</BrowserRouter>
	);
}
