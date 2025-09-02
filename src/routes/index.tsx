import App from '@/App'
import { role } from '@/constants/role'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import FAQ from '@/pages/FAQ'
import Features from '@/pages/Features'
import HomePage from '@/pages/HomePage'
import Login from '@/pages/Login'
import Registration from '@/pages/Registration'
import type { TRole } from '@/types'
import { createBrowserRouter, Navigate } from 'react-router'
import { adminSidebarItems } from './adminSidebarItems'
import { senderSidebarItems } from './senderSidebarItems'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from '@/utils/withAuth'
import { receiverSidebarItems } from './receiverSidebarItems'
import Tracking from '@/pages/Tracking'
import CreateParcel from '@/components/modules/sender/CreateParcel'
import Unauthorized from '@/pages/Unauthorized'
import NotFound from '@/pages/NotFound'

export const router = createBrowserRouter([
    {
        Component: App,
        path: '/',
        children: [
            {
                Component: HomePage,
                path: "/"
            },
            {
                Component: About,
                path: "about"
            },
            {
                Component: Features,
                path: "features"
            },
            {
                Component: Contact,
                path: "contact"
            },
            {
                Component: FAQ,
                path: "faq"
            },
            {
                Component: Login,
                path: "/login"
            },
            {
                Component: Registration,
                path: "/register"
            },
            {
                Component: NotFound,
                path: "*"
            },
            {
                Component: Unauthorized,
                path: "/unauthorized"
            },
            
            {
                Component: withAuth(Tracking),
                path: "/tracking/:parcelId"
            },
            {
                Component: withAuth(CreateParcel),
                path: "/parcel/create"
            },
            {
                    Component: withAuth(DashboardLayout, (role.admin) as TRole),
                    path: "/admin",
                    children: [
                        { index: true, element: <Navigate to="/admin/analytics" /> },
                        ...generateRoutes(adminSidebarItems)
                    ]
            },
            {
                Component: withAuth(DashboardLayout, role.sender as TRole),
                path: "/sender",
                children: [
                    { index: true, element: <Navigate to="/sender/history" /> },
                    ...generateRoutes(senderSidebarItems)
                ]
            },
            {
                Component: withAuth(DashboardLayout, role.receiver as TRole),
                path: "/receiver",
                children: [
                    { index: true, element: <Navigate to="/receiver/history" /> },
                    ...generateRoutes(receiverSidebarItems)
                ]
            },
        ]
    },
    

])
