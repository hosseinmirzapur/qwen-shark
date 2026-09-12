import { useState } from 'react';
import { Asset } from '../types';
import { marketTickers, priceHistory } from '../data';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const assets: Asset[] = ['BTC', 'ETH', 'SOL', 'XRP', 'DOGE'];

function formatPrice(price: number): string {
  if (price >= 1000) return price.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  if (price >= 1) return price.toFixed(2);
  return price.toFixed(4);
}

function formatVolume(vol: number): string {
  if (vol >= 1e9) return `$${(vol / 1e9).toFixed(2)}B`;
  if (vol >= 1e6) return `$${(vol / 1e6).toFixed(1)}M`;
  return `$${(vol / 1e3).toFixed(0)}K`;
}

export default function MarketUniverse() {
  const [selectedAsset, setSelectedAsset] = useState<Asset>('BTC');
  const assetTickers = marketTickers.filter(t => t.asset === selectedAsset);
  const history = priceHistory[selectedAsset as keyof typeof priceHistory] || [];

  return (
    <div className="space-y-6">
      {/* Asset Selector */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-hermes-muted mr-2">Universe:</span>
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
        <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-hermes-card text-hermes-muted border border-hermes-border hover:border-hermes-accent/50 border-dashed">
          + Add
        </button>
      </div>

      {/* Price Chart */}
      <div className="bg-hermes-card border border-hermes-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-400" />
            {selectedAsset}/USDT — Cross-Exchange Price (24h)
          </h3>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-blue-400 inline-block" /> KuCoin</span>
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-purple-400 inline-block" /> Toobit</span>
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-orange-400 inline-block" /> BitPin</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={history}>
            <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#9ca3af' }} tickFormatter={(v) => new Date(v).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })} />
            <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} domain={['auto', 'auto']} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a2235', border: '1px solid #2a3548', borderRadius: '8px', fontSize: '12px' }}
              labelFormatter={(v) => new Date(v).toLocaleString()}
            />
            <Line type="monotone" dataKey="kucoin" stroke="#3b82f6" strokeWidth={2} dot={false} name="KuCoin" />
            <Line type="monotone" dataKey="toobit" stroke="#8b5cf6" strokeWidth={2} dot={false} name="Toobit" />
            <Line type="monotone" dataKey="bitpin" stroke="#f97316" strokeWidth={2} dot={false} name="BitPin" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Ticker Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {assetTickers.map(ticker => (
          <div key={`${ticker.provider}-${ticker.asset}`} className="bg-hermes-card border border-hermes-border rounded-lg p-4 hover:border-hermes-accent/50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  ticker.provider === 'kucoin' ? 'bg-blue-400' : ticker.provider === 'toobit' ? 'bg-purple-400' : 'bg-orange-400'
                }`} />
                <span className="font-semibold text-white capitalize">{ticker.provider}</span>
              </div>
              <span className="text-xs text-hermes-muted font-mono">{ticker.symbol}</span>
            </div>
            <div className="flex items-end justify-between mb-3">
              <span className="text-2xl font-bold text-white font-mono">${formatPrice(ticker.price)}</span>
              <span className={`flex items-center gap-1 text-sm font-medium ${ticker.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {ticker.change24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {ticker.change24h >= 0 ? '+' : ''}{ticker.change24h.toFixed(2)}%
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
              <div>
                <span className="text-hermes-muted">24h Volume</span>
                <p className="text-white font-mono">{formatVolume(ticker.volume24h)}</p>
              </div>
              <div>
                <span className="text-hermes-muted">Spread</span>
                <p className="text-white font-mono">${ticker.spread.toFixed(2)}</p>
              </div>
              <div>
                <span className="text-hermes-muted">24h High</span>
                <p className="text-white font-mono">${formatPrice(ticker.high24h)}</p>
              </div>
              <div>
                <span className="text-hermes-muted">24h Low</span>
                <p className="text-white font-mono">${formatPrice(ticker.low24h)}</p>
              </div>
              <div>
                <span className="text-hermes-muted">Bid</span>
                <p className="text-emerald-400 font-mono">${formatPrice(ticker.bid)}</p>
              </div>
              <div>
                <span className="text-hermes-muted">Ask</span>
                <p className="text-red-400 font-mono">${formatPrice(ticker.ask)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Multi-Asset Summary */}
      <div>
        <h3 className="text-white font-semibold mb-3">All Assets Summary (KuCoin Primary)</h3>
        <div className="bg-hermes-card border border-hermes-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-hermes-border">
                <th className="text-left px-4 py-2 text-hermes-muted font-medium">Asset</th>
                <th className="text-right px-4 py-2 text-hermes-muted font-medium">Price</th>
                <th className="text-right px-4 py-2 text-hermes-muted font-medium">24h %</th>
                <th className="text-right px-4 py-2 text-hermes-muted font-medium">Volume</th>
                <th className="text-right px-4 py-2 text-hermes-muted font-medium">Spread</th>
              </tr>
            </thead>
            <tbody>
              {marketTickers.filter(t => t.provider === 'kucoin').map(ticker => (
                <tr key={ticker.asset} className="border-b border-hermes-border/50 hover:bg-hermes-surface/50 cursor-pointer" onClick={() => setSelectedAsset(ticker.asset)}>
                  <td className="px-4 py-2.5 font-medium text-white">{ticker.asset}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-white">${formatPrice(ticker.price)}</td>
                  <td className={`px-4 py-2.5 text-right font-mono ${ticker.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {ticker.change24h >= 0 ? '+' : ''}{ticker.change24h.toFixed(2)}%
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono text-hermes-muted">{formatVolume(ticker.volume24h)}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-hermes-muted">${ticker.spread.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
