
import Coupon from "@/pages/Sender/Coupon";
import History from "@/pages/Sender/History";
import Parcel from "@/pages/Sender/Parcel";
import type { ISidebarItems } from "@/types";

export const senderSidebarItems: ISidebarItems[] = [
        {
            title: "Dashboard",
            items: [
                {
                    title: "History",
                    url: "/sender/history",
                    component: History
                },
            ]
        },
        {
            title: "Parcel Management",
            items: [
                {
                    title: "Parcel",
                    url: "/sender/parcel",
                    component: Parcel,
                },
            ]
        },
        {
            title: "Coupon Management",
            items: [
                {
                    title: "Coupon",
                    url: "/sender/coupon",
                    component: Coupon,
                },
            ]
        },
    ]