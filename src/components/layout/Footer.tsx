import Logo from "@/assets/icons/Logo";
import { Dribbble, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto container space-y-8 px-4 py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="text-foreground">
              <Logo />
            </div>

            <p className="mt-4 max-w-xs text-muted-foreground/80">
              Worldwide fast & reliable parcel delivery service with thousands of happy customers.
            </p>

            <ul className="mt-8 flex gap-6">
              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 dark:text-muted-foreground transition hover:opacity-75"
                >
                  <span className="sr-only">Facebook</span>

                  <Facebook/>
                    </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 dark:text-muted-foreground transition hover:opacity-75"
                >
                  <span className="sr-only">Instagram</span>

                  <Instagram />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 dark:text-muted-foreground transition hover:opacity-75"
                >
                  <span className="sr-only">Twitter</span>

                  <Twitter />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 dark:text-muted-foreground transition hover:opacity-75"
                >
                  <span className="sr-only">LinkedIn</span>

                  <Linkedin />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 dark:text-muted-foreground transition hover:opacity-75"
                >
                  <span className="sr-only">Dribbble</span>

                  <Dribbble/>
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium text-gray-900 dark:text-foreground">Services</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-muted-foreground transition hover:opacity-75"
                  >
                    {" "}
                    1on1 Coaching{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-muted-foreground transition hover:opacity-75"
                  >
                    {" "}
                    Company Review{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-muted-foreground transition hover:opacity-75"
                  >
                    {" "}
                    Accounts Review{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-muted-foreground transition hover:opacity-75"
                  >
                    {" "}
                    HR Consulting{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-muted-foreground transition hover:opacity-75"
                  >
                    {" "}
                    SEO Optimisation{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900 dark:text-foreground">Company</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-muted-foreground transition hover:opacity-75"
                  >
                    {" "}
                    About{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-muted-foreground transition hover:opacity-75"
                  >
                    {" "}
                    Meet the Team{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-muted-foreground transition hover:opacity-75"
                  >
                    {" "}
                    Accounts Review{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900 dark:text-foreground">Helpful Links</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-muted-foreground transition hover:opacity-75"
                  >
                    {" "}
                    Contact{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-muted-foreground transition hover:opacity-75"
                  >
                    {" "}
                    FAQs{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-muted-foreground transition hover:opacity-75"
                  >
                    {" "}
                    Live Chat{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900 dark:text-foreground">Legal</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-muted-foreground transition hover:opacity-75"
                  >
                    {" "}
                    Accessibility{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-muted-foreground transition hover:opacity-75"
                  >
                    {" "}
                    Returns Policy{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-muted-foreground transition hover:opacity-75"
                  >
                    {" "}
                    Refund Policy{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-muted-foreground transition hover:opacity-75"
                  >
                    Hiring-3 Statistics
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500">
          &copy; 2025 | Anika Jumana Khanam | All rights reserved.
        </p>
      </div>
    </footer>
  );
}