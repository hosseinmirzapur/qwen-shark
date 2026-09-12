import { Cpu, GitBranch, Database, Brain, Shield, Users } from 'lucide-react';

export default function ArchitecturePanel() {
  return (
    <div className="space-y-6">
      {/* System Architecture */}
      <div className="bg-hermes-card border border-hermes-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-blue-400" />
          System Architecture
        </h2>
        <div className="relative">
          {/* Hermes Layer */}
          <div className="flex justify-center mb-6">
            <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-xl px-8 py-4 text-center">
              <Brain className="w-6 h-6 text-blue-400 mx-auto mb-1" />
              <p className="text-blue-400 font-bold text-lg">HERMES</p>
              <p className="text-xs text-hermes-muted">Orchestration / AI / Research</p>
            </div>
          </div>
          {/* Arrow */}
          <div className="flex justify-center mb-4">
            <div className="w-0.5 h-6 bg-hermes-border" />
          </div>
          {/* Quant Layer */}
          <div className="flex justify-center mb-6">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl px-8 py-3 text-center">
              <Database className="w-5 h-5 text-purple-400 mx-auto mb-1" />
              <p className="text-purple-400 font-semibold">Quant + Research Engine</p>
              <p className="text-xs text-hermes-muted">Deterministic computation, features, models, backtesting</p>
            </div>
          </div>
          {/* Arrow split */}
          <div className="flex justify-center mb-4">
            <div className="flex items-end">
              <div className="w-32 h-0.5 bg-hermes-border" />
              <div className="w-0.5 h-4 bg-hermes-border" />
              <div className="w-32 h-0.5 bg-hermes-border" />
            </div>
          </div>
          {/* Three columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Global Markets */}
            <div className="bg-hermes-surface border border-hermes-border rounded-lg p-4">
              <h3 className="text-blue-400 font-semibold text-sm mb-3 text-center">GLOBAL MARKETS</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-hermes-card rounded text-xs">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-white font-medium">KuCoin</span>
                  <span className="text-hermes-muted ml-auto">PRIMARY</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-hermes-card rounded text-xs">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span className="text-white font-medium">Toobit</span>
                  <span className="text-hermes-muted ml-auto">SECONDARY</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-hermes-card rounded text-xs opacity-50">
                  <span className="w-2 h-2 rounded-full bg-gray-400" />
                  <span className="text-hermes-muted font-medium">Binance, Bybit, OKX...</span>
                  <span className="text-hermes-muted ml-auto">FUTURE</span>
                </div>
              </div>
            </div>
            {/* Iran Market */}
            <div className="bg-hermes-surface border border-orange-500/20 rounded-lg p-4">
              <h3 className="text-orange-400 font-semibold text-sm mb-3 text-center">IRAN MARKET</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-hermes-card rounded text-xs">
                  <span className="w-2 h-2 rounded-full bg-orange-400" />
                  <span className="text-white font-medium">BitPin</span>
                  <span className="text-hermes-muted ml-auto">LOCAL</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-hermes-card rounded text-xs">
                  <span className="text-hermes-muted">USD/IRT</span>
                  <span className="text-white font-mono ml-auto">68,450</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-hermes-card rounded text-xs">
                  <span className="text-hermes-muted">Local Premium</span>
                  <span className="text-yellow-400 font-mono ml-auto">+2.65%</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-hermes-card rounded text-xs">
                  <span className="text-hermes-muted">Gold/USD</span>
                  <span className="text-white font-mono ml-auto">$2,895</span>
                </div>
              </div>
            </div>
            {/* News/Events */}
            <div className="bg-hermes-surface border border-emerald-500/20 rounded-lg p-4">
              <h3 className="text-emerald-400 font-semibold text-sm mb-3 text-center">NEWS / EVENTS</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-hermes-card rounded text-xs">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="text-white font-medium">Bertina Radar</span>
                  <span className="text-hermes-muted ml-auto">112/24h</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-hermes-card rounded text-xs">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-white font-medium">Arzdigital</span>
                  <span className="text-hermes-muted ml-auto">63/24h</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-hermes-card rounded text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-white font-medium">Bitycle</span>
                  <span className="text-hermes-muted ml-auto">47/24h</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-hermes-card rounded text-xs">
                  <span className="w-2 h-2 rounded-full bg-yellow-400" />
                  <span className="text-white font-medium">TGJU</span>
                  <span className="text-hermes-muted ml-auto">28/24h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Agent Structure */}
      <div className="bg-hermes-card border border-hermes-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-cyan-400" />
          Multi-Agent Analytical Structure
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: 'Flow Analyst', desc: 'Taker imbalance, order-book dynamics, absorption', border: 'border-blue-500/20', hover: 'hover:border-blue-500/40', text: 'text-blue-400' },
            { name: 'Derivatives Analyst', desc: 'OI, funding, basis, positioning, liquidations', border: 'border-purple-500/20', hover: 'hover:border-purple-500/40', text: 'text-purple-400' },
            { name: 'Market Regime Analyst', desc: 'Trend, volatility, regime classification', border: 'border-cyan-500/20', hover: 'hover:border-cyan-500/40', text: 'text-cyan-400' },
            { name: 'Cross-Venue Analyst', desc: 'Spread, divergence, liquidity comparison', border: 'border-emerald-500/20', hover: 'hover:border-emerald-500/40', text: 'text-emerald-400' },
            { name: 'Iranian Market Analyst', desc: 'BitPin, USDT/IRT, local premium, connectivity', border: 'border-orange-500/20', hover: 'hover:border-orange-500/40', text: 'text-orange-400' },
            { name: 'Event/News Analyst', desc: 'Local-first news, event classification, severity', border: 'border-yellow-500/20', hover: 'hover:border-yellow-500/40', text: 'text-yellow-400' },
            { name: 'Quant Analyst', desc: 'Feature importance, model comparison, backtesting', border: 'border-indigo-500/20', hover: 'hover:border-indigo-500/40', text: 'text-indigo-400' },
            { name: 'Adversarial Analyst', desc: 'Falsify every thesis, find contradictions', border: 'border-red-500/20', hover: 'hover:border-red-500/40', text: 'text-red-400' },
            { name: 'Risk Judge', desc: 'Final go/no-go, deterministic risk controls', border: 'border-pink-500/20', hover: 'hover:border-pink-500/40', text: 'text-pink-400' },
          ].map(agent => (
            <div key={agent.name} className={`bg-hermes-surface border ${agent.border} rounded-lg p-3 ${agent.hover} transition-colors`}>
              <h4 className={`text-sm font-semibold ${agent.text}`}>{agent.name}</h4>
              <p className="text-xs text-hermes-muted mt-1">{agent.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-xs text-yellow-300">
            <strong>Important:</strong> Agents must not merely vote. Every conclusion must reference evidence. 
            The Adversarial Analyst must attempt to falsify every proposed thesis. 
            The Risk Judge must be deterministic whenever possible.
          </p>
        </div>
      </div>

      {/* Development Phases */}
      <div className="bg-hermes-card border border-hermes-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-emerald-400" />
          Development Roadmap
        </h2>
        <div className="space-y-3">
          {[
            { phase: 0, name: 'Connectivity & Source Audit', status: 'COMPLETE', desc: 'KuCoin, Toobit, BitPin APIs audited. News sources verified.' },
            { phase: 1, name: 'Exchange Abstraction Layer', status: 'COMPLETE', desc: 'Normalized provider interface. Symbol mapping. Data quality monitoring.' },
            { phase: 2, name: 'Multi-Asset Universe', status: 'ACTIVE', desc: 'BTC, ETH, SOL configured. Dynamic discovery ready.' },
            { phase: 3, name: 'Raw Data Lake', status: 'ACTIVE', desc: 'Local storage of raw exchange events for reproducibility.' },
            { phase: 4, name: 'Feature Engine', status: 'IN_PROGRESS', desc: 'Price, OI, funding, liquidations, cross-exchange, Iran features.' },
            { phase: 5, name: 'News Intelligence', status: 'IN_PROGRESS', desc: 'Event database with classification and severity.' },
            { phase: 6, name: 'Baseline Models', status: 'PENDING', desc: 'Incremental feature testing with walk-forward validation.' },
            { phase: 7, name: 'Hermes Multi-Agent', status: 'PENDING', desc: 'Orchestration layer with specialized analysts.' },
            { phase: 8, name: 'Paper Trading', status: 'PENDING', desc: 'Track every signal as hypothetical trade with full metrics.' },
            { phase: 9, name: 'Live Trading', status: 'DISABLED', desc: 'Only after persistent out-of-sample positive expectancy.' },
          ].map(item => (
            <div key={item.phase} className={`flex items-start gap-3 p-3 rounded-lg ${
              item.status === 'ACTIVE' || item.status === 'IN_PROGRESS' ? 'bg-blue-500/5 border border-blue-500/20' :
              item.status === 'COMPLETE' ? 'bg-emerald-500/5 border border-emerald-500/20' :
              item.status === 'DISABLED' ? 'bg-red-500/5 border border-red-500/20' :
              'bg-hermes-surface border border-hermes-border'
            }`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                item.status === 'COMPLETE' ? 'bg-emerald-500/20 text-emerald-400' :
                item.status === 'ACTIVE' || item.status === 'IN_PROGRESS' ? 'bg-blue-500/20 text-blue-400' :
                item.status === 'DISABLED' ? 'bg-red-500/20 text-red-400' :
                'bg-hermes-card text-hermes-muted'
              }`}>
                {item.phase}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium text-sm">{item.name}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    item.status === 'COMPLETE' ? 'bg-emerald-500/20 text-emerald-400' :
                    item.status === 'ACTIVE' ? 'bg-blue-500/20 text-blue-400' :
                    item.status === 'IN_PROGRESS' ? 'bg-yellow-500/20 text-yellow-400' :
                    item.status === 'DISABLED' ? 'bg-red-500/20 text-red-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>{item.status}</span>
                </div>
                <p className="text-xs text-hermes-muted mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Operating Principle */}
      <div className="bg-hermes-card border border-hermes-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-yellow-400" />
          Default Operating Principle
        </h2>
        <div className="flex items-center gap-2 flex-wrap text-sm mb-4">
          {['MEASURE', 'NORMALIZE', 'VALIDATE', 'TEST', 'BACKTEST', 'WALK-FORWARD', 'CHALLENGE', 'PAPER TRADE', 'CONSIDER LIVE'].map((step, i) => (
            <span key={step} className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                i < 4 ? 'bg-emerald-500/20 text-emerald-400' :
                i < 7 ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>{step}</span>
              {i < 8 && <span className="text-hermes-muted">→</span>}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-hermes-muted">
          <div className="p-2 bg-red-500/5 border border-red-500/10 rounded">
            <p>❌ Do not confuse sophistication with predictive power</p>
          </div>
          <div className="p-2 bg-red-500/5 border border-red-500/10 rounded">
            <p>❌ Do not confuse narrative quality with evidence</p>
          </div>
          <div className="p-2 bg-red-500/5 border border-red-500/10 rounded">
            <p>❌ Do not confuse model confidence with probability calibration</p>
          </div>
          <div className="p-2 bg-red-500/5 border border-red-500/10 rounded">
            <p>❌ Do not confuse leverage with risk control</p>
          </div>
        </div>
      </div>
    </div>
  );
}
