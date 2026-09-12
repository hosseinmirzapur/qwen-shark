import { signals } from '../data';
import { Target, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

function DecisionBadge({ decision }: { decision: string }) {
  const config: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
    TRADEABLE: { bg: 'bg-emerald-500/20 border-emerald-500/30', text: 'text-emerald-400', icon: <CheckCircle className="w-4 h-4" /> },
    WAIT: { bg: 'bg-yellow-500/20 border-yellow-500/30', text: 'text-yellow-400', icon: <AlertTriangle className="w-4 h-4" /> },
    NO_TRADE: { bg: 'bg-gray-500/20 border-gray-500/30', text: 'text-gray-400', icon: <XCircle className="w-4 h-4" /> },
    DATA_INVALID: { bg: 'bg-red-500/20 border-red-500/30', text: 'text-red-400', icon: <XCircle className="w-4 h-4" /> },
  };
  const c = config[decision] || config.NO_TRADE;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-semibold border ${c.bg} ${c.text}`}>
      {c.icon} {decision.replace(/_/g, ' ')}
    </span>
  );
}

function DirectionIndicator({ direction }: { direction: string }) {
  if (direction === 'LONG') return <span className="text-emerald-400 font-bold">↑ LONG</span>;
  if (direction === 'SHORT') return <span className="text-red-400 font-bold">↓ SHORT</span>;
  return <span className="text-gray-400 font-bold">— NO TRADE</span>;
}

function RegimeBadge({ regime }: { regime: string }) {
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
      {regime.replace(/_/g, ' ')}
    </span>
  );
}

function FragilityIndicator({ level }: { level: string }) {
  const colors: Record<string, string> = {
    LOW: 'text-emerald-400',
    MEDIUM: 'text-yellow-400',
    HIGH: 'text-orange-400',
    EXTREME: 'text-red-400',
  };
  return <span className={`font-mono font-medium ${colors[level] || 'text-white'}`}>{level}</span>;
}

export default function SignalPanel() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-hermes-card border border-hermes-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-semibold text-white">Signal & Decision Framework</h2>
        </div>
        <p className="text-sm text-hermes-muted">
          Every signal is evaluated through the Risk Judge. NO_TRADE is a first-class outcome. 
          Real-money execution is <strong className="text-red-400">DISABLED</strong>.
        </p>
      </div>

      {/* Signals */}
      <div className="space-y-4">
        {signals.map((signal, idx) => (
          <div key={idx} className="bg-hermes-card border border-hermes-border rounded-lg overflow-hidden">
            {/* Signal Header */}
            <div className="p-4 border-b border-hermes-border bg-hermes-surface/30">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-white font-mono">{signal.canonical_symbol}</h3>
                  <RegimeBadge regime={signal.regime} />
                  <span className="text-xs text-hermes-muted">{signal.time_horizon}</span>
                </div>
                <DecisionBadge decision={signal.decision} />
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className="text-hermes-muted">Direction:</span>
                <DirectionIndicator direction={signal.direction} />
                <span className="text-hermes-muted ml-4">Data Quality:</span>
                <span className={`font-medium ${
                  signal.data_quality === 'GOOD' ? 'text-emerald-400' : 
                  signal.data_quality === 'DEGRADED' ? 'text-yellow-400' : 'text-red-400'
                }`}>{signal.data_quality}</span>
                <span className="text-hermes-muted ml-4">Confidence:</span>
                <span className="font-mono text-white">{(signal.confidence * 100).toFixed(0)}%</span>
              </div>
            </div>

            {/* Signal Body */}
            <div className="p-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Metrics */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-hermes-muted uppercase tracking-wider">Metrics</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-hermes-surface rounded p-2">
                      <span className="text-hermes-muted">P(up)</span>
                      <p className="text-emerald-400 font-mono font-medium">{(signal.probability_up * 100).toFixed(1)}%</p>
                    </div>
                    <div className="bg-hermes-surface rounded p-2">
                      <span className="text-hermes-muted">P(down)</span>
                      <p className="text-red-400 font-mono font-medium">{(signal.probability_down * 100).toFixed(1)}%</p>
                    </div>
                    <div className="bg-hermes-surface rounded p-2">
                      <span className="text-hermes-muted">E[return]</span>
                      <p className="text-white font-mono">{signal.expected_return.toFixed(2)}%</p>
                    </div>
                    <div className="bg-hermes-surface rounded p-2">
                      <span className="text-hermes-muted">Est. cost</span>
                      <p className="text-white font-mono">{signal.estimated_cost.toFixed(2)}%</p>
                    </div>
                    <div className="bg-hermes-surface rounded p-2 col-span-2">
                      <span className="text-hermes-muted">Expected net edge</span>
                      <p className={`font-mono font-medium ${signal.expected_net_edge > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {signal.expected_net_edge > 0 ? '+' : ''}{signal.expected_net_edge.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-hermes-surface rounded p-2">
                      <span className="text-hermes-muted">Volatility</span>
                      <p className="text-white font-mono">{signal.volatility.toFixed(1)}%</p>
                    </div>
                    <div className="bg-hermes-surface rounded p-2">
                      <span className="text-hermes-muted">Fragility</span>
                      <FragilityIndicator level={signal.liquidation_fragility} />
                    </div>
                  </div>
                </div>

                {/* States */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-hermes-muted uppercase tracking-wider">Market States</h4>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between bg-hermes-surface rounded p-2">
                      <span className="text-hermes-muted">Funding</span>
                      <span className="text-white">{signal.funding_state.replace(/_/g, ' ')}</span>
                    </div>
                    <div className="flex justify-between bg-hermes-surface rounded p-2">
                      <span className="text-hermes-muted">OI State</span>
                      <span className="text-white">{signal.oi_state}</span>
                    </div>
                    <div className="flex justify-between bg-hermes-surface rounded p-2">
                      <span className="text-hermes-muted">Flow</span>
                      <span className="text-white">{signal.flow_state.replace(/_/g, ' ')}</span>
                    </div>
                    <div className="flex justify-between bg-hermes-surface rounded p-2">
                      <span className="text-hermes-muted">Cross-Exch</span>
                      <span className="text-white text-right">{signal.cross_exchange_state.replace(/_/g, ' ')}</span>
                    </div>
                    <div className="flex justify-between bg-hermes-surface rounded p-2">
                      <span className="text-hermes-muted">News</span>
                      <span className="text-white">{signal.news_state.replace(/_/g, ' ')}</span>
                    </div>
                    <div className="flex justify-between bg-hermes-surface rounded p-2">
                      <span className="text-hermes-muted">Iran Mkt</span>
                      <span className="text-white">{signal.iran_market_state.replace(/_/g, ' ')}</span>
                    </div>
                  </div>
                </div>

                {/* Evidence */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-hermes-muted uppercase tracking-wider">Evidence</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs text-emerald-400 font-medium">FOR:</span>
                      <ul className="mt-1 space-y-1">
                        {signal.evidence_for.map((e, i) => (
                          <li key={i} className="text-xs text-hermes-muted flex items-start gap-1">
                            <span className="text-emerald-400 mt-0.5">+</span> {e}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-xs text-red-400 font-medium">AGAINST:</span>
                      <ul className="mt-1 space-y-1">
                        {signal.evidence_against.map((e, i) => (
                          <li key={i} className="text-xs text-hermes-muted flex items-start gap-1">
                            <span className="text-red-400 mt-0.5">−</span> {e}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Historical Support & Reason */}
              <div className="mt-4 pt-4 border-t border-hermes-border grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-hermes-muted">Historical Support:</span>
                  <p className="text-xs text-white mt-1">{signal.historical_support}</p>
                </div>
                <div>
                  <span className="text-xs text-hermes-muted">Risk Judge Reasoning:</span>
                  <p className="text-xs text-white mt-1">{signal.reason}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No-Trade Discipline */}
      <div className="bg-hermes-card border border-hermes-border rounded-lg p-4">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-400" />
          No-Trade Discipline
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-hermes-muted">
          <div>
            <p className="text-white font-medium mb-1">Return NO_TRADE when:</p>
            <ul className="space-y-0.5">
              <li>• Evidence is mixed or conflicting</li>
              <li>• Expected edge below costs</li>
              <li>• Regime is unknown</li>
              <li>• Liquidity is poor</li>
              <li>• Data is stale or providers disagree</li>
              <li>• Model outside validated conditions</li>
              <li>• Important event is imminent</li>
              <li>• Prediction uncertainty too high</li>
            </ul>
          </div>
          <div>
            <p className="text-white font-medium mb-1">Risk Framework:</p>
            <ul className="space-y-0.5">
              <li>• Never choose leverage first</li>
              <li>• 1. Max acceptable risk ($)</li>
              <li>• 2. Stop distance</li>
              <li>• 3. Position notional</li>
              <li>• 4. Required margin</li>
              <li>• 5. Leverage as consequence</li>
              <li>• Never average down automatically</li>
              <li>• Never widen a losing stop</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
