import { SidebarProvider } from "@/components/base/sidebar/sidebar"
import AppSidebar from "@/components/module/app-sidebar"
import React from "react"
import { Toaster } from "sonner"

interface Props {
    children: React.ReactNode
}

const MainLayout = ({
    children
}: Props) => {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <main className="p-4">
                {children}
            </main>
            <Toaster
                richColors
                position="top-right" 
                duration={1500}
            />
        </SidebarProvider>
    )
}

export default MainLayout