import Logo from "@/assets/icons/Logo"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Link, NavLink } from "react-router"
import { ModeToggle } from "./ModeToggler"
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { useAppDispatch } from "@/redux/hook"
import { role } from "@/constants/role"
import React from "react"


export default function Navbar() {
  // Navigation links array
  const navigationLinks = [
    { href: "/", label: "Home", role: "PUBLIC" },
    { href: "/about", label: "About", role: "PUBLIC" },
    { href: "/features", label: "Features", role: "PUBLIC" },
    { href: "/contact", label: "Contact", role: "PUBLIC" },
    { href: "/faq", label: "FAQ", role: "PUBLIC" },
    { href: "/admin", label: "Dashboard", role: role.admin },
    { href: "/sender", label: "Dashboard", role: role.sender },
    { href: "/receiver", label: "Dashboard", role: role.receiver },
  ]


  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  //console.log(data?.data?.email);

  
  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  return (
    <header className="sticky top-0 z-50 bg-accent/80 border-b px-4 md:px-6 uppercase">
      <div className="flex h-16 justify-between gap-4">
        {/* Left side */}
        <div className="flex gap-2">
          <div className="flex items-center md:hidden">
            {/* Mobile menu trigger */}
            <Popover>
              <PopoverTrigger asChild>
                <Button className="group size-8" variant="ghost" size="icon">
                  {/* Hamburger icon */}
                  <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-36 p-1 md:hidden">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                    {navigationLinks.map((link, index) => (
                    <React.Fragment key={index}>
                    {link.role === "PUBLIC" && (
                        <NavigationMenuItem key={index} className="w-full">
                        <NavLink
                          to={link.href}
                          className={({ isActive }) =>
                            `block py-1.5 w-full ${
                              isActive
                                ? "text-primary dark:text-foreground font-semibold border-b-2 border-b-primary hover:border-b-primary"
                                : "text-muted-foreground hover:text-primary dark:text-muted-foreground"
                            }`
                          }
                        >
                          {link.label}
                        </NavLink>
                      </NavigationMenuItem>
                      )}
                      {link.role === data?.data?.role && (
                        <NavigationMenuItem key={index} className="w-full">
                        <NavLink
                          to={link.href}
                          className={({ isActive }) =>
                            `block py-1.5 w-full ${
                              isActive
                                ? "text-primary dark:text-foreground font-semibold border-b-2 border-b-primary hover:border-b-primary"
                                : "text-muted-foreground hover:text-primary dark:text-muted-foreground"
                            }`
                          }
                        >
                          {link.label}
                        </NavLink>
                      </NavigationMenuItem>
                      )}
                      </React.Fragment>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
          </div>

          {/* Desktop nav */}
          <div className="flex items-center gap-6">
            <NavLink to="/" className="text-primary hover:text-primary/90">
              <Logo />
            </NavLink>
            <NavigationMenu className="h-full max-md:hidden">
              <NavigationMenuList className="h-full gap-2">
                {navigationLinks.map((link, index) => (
                  <React.Fragment key={index}>
                    {link.role === "PUBLIC" && (
                    <NavigationMenuItem key={index} className="h-full">
                    <NavLink
                      to={link.href}
                      className={({ isActive }) =>
                        `h-full justify-center border-b-2 px-3 py-1.5 font-medium transition-colors 
                        ${
                          isActive
                            ? "border-b-primary text-primary dark:text-foreground"
                            : "border-transparent text-muted-foreground hover:text-primary hover:border-b-primary"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </NavigationMenuItem>
                  )}
                  {link.role === data?.data?.role && (
                    <NavigationMenuItem key={index} className="h-full">
                    <NavLink
                      to={link.href}
                      className={({ isActive }) =>
                        `h-full justify-center border-b-2 px-3 py-1.5 font-medium transition-colors 
                        ${
                          isActive
                            ? "border-b-primary text-primary dark:text-foreground"
                            : "border-transparent text-muted-foreground hover:text-primary hover:border-b-primary"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </NavigationMenuItem>
                  )}
                  </React.Fragment>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle/>
            {data?.data?.email && (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-sm"
            >
              LOGOUT
            </Button>
          )}
          {!data?.data?.email && (
            <Button asChild className="text-sm dark:text-foreground">
              <Link to="/login">LOGIN</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
