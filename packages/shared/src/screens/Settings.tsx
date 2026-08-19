import { Text, View } from "react-native";

export function Settings() {
const styles = {
  container:
    "flex-1 items-center justify-center bg-slate-950 px-6",

  title:
    "mb-3 text-3xl font-bold text-white",

  text:
    "text-center text-sm text-slate-400",
};

  return (
    <View  className={styles.container}>
      <Text className={styles.title}>Settings</Text>
      <Text className={styles.text}>
        Configure your workspace here.
      </Text>
    </View>
  );
}
