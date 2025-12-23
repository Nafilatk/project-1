type TabKey = "personal" | "security" | "account";

interface TabsProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export default function TabsComponent({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className="border-b border-slate-200 px-4 pt-3">
      <div className="flex gap-6 text-sm font-medium">
        <button
          className={`pb-3 ${activeTab === "personal"
            ? "border-b-2 border-blue-600 text-blue-800"
            : "text-slate-500 hover:text-slate-700"
          }`}
          onClick={() => onTabChange("personal")}
        >
          Personal Info
        </button>
        <button
          className={`pb-3 ${activeTab === "security"
            ? "border-b-2 border-blue-600 text-blue-800"
            : "text-slate-500 hover:text-slate-700"
          }`}
          onClick={() => onTabChange("security")}
        >
          Login & Security
        </button>
        <button
          className={`pb-3 ${activeTab === "account"
            ? "border-b-2 border-blue-600 text-blue-800"
            : "text-slate-500 hover:text-slate-700"
          }`}
          onClick={() => onTabChange("account")}
        >
          Account
        </button>
      </div>
    </div>
  );
}
