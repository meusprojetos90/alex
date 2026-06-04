"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Home, Building2, Users, Triangle, DollarSign } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function SidebarAgencia({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname() || '';
  const [isHovered, setIsHovered] = useState(false);
  const isExpanded = isMobile || isHovered;

  const NavItem = ({ href, icon: Icon, label, active = false }: { href: string, icon: any, label: string, active?: boolean }) => {
    return (
      <Link href={href} className={`flex items-center h-14 w-full rounded-3xl transition-all duration-300 group relative px-4 overflow-hidden ${active ? 'bg-zinc-100 dark:bg-zinc-800 text-foreground shadow-xl border border-black/5 dark:border-white/10' : 'text-zinc-500 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'}`}>
        <div className="flex items-center justify-center min-w-[36px] h-full shrink-0">
          <Icon size={22} strokeWidth={active ? 2 : 1.5} className="relative z-10" />
        </div>
        {active && <span className="absolute left-0 w-1.5 h-8 bg-emerald-500 rounded-r-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>}
        
        <span className={`ml-3 font-medium whitespace-nowrap transition-all duration-300 ${isExpanded ? 'opacity-100 max-w-[200px] delay-100' : 'opacity-0 max-w-0'}`}>
          {label}
        </span>
      </Link>
    );
  };

  return (
    <div 
      className={`shrink-0 h-screen bg-background dark:bg-black flex flex-col py-8 hide-scrollbar relative z-20 transition-all duration-300 ease-out ${isExpanded ? 'w-full md:w-64' : 'w-[100px]'}`}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      <div className={`flex items-center mb-10 px-6 overflow-hidden h-14 shrink-0 transition-all duration-300 ${isExpanded ? 'justify-start' : 'justify-center'}`}>
        <div className="w-14 h-14 shrink-0 rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-900 p-[1px] shadow-lg shadow-emerald-900/30">
          <div className="w-full h-full bg-background/50 dark:bg-black/50 backdrop-blur-md rounded-3xl flex items-center justify-center text-foreground">
            <Triangle size={20} strokeWidth={2} className="text-emerald-600 dark:text-emerald-400 fill-emerald-500/20" />
          </div>
        </div>
        <div className={`ml-4 overflow-hidden transition-all duration-300 flex flex-col justify-center ${isExpanded ? 'opacity-100 max-w-[200px] delay-100' : 'opacity-0 max-w-0'}`}>
          <h2 className="font-bold text-lg leading-tight whitespace-nowrap text-foreground">Agência</h2>
          <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Painel Admin</p>
        </div>
      </div>
      
      <nav className="flex flex-col gap-2 flex-1 overflow-y-auto hide-scrollbar w-full px-4">
        <NavItem href="/admin/dashboard" icon={Home} label="Dashboard" active={pathname === '/admin/dashboard'} />
        <NavItem href="/admin/autoescolas" icon={Building2} label="Autoescolas" active={pathname.includes('/admin/autoescolas')} />
        <NavItem href="/admin/relatorios" icon={Triangle} label="Relatórios" active={pathname.includes('/admin/relatorios')} />
        <NavItem href="/admin/financeiro" icon={DollarSign} label="Financeiro" active={pathname.includes('/admin/financeiro')} />
        <NavItem href="/admin/usuarios" icon={Users} label="Usuários" active={pathname.includes('/admin/usuarios')} />
      </nav>
    </div>
  );
}
