/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthenticatedAnalyticsImport } from './routes/_authenticated/analytics'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const AuthenticatedDashboardLazyImport = createFileRoute(
  '/_authenticated/dashboard',
)()

// Create/Update Routes

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const AuthenticatedDashboardLazyRoute = AuthenticatedDashboardLazyImport.update(
  {
    path: '/dashboard',
    getParentRoute: () => AuthenticatedRoute,
  } as any,
).lazy(() =>
  import('./routes/_authenticated/dashboard.lazy').then((d) => d.Route),
)

const AuthenticatedAnalyticsRoute = AuthenticatedAnalyticsImport.update({
  path: '/analytics',
  getParentRoute: () => AuthenticatedRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated': {
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/analytics': {
      preLoaderRoute: typeof AuthenticatedAnalyticsImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/dashboard': {
      preLoaderRoute: typeof AuthenticatedDashboardLazyImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  AuthenticatedRoute.addChildren([
    AuthenticatedAnalyticsRoute,
    AuthenticatedDashboardLazyRoute,
  ]),
  LoginRoute,
])

/* prettier-ignore-end */
