import type { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
    <SafeAreaView className="flex-1 bg-slate-950">
      <View className="flex-1 flex-row">
        <SideNav
          activeItem={activeNavItem}
          onItemPress={onNavItemPress}
        />
        <View className="flex-1">{children}</View>
      </View>
    </SafeAreaView>
  );
}