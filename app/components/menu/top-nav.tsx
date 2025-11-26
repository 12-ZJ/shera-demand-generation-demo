"use client"

import NavLink from "./nav-link"
import { useUserStore } from "@/app/store"
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/public/images/shera-logo.png";
import { HiOutlineLogout } from "react-icons/hi";

export default function TopNav() {
    const { userInfo } = useUserStore((state) => state);
    const router = useRouter();

    const handleLogout = async () => {
        // await signOut();
        // localStorage.clear();
        // router.replace("/login");
        router.refresh();
    }
    return (
        <div className="flex gap-10 h-full px-2">
            <div className="w-[10%] grid items-center justify-center p-2">
                <Image src={Logo} alt={"Logo"} width={90} />
                <div className="text-[10px] text-center">Demand Generation</div>
            </div>

            <div className="w-[70%]">
                <NavLink />
            </div>

            <div className="w-[20%] flex justify-end items-center gap-2">
                <span> { userInfo.fullname } </span>
                <button onClick={handleLogout}>
                    <HiOutlineLogout size={18} className="cursor-pointer text-theme_topic mr-2" />
                </button>
            </div>
        </div>
    )
}