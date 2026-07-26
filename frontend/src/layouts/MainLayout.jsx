import AppHeader from "../components/common/AppHeader";
import colors from "../theme/colors";

function MainLayout({ children, firebaseConnected = true }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <AppHeader firebaseConnected={firebaseConnected} />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500 font-medium">
        <p>APS Enrollment Team &copy; {new Date().getFullYear()} Army Public School & College. All rights reserved. | BSEK Submission System</p>
      </footer>
    </div>
  );
}

export default MainLayout;

