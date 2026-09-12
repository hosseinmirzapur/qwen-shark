import { ProviderHealth, ProviderStatus } from '../types';
import { providerHealth, newsSourceHealth, internationalSourceHealth, iranMarketData } from '../data';
import { Activity, Wifi, WifiOff, AlertTriangle, Globe, Shield } from 'lucide-react';

function StatusBadge({ status }: { status: ProviderStatus | string }) {
  const colors: Record<string, string> = {
    HEALTHY: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    DEGRADED: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    DOWN: 'bg-red-500/20 text-red-400 border-red-500/30',
    CONNECTING: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    NORMAL: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    DISRUPTED: 'bg-red-500/20 text-red-400 border-red-500/30',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${colors[status] || colors.DOWN}`}>
      {status}
    </span>
  );
}

function ProviderCard({ provider }: { provider: ProviderHealth }) {
  const roleColors: Record<string, string> = {
    PRIMARY: 'text-blue-400',
    SECONDARY: 'text-purple-400',
    IRANIAN_LOCAL: 'text-orange-400',
  };
  const roleLabels: Record<string, string> = {
    PRIMARY: 'Primary Global',
    SECONDARY: 'Secondary Global',
    IRANIAN_LOCAL: 'Iranian / Local',
  };

  return (
    <div className="bg-hermes-card border border-hermes-border rounded-lg p-4 hover:border-hermes-accent/50 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${provider.status === 'HEALTHY' ? 'bg-emerald-400 animate-pulse-glow' : provider.status === 'DEGRADED' ? 'bg-yellow-400' : 'bg-red-400'}`} />
          <h3 className="font-semibold text-white capitalize">{provider.provider}</h3>
        </div>
        <StatusBadge status={provider.status} />
      </div>
      <p className={`text-xs mb-2 ${roleColors[provider.role]}`}>{roleLabels[provider.role]}</p>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-hermes-muted">Latency</span>
          <p className="text-white font-mono">{provider.latency_ms}ms</p>
        </div>
        <div>
          <span className="text-hermes-muted">Uptime</span>
          <p className="text-white font-mono">{provider.uptime}%</p>
        </div>
        <div>
          <span className="text-hermes-muted">Reconnects</span>
          <p className={`font-mono ${provider.reconnectCount > 0 ? 'text-yellow-400' : 'text-white'}`}>{provider.reconnectCount}</p>
        </div>
        <div>
          <span className="text-hermes-muted">Seq Gaps</span>
          <p className={`font-mono ${provider.sequenceGaps > 0 ? 'text-red-400' : 'text-white'}`}>{provider.sequenceGaps}</p>
        </div>
      </div>
    </div>
  );
}

export default function SystemOverview() {
  const healthyCount = providerHealth.filter(p => p.status === 'HEALTHY').length;
  const totalProviders = providerHealth.length;
  const internationalDown = internationalSourceHealth.filter(s => s.status === 'DOWN').length;

  return (
    <div className="space-y-6">
      {/* System Status Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-hermes-card border border-hermes-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-hermes-muted">System Status</span>
          </div>
          <p className="text-2xl font-bold text-white">{healthyCount}/{totalProviders}</p>
          <p className="text-xs text-hermes-muted">Exchange providers healthy</p>
        </div>
        <div className="bg-hermes-card border border-hermes-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Wifi className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-hermes-muted">Local News Sources</span>
          </div>
          <p className="text-2xl font-bold text-emerald-400">4/4</p>
          <p className="text-xs text-hermes-muted">All accessible</p>
        </div>
        <div className="bg-hermes-card border border-hermes-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <WifiOff className="w-4 h-4 text-red-400" />
            <span className="text-xs text-hermes-muted">International Sources</span>
          </div>
          <p className="text-2xl font-bold text-red-400">{internationalDown} blocked</p>
          <p className="text-xs text-hermes-muted">System continues with local sources</p>
        </div>
        <div className="bg-hermes-card border border-hermes-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-hermes-muted">Connectivity</span>
          </div>
          <p className="text-2xl font-bold text-yellow-400">{iranMarketData.connectivityStatus}</p>
          <p className="text-xs text-hermes-muted">Iran internet status</p>
        </div>
      </div>

      {/* Exchange Providers */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-400" />
          Exchange Data Providers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {providerHealth.map(p => (
            <ProviderCard key={p.provider} provider={p} />
          ))}
        </div>
      </div>

      {/* News Source Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            Local News Sources (Primary)
          </h2>
          <div className="bg-hermes-card border border-hermes-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-hermes-border">
                  <th className="text-left px-4 py-2 text-hermes-muted font-medium">Source</th>
                  <th className="text-left px-4 py-2 text-hermes-muted font-medium">Status</th>
                  <th className="text-left px-4 py-2 text-hermes-muted font-medium">Latency</th>
                  <th className="text-left px-4 py-2 text-hermes-muted font-medium">Articles/24h</th>
                </tr>
              </thead>
              <tbody>
                {newsSourceHealth.map(s => (
                  <tr key={s.source} className="border-b border-hermes-border/50 hover:bg-hermes-surface/50">
                    <td className="px-4 py-2.5 capitalize font-medium text-white">{s.source === 'bertina' ? 'Bertina Radar' : s.source}</td>
                    <td className="px-4 py-2.5"><StatusBadge status={s.status} /></td>
                    <td className="px-4 py-2.5 font-mono text-hermes-muted">{s.latency_ms}ms</td>
                    <td className="px-4 py-2.5 font-mono text-white">{s.articles24h}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <WifiOff className="w-5 h-5 text-red-400" />
            International Sources (Optional)
          </h2>
          <div className="bg-hermes-card border border-hermes-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-hermes-border">
                  <th className="text-left px-4 py-2 text-hermes-muted font-medium">Source</th>
                  <th className="text-left px-4 py-2 text-hermes-muted font-medium">Status</th>
                  <th className="text-left px-4 py-2 text-hermes-muted font-medium">Note</th>
                </tr>
              </thead>
              <tbody>
                {internationalSourceHealth.map(s => (
                  <tr key={s.source} className="border-b border-hermes-border/50 hover:bg-hermes-surface/50">
                    <td className="px-4 py-2.5 font-medium text-white">{s.source}</td>
                    <td className="px-4 py-2.5"><StatusBadge status={s.status} /></td>
                    <td className="px-4 py-2.5 text-xs text-hermes-muted">{s.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-xs text-yellow-300">
              <strong>Resilience Note:</strong> System continues operating normally with local sources. International sources are enrichment only — not dependencies.
            </p>
          </div>
        </div>
      </div>

      {/* Iran Market Context */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3">🇮🇷 Iranian Market Context</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-hermes-card border border-hermes-border rounded-lg p-3">
            <span className="text-xs text-hermes-muted">USDT/IRT</span>
            <p className="text-lg font-bold text-white font-mono">{iranMarketData.usdtIrt.toLocaleString()}</p>
          </div>
          <div className="bg-hermes-card border border-hermes-border rounded-lg p-3">
            <span className="text-xs text-hermes-muted">BTC/IRT</span>
            <p className="text-lg font-bold text-white font-mono">{(iranMarketData.btcIrt / 1e9).toFixed(2)}B</p>
          </div>
          <div className="bg-hermes-card border border-hermes-border rounded-lg p-3">
            <span className="text-xs text-hermes-muted">Gold (IRR)</span>
            <p className="text-lg font-bold text-white font-mono">{(iranMarketData.goldPrice / 1e6).toFixed(1)}M</p>
          </div>
          <div className="bg-hermes-card border border-hermes-border rounded-lg p-3">
            <span className="text-xs text-hermes-muted">Gold (USD)</span>
            <p className="text-lg font-bold text-white font-mono">${iranMarketData.goldUsd.toLocaleString()}</p>
          </div>
          <div className="bg-hermes-card border border-hermes-border rounded-lg p-3">
            <span className="text-xs text-hermes-muted">Local Premium</span>
            <p className={`text-lg font-bold font-mono ${iranMarketData.localPremium > 2 ? 'text-yellow-400' : 'text-white'}`}>{iranMarketData.localPremium}%</p>
          </div>
          <div className="bg-hermes-card border border-hermes-border rounded-lg p-3">
            <span className="text-xs text-hermes-muted">Connectivity</span>
            <p className={`text-lg font-bold ${iranMarketData.connectivityStatus === 'NORMAL' ? 'text-emerald-400' : iranMarketData.connectivityStatus === 'DEGRADED' ? 'text-yellow-400' : 'text-red-400'}`}>
              {iranMarketData.connectivityStatus === 'DEGRADED' ? '⚠️' : iranMarketData.connectivityStatus === 'NORMAL' ? '✅' : '🔴'} {iranMarketData.connectivityStatus}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
