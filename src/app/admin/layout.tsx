import { SidebarAgencia } from "@/components/SidebarAgencia";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full font-sans text-foreground overflow-hidden bg-transparent">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <SidebarAgencia />
      </div>

      <div className="flex-1 flex flex-col p-2 md:p-4 md:pl-0 relative z-10 overflow-hidden">
        <div className="flex-1 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl rounded-[1.5rem] md:rounded-[2.5rem] border border-black/5 dark:border-white/10 flex flex-col overflow-hidden relative shadow-2xl">
          <header className="h-20 md:h-24 flex items-center px-6 md:px-10 justify-between shrink-0 border-b md:border-none border-black/5 dark:border-white/5">
            <div className="flex items-center gap-4">
              {/* Mobile Menu */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger className="p-2 -ml-2 text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors">
                    <Menu size={24} />
                  </SheetTrigger>
                  <SheetContent side="left" className="p-0 w-[280px] bg-background border-r-white/10">
                    <SidebarAgencia isMobile />
                  </SheetContent>
                </Sheet>
              </div>
              <h1 className="font-semibold text-xl md:text-2xl tracking-tight">Painel da Agência</h1>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
               <div className="hidden sm:block"><ThemeToggle /></div>
               <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gradient-to-tr from-emerald-600 to-cyan-500 p-[2px] shadow-lg shadow-emerald-500/20 cursor-pointer hover:scale-105 transition-transform">
                 <div className="h-full w-full rounded-full bg-background border border-border/50 overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="User" />
                 </div>
               </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-10 pt-0 hide-scrollbar">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
