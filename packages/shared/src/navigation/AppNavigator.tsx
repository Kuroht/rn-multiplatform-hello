import {
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  NavigationContainer,
  type NavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";
import { HelloWorld } from "../HelloWorld";
import type { RootStackParamList } from "./routes";

enableScreens();

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: [],
  config: {
    screens: {
      Home: "",
      Settings: "settings",
    },
  },
};

function SettingsScreen() {
  return (
    <View style={styles.settings}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Your app settings will live here.</Text>
    </View>
  );
}

export function AppNavigator({
  navigationRef,
}: {
  navigationRef?: React.RefObject<NavigationContainerRef<RootStackParamList> | null>;
}) {
  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#020617" },
          headerTintColor: "#f8fafc",
          headerTitleStyle: { fontWeight: "700" },
          contentStyle: { backgroundColor: "#020617" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HelloWorld}
          options={({ navigation }) => ({
            title: "Home",
            headerRight: () => (
              <Button
                title="Settings"
                color="#38bdf8"
                onPress={() => navigation.navigate("Settings")}
              />
            ),
          })}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  settings: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#020617",
  },
  title: {
    marginBottom: 8,
    color: "#f8fafc",
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: 16,
  },
});