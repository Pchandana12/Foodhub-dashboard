function Navbar() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">
      
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500">
          Welcome back, Chandana 👋
        </p>
      </div>

      <div className="flex items-center gap-6">
        <span className="text-xl cursor-pointer">🔔</span>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
            👤
          </div>

          <span className="font-medium text-slate-700">
            Chandana
          </span>
        </div>
      </div>

    </header>
  );
}

export default Navbar;