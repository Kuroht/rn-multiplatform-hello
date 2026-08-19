import type { ReactNode } from "react";
import { SideNav } from "./SideNav";

type MainLayoutProps = {
  children: ReactNode;
  activeNavItem?: string;
  onNavItemPress?: (item: string) => void;
};

export function MainLayout({
  children,
  activeNavItem,
  onNavItemPress,
}: MainLayoutProps) {
  return (
    <main className="flex h-full min-h-screen w-full bg-slate-950">
      <SideNav
        activeItem={activeNavItem}
        onItemPress={onNavItemPress}
      />
      <section className="min-w-0 flex-1">{children}</section>
    </main>
  );
}
