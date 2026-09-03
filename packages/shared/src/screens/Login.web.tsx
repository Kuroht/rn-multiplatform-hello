import { useState } from "react";
import { login, type AuthConfig, type TokenResponse } from "../auth/auth";

type LoginProps = {
  authConfig: AuthConfig;
  onAuthenticated: (tokens: TokenResponse) => void;
};

const styles = {
  container: "flex h-full w-full items-center justify-center bg-slate-950 px-6",
  card: "w-full max-w-[440px] rounded-3xl border border-slate-800 bg-slate-900 px-7 py-8",
  eyebrow: "mb-2 text-xs font-semibold uppercase tracking-[2px] text-sky-400",
  title: "mb-2 text-3xl font-bold text-white",
  subtitle: "mb-7 text-sm leading-6 text-slate-400",
  label: "mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400",
  input: "mb-4 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-600",
  button: "mt-2 w-full items-center justify-center rounded-xl bg-sky-400 px-4 py-3 font-bold text-slate-950 cursor-pointer hover:bg-sky-300 transition-colors",
  debugButton: "mt-4 w-full rounded-xl bg-slate-700 px-4 py-3 text-xs font-bold text-slate-300 cursor-pointer hover:bg-slate-600 transition-colors",
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

  function handleDebugBypass() {
    onAuthenticated({
      access_token: "debug-token",
      token_type: "Bearer",
    } as TokenResponse);
  }

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <p className={styles.eyebrow}>Welcome back</p>
        <h1 className={styles.title}>Sign in</h1>
        <p className={styles.subtitle}>Use your account to continue.</p>

        <label className={styles.label}>Username</label>
        <input
          autoCapitalize="off"
          autoComplete="username"
          className={styles.input}
          onChange={(e) => setUser((e.target as unknown as { value: string }).value)}
          placeholder="Username"
          type="text"
          value={user}
        />

        <label className={styles.label}>Password</label>
        <input
          autoCapitalize="off"
          autoComplete="current-password"
          className={styles.input}
          onChange={(e) => setPass((e.target as unknown as { value: string }).value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          placeholder="Password"
          type="password"
          value={pass}
        />

        <button
          className={styles.button}
          disabled={isLoading}
          onClick={handleLogin}
        >
          {isLoading ? "Signing in..." : "Continue"}
        </button>

        <button
          className={styles.debugButton}
          onClick={handleDebugBypass}
          type="button"
        >
          DEBUG: Skip Login
        </button>

        {!!error && <p className={styles.error}>{error}</p>}
      </section>
    </main>
  );
}
