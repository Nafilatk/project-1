type TabKey = "personal" | "security" | "account";

interface TabsProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export default function TabsComponent({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className="border-b border-blue-900/40 px-8 pt-6 bg-black/50 backdrop-blur-sm">
      <div className="flex gap-8 text-sm font-bold tracking-wide">
        <button
          className={`group relative pb-4 transition-all duration-300 ${
            activeTab === "personal"
              ? "text-white border-b-2 border-blue-400 scale-[1.05]"
              : "text-blue-400/70 hover:text-blue-300 hover:scale-[1.02]"
          }`}
          onClick={() => onTabChange("personal")}
        >
          <span className="relative z-10">Personal Info</span>
          {activeTab === "personal" && (
            <div className="absolute -inset-x-2 -bottom-1 h-1 bg-linear-to-r from-blue-400 to-blue-500 rounded-full blur-sm opacity-70" />
          )}
        </button>
        
        <button
          className={`group relative pb-4 transition-all duration-300 ${
            activeTab === "security"
              ? "text-white border-b-2 border-blue-400 scale-[1.05]"
              : "text-blue-400/70 hover:text-blue-300 hover:scale-[1.02]"
          }`}
          onClick={() => onTabChange("security")}
        >
          <span className="relative z-10">Login & Security</span>
          {activeTab === "security" && (
            <div className="absolute -inset-x-2 -bottom-1 h-1 bg-linear-to-r from-blue-400 to-blue-500 rounded-full blur-sm opacity-70" />
          )}
        </button>
        
        <button
          className={`group relative pb-4 transition-all duration-300 ${
            activeTab === "account"
              ? "text-white border-b-2 border-blue-400 scale-[1.05]"
              : "text-blue-400/70 hover:text-blue-300 hover:scale-[1.02]"
          }`}
          onClick={() => onTabChange("account")}
        >
          <span className="relative z-10">Account</span>
          {activeTab === "account" && (
            <div className="absolute -inset-x-2 -bottom-1 h-1 bg-linear-to-r from-blue-400 to-blue-500 rounded-full blur-sm opacity-70" />
          )}
        </button>
      </div>
    </div>
  );
}
