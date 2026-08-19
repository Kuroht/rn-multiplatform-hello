import { Platform } from "react-native";

const styles = {
  container:
    "flex h-full w-full items-center justify-center bg-slate-950 px-6",

  card:
    "w-full max-w-[440px] rounded-3xl border border-slate-800 bg-slate-900 px-7 py-8",

  icon:
    "mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10",

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
    "flex w-fit items-center rounded-full border border-slate-700 bg-slate-950 px-4 py-2",

  dot:
    "mr-2 h-2 w-2 rounded-full bg-emerald-400",

  badgeText:
    "text-xs font-semibold text-slate-300",

  platform:
    "text-sky-400",
};

export function HelloWorld() {
  const platform = Platform.OS;

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <div className={styles.icon}>
          <span className={styles.iconText}>⚡</span>
        </div>

        <p className={styles.eyebrow}>
          React Native Multiplatform
        </p>

        <h1 className={styles.title}>
          Hello World
        </h1>

        <p className={styles.subtitle}>
          One shared component, running across mobile and desktop
          with the same design system.
        </p>

        <div className={styles.divider} />

        <div className={styles.badge}>
          <span className={styles.dot} />

          <span className={styles.badgeText}>
            Running on{" "}
            <span className={styles.platform}>
              {platform}
            </span>
          </span>
        </div>
      </section>
    </main>
  );
}