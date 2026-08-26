import { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { login, type AuthConfig, type TokenResponse } from "../auth/auth";

type LoginProps = {
  authConfig: AuthConfig;
  onAuthenticated: (tokens: TokenResponse) => void;
};

const styles = {
  container: "flex-1 justify-center bg-slate-950 px-6",
  card: "w-full rounded-3xl border border-slate-800 bg-slate-900 px-7 py-8",
  eyebrow: "mb-2 text-xs font-semibold uppercase tracking-[2px] text-sky-400",
  title: "mb-2 text-3xl font-bold text-white",
  subtitle: "mb-7 text-sm leading-6 text-slate-400",
  label: "mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400",
  input: "mb-4 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white",
  button: "mt-2 items-center rounded-xl bg-sky-400 px-4 py-3",
  buttonText: "font-bold text-slate-950",
  error: "mt-4 text-sm text-rose-400",
};

export function Login({ authConfig, onAuthenticated }: LoginProps) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    if (!user.trim() || !pass) {
      setError("Enter your username and password.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const tokens = await login(user.trim(), pass, authConfig);

      if (!tokens.access_token) {
        setError("The username or password is not valid.");
        return;
      }

      onAuthenticated(tokens);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Login failed.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View className={styles.container}>
      <View className={styles.card}>
        <Text className={styles.eyebrow}>Welcome back</Text>
        <Text className={styles.title}>Sign in</Text>
        <Text className={styles.subtitle}>Use your account to continue.</Text>

        <Text className={styles.label}>Username</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          className={styles.input}
          onChangeText={setUser}
          placeholder="Username"
          placeholderTextColor="#64748b"
          value={user}
        />

        <Text className={styles.label}>Password</Text>
        <TextInput
          autoCapitalize="none"
          className={styles.input}
          onChangeText={setPass}
          onSubmitEditing={handleLogin}
          placeholder="Password"
          placeholderTextColor="#64748b"
          secureTextEntry
          value={pass}
        />

        <Pressable
          accessibilityRole="button"
          className={styles.button}
          disabled={isLoading}
          onPress={handleLogin}
        >
          {isLoading ? (
            <ActivityIndicator color="#020617" />
          ) : (
            <Text className={styles.buttonText}>Continue</Text>
          )}
        </Pressable>

        {!!error && <Text className={styles.error}>{error}</Text>}
      </View>
    </View>
  );
}