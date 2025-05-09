import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Outlet, useNavigate } from "react-router";
import { AppNewSidebar } from "./sidebar";


export default function LayoutPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  }

  return (
    <SidebarProvider>
      <AppNewSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between px-4 bg-white shadow-md">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-6" />
          </div>
          <Button onClick={()=>{handleClick()}} variant="outline">Login</Button>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
