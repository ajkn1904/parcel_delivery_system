import History from "@/pages/Receiver/History";
import Parcel from "@/pages/Receiver/Parcel";
import type { ISidebarItems } from "@/types";

export const receiverSidebarItems: ISidebarItems[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "History",
                url: "/receiver/history",
                component: History
            },
        ]
    },
    {
        title: "Parcel Management",
        items: [
            {
                title: "Parcel",
                url: "/receiver/parcel",
                component: Parcel,
            },
        ]
    }
]