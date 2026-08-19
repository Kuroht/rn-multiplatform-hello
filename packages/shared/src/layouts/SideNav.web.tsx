type SideNavProps = {
  activeItem?: string;
  onItemPress?: (item: string) => void;
};

const navItems = ["Home", "Settings"];

export function SideNav({ activeItem = "Home", onItemPress }: SideNavProps) {
  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900 px-4 py-6">
      <div className="mb-8 px-3">
        <p className="text-xs font-semibold uppercase tracking-[2px] text-sky-400">
          React Native
        </p>
        <p className="mt-2 text-xl font-bold text-white">Workspace</p>
      </div>

      <nav className="flex flex-col gap-2" aria-label="Main navigation">
        {navItems.map((item) => {
          const isActive = item === activeItem;

          return (
            <button
              key={item}
              type="button"
              aria-current={isActive ? "page" : undefined}
              className={`rounded-xl px-3 py-3 text-left text-sm font-semibold ${
                isActive
                  ? "bg-sky-400/10 text-sky-400"
                  : "bg-transparent text-slate-400"
              }`}
              onClick={() => onItemPress?.(item)}
            >
              {item}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
