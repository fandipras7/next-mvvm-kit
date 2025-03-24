import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/base/collapsible"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from "@/components/base/sidebar/sidebar"
import { Calendar, ChevronDown, Home, Inbox, Search, Settings, Pointer } from "lucide-react"

const AppSidebar = () => {
    const items = [
        {
            title: "Home",
            url: "#",
            icon: Home,
        },
        {
            title: "Inbox",
            url: "#",
            icon: Inbox,
        },
        {
            title: "Calendar",
            url: "#",
            icon: Calendar,
        },
        {
            title: "Search",
            url: "#",
            icon: Search,
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings,
        },
    ]

    const item_2 = [
        {
            title: "Test 2",
            url: "#",
            icon: Search,
        },
        {
            title: "Test 3",
            url: "#",
            icon: Settings,
        },
    ]
    return (
        <div>
            <Sidebar>
                <Collapsible defaultOpen className="group/collapsible">
                    <SidebarGroup>
                        <SidebarGroupLabel asChild>
                            <CollapsibleTrigger>
                                Help
                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>
                    </SidebarGroup>
                    <CollapsibleContent>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </CollapsibleContent>
                </Collapsible>
                <Collapsible defaultOpen className="group/collapsible">
                    <SidebarGroup>
                        <SidebarGroupLabel asChild>
                            <CollapsibleTrigger>
                                Help 2
                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>
                    </SidebarGroup>
                    <CollapsibleContent>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item_2.map((item) => (
                                    <Collapsible defaultOpen className="group/collapsible">
                                        <SidebarMenuItem key={item.title}>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton asChild>
                                                    <a href={item.url}>
                                                        <item.icon />
                                                        <span>{item.title}</span>
                                                    </a>
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    <SidebarMenuSubItem>
                                                        <CollapsibleTrigger asChild>
                                                            <SidebarMenuButton asChild>
                                                                <a href={"#"}>
                                                                    <Pointer />
                                                                    <span>Sub Item</span>
                                                                </a>
                                                            </SidebarMenuButton>
                                                        </CollapsibleTrigger>
                                                    </SidebarMenuSubItem>
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </CollapsibleContent>
                </Collapsible>
            </Sidebar>
        </div>
    )
}

export default AppSidebar