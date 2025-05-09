"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/useAuth";

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const { isLoggedIn } = useAuth();
  // Define the menu items based on the login state
  // You can replace this with your actual logic to check if the user is logged in
  // For example, you might want to check a token in local storage or a global state  
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const isLoggedIn = true; // Example: replace with actual login check
  // const isLoggedIn = false; // Example: replace with actual login check
  const loggedOutMenu = [
    { title: "Home", url: "/" },
    { title: "Login", url: "/login" },
    { title: "Register", url: "/register" },
  ];

  const loggedInMenu = [
    { title: "Post a Service", url: "/services/post" },
    { title: "My Services", url: "/services/my-services" },
    { title: "Browse Services", url: "/services/browse" },
    { title: "Delete a Service", url: "/services/delete" },
  ];

  const menuItems = isLoggedIn ? loggedInMenu : loggedOutMenu;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
