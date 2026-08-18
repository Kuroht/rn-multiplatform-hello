import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

export function HelloWorld() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World 👋</Text>
      <Text style={styles.subtitle}>
        This component lives in the shared package and is rendered by both
        Expo (native) and Electron (via react-native-web).
      </Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Running on: {Platform.OS}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#222d42",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#f8fafc",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
    maxWidth: 360,
    marginBottom: 20,
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
  },
  badgeText: {
    color: "#38bdf8",
    fontSize: 13,
    fontWeight: "600",
  },
});
