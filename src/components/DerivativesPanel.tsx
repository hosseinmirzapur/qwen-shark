import { useState } from 'react';
import { derivativesData } from '../data';
import { Layers, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

function formatOI(oi: number): string {
  if (oi >= 1e9) return `$${(oi / 1e9).toFixed(2)}B`;
  if (oi >= 1e6) return `$${(oi / 1e6).toFixed(1)}M`;
  return `$${(oi / 1e3).toFixed(0)}K`;
}

function FundingIndicator({ rate }: { rate: number }) {
  const absRate = Math.abs(rate);
  const color = absRate > 0.01 ? 'text-red-400' : absRate > 0.005 ? 'text-yellow-400' : 'text-emerald-400';
  const label = rate > 0.01 ? 'VERY HIGH' : rate > 0.005 ? 'ELEVATED' : rate > 0.001 ? 'MODERATE' : 'LOW';
  return (
    <div className="flex items-center gap-2">
      <span className={`font-mono text-sm font-medium ${color}`}>{(rate * 100).toFixed(4)}%</span>
      <span className={`text-xs px-1.5 py-0.5 rounded ${color} bg-current/10`}>{label}</span>
    </div>
  );
}

function OIChangeIndicator({ change }: { change: number }) {
  const isPositive = change > 0;
  return (
    <span className={`flex items-center gap-1 font-mono text-sm ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
      {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
      {isPositive ? '+' : ''}{change.toFixed(1)}%
    </span>
  );
}

export default function DerivativesPanel() {
  const [selectedSymbol, setSelectedSymbol] = useState('BTC-USDT-PERP');
  const symbols = [...new Set(derivativesData.map(d => d.symbol))];
  const filtered = derivativesData.filter(d => d.symbol === selectedSymbol);

  // Calculate combined metrics
  const totalOI = filtered.reduce((sum, d) => sum + d.openInterest, 0);
  const avgFunding = filtered.reduce((sum, d) => sum + d.fundingRate, 0) / filtered.length;
  const totalLiquidations = filtered.reduce((sum, d) => sum + d.liquidations24h, 0);
  const totalLongLiq = filtered.reduce((sum, d) => sum + d.longLiquidations, 0);
  const totalShortLiq = filtered.reduce((sum, d) => sum + d.shortLiquidations, 0);

  // Determine positioning state
  const oiExpanding = filtered.every(d => d.oiChange24h > 0);
  const fundingElevated = avgFunding > 0.008;
  const longDominated = totalLongLiq > totalShortLiq * 1.3;

  return (
    <div className="space-y-6">
      {/* Symbol Selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-hermes-muted">Instrument:</span>
        {symbols.map(sym => (
          <button
            key={sym}
            onClick={() => setSelectedSymbol(sym)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              selectedSymbol === sym
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'bg-hermes-card text-hermes-muted border border-hermes-border hover:border-hermes-accent/50'
            }`}
          >
            {sym}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-hermes-card border border-hermes-border rounded-lg p-4">
          <span className="text-xs text-hermes-muted">Total Open Interest</span>
          <p className="text-xl font-bold text-white font-mono mt-1">{formatOI(totalOI)}</p>
          <p className="text-xs text-emerald-400 mt-1">
            {oiExpanding ? '↑ Expanding across venues' : 'Mixed'}
          </p>
        </div>
        <div className="bg-hermes-card border border-hermes-border rounded-lg p-4">
          <span className="text-xs text-hermes-muted">Avg Funding Rate</span>
          <div className="mt-1">
            <FundingIndicator rate={avgFunding} />
          </div>
          <p className="text-xs text-hermes-muted mt-1">
            {fundingElevated ? '⚠️ Crowded long positioning' : 'Within normal range'}
          </p>
        </div>
        <div className="bg-hermes-card border border-hermes-border rounded-lg p-4">
          <span className="text-xs text-hermes-muted">24h Liquidations</span>
          <p className="text-xl font-bold text-white font-mono mt-1">{formatOI(totalLiquidations)}</p>
          <p className="text-xs text-hermes-muted mt-1">
            Long: {formatOI(totalLongLiq)} | Short: {formatOI(totalShortLiq)}
          </p>
        </div>
        <div className="bg-hermes-card border border-hermes-border rounded-lg p-4">
          <span className="text-xs text-hermes-muted">Market Fragility</span>
          <p className={`text-xl font-bold mt-1 ${
            fundingElevated && oiExpanding ? 'text-yellow-400' : 'text-emerald-400'
          }`}>
            {fundingElevated && oiExpanding ? 'MEDIUM' : 'LOW'}
          </p>
          <p className="text-xs text-hermes-muted mt-1">
            {fundingElevated && oiExpanding ? 'Crowded + expanding = cascade risk' : 'No immediate fragility signals'}
          </p>
        </div>
      </div>

      {/* Per-Venue Breakdown */}
      <div>
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-purple-400" />
          Per-Venue Derivatives Data
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.map(d => (
            <div key={d.provider} className="bg-hermes-card border border-hermes-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-white capitalize">{d.provider}</span>
                <span className="text-xs text-hermes-muted font-mono">{d.symbol}</span>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-xs text-hermes-muted">Open Interest</span>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-mono font-medium">{formatOI(d.openInterest)}</span>
                    <OIChangeIndicator change={d.oiChange24h} />
                  </div>
                </div>
                <div>
                  <span className="text-xs text-hermes-muted">Funding Rate</span>
                  <FundingIndicator rate={d.fundingRate} />
                </div>
                <div className="flex justify-between">
                  <div>
                    <span className="text-xs text-hermes-muted">Mark Price</span>
                    <p className="text-white font-mono">${d.markPrice.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-xs text-hermes-muted">Index Price</span>
                    <p className="text-white font-mono">${d.indexPrice.toLocaleString()}</p>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-hermes-muted">Basis</span>
                  <p className={`font-mono text-sm ${d.basis > 50 ? 'text-yellow-400' : 'text-white'}`}>${d.basis.toFixed(2)}</p>
                </div>
                <div>
                  <span className="text-xs text-hermes-muted">Liquidations (24h)</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-2 bg-hermes-surface rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-400 rounded-full"
                        style={{ width: `${(d.longLiquidations / d.liquidations24h) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-hermes-muted font-mono">
                      L:{(d.longLiquidations / 1e6).toFixed(1)}M S:{(d.shortLiquidations / 1e6).toFixed(1)}M
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Positioning Analysis */}
      <div className="bg-hermes-card border border-hermes-border rounded-lg p-4">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-yellow-400" />
          Positioning Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-hermes-muted mb-2">Price + OI Combination</h4>
            <div className="bg-hermes-surface rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-white text-sm">PRICE ↑ + OI ↑</span>
              </div>
              <p className="text-xs text-hermes-muted">
                New longs entering. Trend supported by fresh positioning. However, if funding is elevated, crowding risk increases.
              </p>
              <div className="mt-2 px-2 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs text-yellow-300">
                Current state: Active for {selectedSymbol.split('-')[0]}. Funding elevated — monitor for crowding.
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-hermes-muted mb-2">Crowding Assessment</h4>
            <div className="bg-hermes-surface rounded-lg p-3">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-hermes-muted">Funding z-score</span>
                  <span className={`font-mono ${avgFunding > 0.01 ? 'text-red-400' : 'text-white'}`}>
                    +{(avgFunding / 0.005).toFixed(1)}σ
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-hermes-muted">OI acceleration</span>
                  <span className="text-emerald-400 font-mono">+{(filtered[0]?.oiChange24h || 0).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-hermes-muted">Long/Short liq ratio</span>
                  <span className={`font-mono ${longDominated ? 'text-yellow-400' : 'text-white'}`}>
                    {(totalLongLiq / Math.max(totalShortLiq, 1)).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-hermes-muted">Crowding verdict</span>
                  <span className={`font-medium ${fundingElevated && oiExpanding ? 'text-yellow-400' : 'text-emerald-400'}`}>
                    {fundingElevated && oiExpanding ? 'CROWDED' : 'NORMAL'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
