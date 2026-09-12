import { useState } from 'react';
import { Asset } from '../types';
import { crossExchangeMetrics } from '../data';
import { GitCompare, AlertTriangle, CheckCircle } from 'lucide-react';

const assets: Asset[] = ['BTC', 'ETH', 'SOL'];

function StatusIndicator({ status }: { status: string }) {
  const config: Record<string, { color: string; icon: React.ReactNode }> = {
    NORMAL: { color: 'text-emerald-400 bg-emerald-500/10', icon: <CheckCircle className="w-3.5 h-3.5" /> },
    TEMPORARY_DISLOCATION: { color: 'text-yellow-400 bg-yellow-500/10', icon: <AlertTriangle className="w-3.5 h-3.5" /> },
    LIQUIDITY_DISTORTION: { color: 'text-yellow-400 bg-yellow-500/10', icon: <AlertTriangle className="w-3.5 h-3.5" /> },
    STALE_DATA: { color: 'text-red-400 bg-red-500/10', icon: <AlertTriangle className="w-3.5 h-3.5" /> },
    ABNORMAL_DIVERGENCE: { color: 'text-red-400 bg-red-500/10', icon: <AlertTriangle className="w-3.5 h-3.5" /> },
  };
  const c = config[status] || config.STALE_DATA;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${c.color}`}>
      {c.icon} {status.replace(/_/g, ' ')}
    </span>
  );
}

export default function CrossExchange() {
  const [selectedAsset, setSelectedAsset] = useState<Asset>('BTC');
  const metrics = crossExchangeMetrics.filter(m => m.asset === selectedAsset);

  return (
    <div className="space-y-6">
      {/* Asset Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-hermes-muted">Asset:</span>
        {assets.map(asset => (
          <button
            key={asset}
            onClick={() => setSelectedAsset(asset)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              selectedAsset === asset
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'bg-hermes-card text-hermes-muted border border-hermes-border hover:border-hermes-accent/50'
            }`}
          >
            {asset}
          </button>
        ))}
      </div>

      {/* Cross-Exchange Pairs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-hermes-card border border-hermes-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <GitCompare className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-white capitalize">
                  {metric.pair[0]} ↔ {metric.pair[1]}
                </span>
              </div>
              <StatusIndicator status={metric.status} />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-hermes-muted">Price Spread</span>
                <div className="text-right">
                  <span className={`font-mono text-sm font-medium ${metric.priceSpreadBps > 10 ? 'text-red-400' : metric.priceSpreadBps > 3 ? 'text-yellow-400' : 'text-emerald-400'}`}>
                    {metric.priceSpreadBps.toFixed(1)} bps
                  </span>
                  <span className="text-xs text-hermes-muted ml-2">(${metric.priceSpread.toFixed(1)})</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-hermes-muted">Volume Ratio</span>
                <span className="font-mono text-sm text-white">{metric.volumeRatio.toFixed(2)}x</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-hermes-muted">OI Difference</span>
                <span className="font-mono text-sm text-white">
                  ${(metric.oiDifference / 1e9).toFixed(2)}B
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-hermes-muted">Funding Diff</span>
                <span className={`font-mono text-sm ${Math.abs(metric.fundingDifference) > 0.003 ? 'text-yellow-400' : 'text-white'}`}>
                  {(metric.fundingDifference * 100).toFixed(3)}%
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-hermes-muted">Basis Diff</span>
                <span className={`font-mono text-sm ${metric.basisDifference > 50 ? 'text-red-400' : 'text-white'}`}>
                  ${metric.basisDifference.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Interpretation */}
            {metric.status === 'ABNORMAL_DIVERGENCE' && (
              <div className="mt-3 p-2 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-300">
                <strong>Alert:</strong> {metric.pair.includes('bitpin') 
                  ? 'BitPin premium indicates Iranian local demand/USDT pricing divergence. Not necessarily arbitrage — may reflect local liquidity conditions.'
                  : 'Abnormal divergence detected. Verify data freshness before acting.'}
              </div>
            )}
            {metric.status === 'NORMAL' && (
              <div className="mt-3 p-2 bg-emerald-500/10 border border-emerald-500/20 rounded text-xs text-emerald-300">
                Venues aligned. No actionable cross-exchange signal.
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Analysis Notes */}
      <div className="bg-hermes-card border border-hermes-border rounded-lg p-4">
        <h3 className="text-white font-semibold mb-3">Cross-Exchange Analysis Notes</h3>
        <div className="space-y-2 text-sm text-hermes-muted">
          <p>• <strong className="text-white">KuCoin ↔ Toobit:</strong> Global venues show tight alignment. Minor spread within normal bounds.</p>
          <p>• <strong className="text-white">KuCoin/Toobit ↔ BitPin:</strong> Persistent BitPin premium observed. This reflects Iranian local USDT demand and liquidity conditions, not necessarily an arbitrage opportunity.</p>
          <p>• <strong className="text-white">Interpretation:</strong> BitPin premium/discount is informational about Iranian market conditions. Do NOT automatically interpret as arbitrage.</p>
          <p>• <strong className="text-white">Data Quality:</strong> When BitPin diverges materially, verify freshness before using for cross-exchange features.</p>
        </div>
      </div>

      {/* Divergence History */}
      <div className="bg-hermes-card border border-hermes-border rounded-lg p-4">
        <h3 className="text-white font-semibold mb-3">Recent Divergence Events</h3>
        <div className="space-y-2">
          {[
            { time: '14:25', pair: 'KuCoin↔BitPin', asset: 'BTC', spread: '28.1 bps', note: 'BitPin premium widened — local demand surge' },
            { time: '13:45', pair: 'KuCoin↔Toobit', asset: 'ETH', spread: '2.1 bps', note: 'Brief dislocation — resolved within 3 minutes' },
            { time: '12:10', pair: 'KuCoin↔BitPin', asset: 'SOL', spread: '35.2 bps', note: 'BitPin connectivity degradation — stale data suspected' },
            { time: '11:30', pair: 'Toobit↔BitPin', asset: 'BTC', spread: '22.8 bps', note: 'Normal Iranian session premium' },
          ].map((event, idx) => (
            <div key={idx} className="flex items-center gap-3 p-2 rounded bg-hermes-surface/50 text-xs">
              <span className="font-mono text-hermes-muted w-12">{event.time}</span>
              <span className="text-white font-medium w-32">{event.pair}</span>
              <span className="text-blue-400 w-10">{event.asset}</span>
              <span className={`font-mono w-20 ${parseFloat(event.spread) > 20 ? 'text-red-400' : 'text-emerald-400'}`}>{event.spread}</span>
              <span className="text-hermes-muted flex-1">{event.note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
