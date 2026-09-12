import { useState } from 'react';
import SystemOverview from './components/SystemOverview';
import MarketUniverse from './components/MarketUniverse';
import CrossExchange from './components/CrossExchange';
import DerivativesPanel from './components/DerivativesPanel';
import NewsPanel from './components/NewsPanel';
import SignalPanel from './components/SignalPanel';
import ArchitecturePanel from './components/ArchitecturePanel';
import { 
  LayoutDashboard, 
  BarChart3, 
  GitCompare, 
  Layers, 
  Newspaper, 
  Target, 
  Cpu,
  Menu,
  X,
  Zap
} from 'lucide-react';

type Tab = 'overview' | 'markets' | 'cross-exchange' | 'derivatives' | 'news' | 'signals' | 'architecture';

const tabs: { id: Tab; label: string; icon: React.ReactNode; shortLabel: string }[] = [
  { id: 'overview', label: 'System Overview', icon: <LayoutDashboard className="w-4 h-4" />, shortLabel: 'Overview' },
  { id: 'markets', label: 'Market Universe', icon: <BarChart3 className="w-4 h-4" />, shortLabel: 'Markets' },
  { id: 'cross-exchange', label: 'Cross-Exchange', icon: <GitCompare className="w-4 h-4" />, shortLabel: 'Cross-Venue' },
  { id: 'derivatives', label: 'Derivatives', icon: <Layers className="w-4 h-4" />, shortLabel: 'Derivatives' },
  { id: 'news', label: 'News & Events', icon: <Newspaper className="w-4 h-4" />, shortLabel: 'News' },
  { id: 'signals', label: 'Signals & Decisions', icon: <Target className="w-4 h-4" />, shortLabel: 'Signals' },
  { id: 'architecture', label: 'Architecture', icon: <Cpu className="w-4 h-4" />, shortLabel: 'System' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <SystemOverview />;
      case 'markets': return <MarketUniverse />;
      case 'cross-exchange': return <CrossExchange />;
      case 'derivatives': return <DerivativesPanel />;
      case 'news': return <NewsPanel />;
      case 'signals': return <SignalPanel />;
      case 'architecture': return <ArchitecturePanel />;
      default: return <SystemOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-hermes-bg overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-hermes-surface border-r border-hermes-border
        flex flex-col transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-4 border-b border-hermes-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">HERMES</h1>
              <p className="text-[10px] text-hermes-muted uppercase tracking-widest">Market Research System</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20'
                  : 'text-hermes-muted hover:text-white hover:bg-hermes-card border border-transparent'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Status Footer */}
        <div className="p-4 border-t border-hermes-border">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-hermes-muted">Execution</span>
              <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-medium">DISABLED</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-hermes-muted">Mode</span>
              <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 font-medium">RESEARCH</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-hermes-muted">Data Quality</span>
              <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 font-medium">DEGRADED</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 border-b border-hermes-border bg-hermes-surface/50 flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-hermes-card text-hermes-muted"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h2 className="text-white font-semibold">
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="hidden md:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow" />
              <span className="text-hermes-muted">Live</span>
            </div>
            <div className="hidden md:block text-hermes-muted font-mono">
              {new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-hermes-card border border-hermes-border">
              <span className="text-hermes-muted">Universe:</span>
              <span className="text-white font-medium">BTC ETH SOL</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
