import { Platform, Text, View } from "react-native";

const styles = {
  container:
    "flex-1 items-center justify-center bg-slate-950 px-6",

  card:
    "w-full rounded-3xl border border-slate-800 bg-slate-900 px-7 py-8",

  icon:
    "mb-5 h-14 w-14 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10",

  iconText:
    "text-2xl",

  eyebrow:
    "mb-2 text-center text-xs font-semibold uppercase tracking-[2px] text-sky-400",

  title:
    "mb-3 text-center text-3xl font-bold tracking-tight text-white",

  subtitle:
    "mb-7 text-center text-sm leading-6 text-slate-400",

  divider:
    "mb-5 h-px w-full bg-slate-800",

  badge:
    "self-center flex-row items-center rounded-full border border-slate-700 bg-slate-950 px-4 py-2",

  dot:
    "mr-2 h-2 w-2 rounded-full bg-emerald-400",

  badgeText:
    "text-xs font-semibold text-slate-300",

  platform:
    "text-sky-400",
};

export function HelloWorld() {
  return (
    <View className={styles.container}>
      <View className={styles.card}>
        <View className={styles.icon}>
          <Text className={styles.iconText}>⚡</Text>
        </View>

        <Text className={styles.eyebrow}>
          React Native Multiplatform
        </Text>

        <Text className={styles.title}>
          Hello World
        </Text>

        <Text className={styles.subtitle}>
          One shared component, running across mobile and desktop
          with the same design system.
        </Text>

        <View className={styles.divider} />

        <View className={styles.badge}>
          <View className={styles.dot} />

          <Text className={styles.badgeText}>
            Running on{" "}
            <Text className={styles.platform}>
              {Platform.OS}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}