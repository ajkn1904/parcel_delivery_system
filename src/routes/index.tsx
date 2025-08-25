import App from '@/App'
import Dashboard from '@/components/layout/Dashboard'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import FAQ from '@/pages/FAQ'
import Features from '@/pages/Features'
import HomePage from '@/pages/HomePage'
import Login from '@/pages/Login'
import Registration from '@/pages/Registration'
import { createBrowserRouter} from 'react-router'

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
        ]
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
        Component: Dashboard,
        path: "/dashboard"
    },

])