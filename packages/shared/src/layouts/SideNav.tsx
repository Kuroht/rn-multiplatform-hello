import { Pressable, Text, View } from "react-native";

type SideNavProps = {
  activeItem?: string;
  onItemPress?: (item: string) => void;
};

const navItems = ["Home", "Settings"];

export function SideNav({ activeItem = "Home", onItemPress }: SideNavProps) {
  return (
    <View className="w-64 border-r border-slate-800 bg-slate-900 px-4 py-6">
      <View className="mb-8 px-3">
        <Text className="text-xs font-semibold uppercase tracking-[2px] text-sky-400">
          React Native
        </Text>
        <Text className="mt-2 text-xl font-bold text-white">Workspace</Text>
      </View>

      <View className="gap-2">
        {navItems.map((item) => {
          const isActive = item === activeItem;

          return (
            <Pressable
              key={item}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              className={`rounded-xl px-3 py-3 ${
                isActive ? "bg-sky-400/10" : "bg-transparent"
              }`}
              onPress={() => onItemPress?.(item)}
            >
              <Text
                className={`text-sm font-semibold ${
                  isActive ? "text-sky-400" : "text-slate-400"
                }`}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
