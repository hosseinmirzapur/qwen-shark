import { useState } from 'react';
import { newsItems } from '../data';
import { Newspaper, AlertTriangle, Globe, Zap } from 'lucide-react';

function SeverityBadge({ severity }: { severity: string }) {
  const colors: Record<string, string> = {
    ROUTINE: 'bg-gray-500/20 text-gray-400',
    RELEVANT: 'bg-blue-500/20 text-blue-400',
    MARKET_MOVING: 'bg-yellow-500/20 text-yellow-400',
    HIGH_IMPACT: 'bg-orange-500/20 text-orange-400',
    EXTREME_EVENT: 'bg-red-500/20 text-red-400',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[severity] || colors.ROUTINE}`}>
      {severity.replace(/_/g, ' ')}
    </span>
  );
}

function ConfirmationBadge({ confirmation }: { confirmation: string }) {
  const colors: Record<string, string> = {
    FACT: 'bg-emerald-500/20 text-emerald-400',
    REPORT: 'bg-blue-500/20 text-blue-400',
    CLAIM: 'bg-yellow-500/20 text-yellow-400',
    RUMOR: 'bg-red-500/20 text-red-400',
    COMMENTARY: 'bg-purple-500/20 text-purple-400',
    ANALYSIS: 'bg-cyan-500/20 text-cyan-400',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[confirmation] || colors.ROUTINE}`}>
      {confirmation}
    </span>
  );
}

function SourceIcon({ source }: { source: string }) {
  const colors: Record<string, string> = {
    bertina: 'bg-red-500/20 text-red-400 border-red-500/30',
    arzdigital: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    tgju: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    bitycle: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  };
  const labels: Record<string, string> = {
    bertina: 'BR',
    arzdigital: 'AD',
    tgju: 'TG',
    bitycle: 'BC',
  };
  return (
    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${colors[source]}`}>
      {labels[source]}
    </span>
  );
}

export default function NewsPanel() {
  const [filter, setFilter] = useState<string>('all');
  const sources = ['all', 'bertina', 'arzdigital', 'tgju', 'bitycle'];

  const filtered = filter === 'all' ? newsItems : newsItems.filter(n => n.source === filter);
  const highImpact = newsItems.filter(n => n.severity === 'HIGH_IMPACT' || n.severity === 'MARKET_MOVING' || n.severity === 'EXTREME_EVENT');

  return (
    <div className="space-y-6">
      {/* Source Priority Banner */}
      <div className="bg-hermes-card border border-hermes-border rounded-lg p-4">
        <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
          <Globe className="w-4 h-4 text-orange-400" />
          News Source Priority (Local-First Architecture)
        </h3>
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="px-2 py-1 bg-red-500/10 border border-red-500/20 rounded text-red-300">1. Bertina Radar</span>
          <span className="text-hermes-muted">→</span>
          <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-blue-300">2. Arzdigital</span>
          <span className="text-hermes-muted">→</span>
          <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-300">3. Bitycle</span>
          <span className="text-hermes-muted">→</span>
          <span className="px-2 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded text-yellow-300">4. TGJU</span>
          <span className="text-hermes-muted">→</span>
          <span className="px-2 py-1 bg-gray-500/10 border border-gray-500/20 rounded text-gray-400 line-through">International (blocked)</span>
        </div>
        <p className="text-xs text-hermes-muted mt-2">
          No single external website is a single point of failure. System continues with available sources.
        </p>
      </div>

      {/* High Impact Alerts */}
      {highImpact.length > 0 && (
        <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
          <h3 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Active High-Impact Events ({highImpact.length})
          </h3>
          <div className="space-y-2">
            {highImpact.map(item => (
              <div key={item.id} className="flex items-start gap-3 p-2 bg-hermes-surface/50 rounded">
                <SourceIcon source={item.source} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate" dir={item.language === 'fa' ? 'rtl' : 'ltr'}>
                    {item.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <SeverityBadge severity={item.severity} />
                    <ConfirmationBadge confirmation={item.confirmation} />
                    <span className="text-xs text-hermes-muted">
                      {new Date(item.publishedAt).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-hermes-muted">Filter:</span>
        {sources.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
              filter === s
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'bg-hermes-card text-hermes-muted border border-hermes-border hover:border-hermes-accent/50'
            }`}
          >
            {s === 'all' ? 'All Sources' : s === 'bertina' ? 'Bertina Radar' : s}
          </button>
        ))}
      </div>

      {/* News Feed */}
      <div className="space-y-3">
        {filtered.map(item => (
          <div key={item.id} className="bg-hermes-card border border-hermes-border rounded-lg p-4 hover:border-hermes-accent/30 transition-colors animate-slide-in">
            <div className="flex items-start gap-3">
              <SourceIcon source={item.source} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs text-hermes-muted capitalize">
                    {item.source === 'bertina' ? 'Bertina Radar' : item.source}
                  </span>
                  <span className="text-xs text-hermes-muted">•</span>
                  <span className="text-xs text-hermes-muted">{item.category}</span>
                  {!item.isOriginal && (
                    <>
                      <span className="text-xs text-hermes-muted">•</span>
                      <span className="text-xs text-yellow-400">Aggregator</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-white font-medium" dir={item.language === 'fa' ? 'rtl' : 'ltr'}>
                  {item.title}
                </p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <SeverityBadge severity={item.severity} />
                  <ConfirmationBadge confirmation={item.confirmation} />
                  {item.entities.length > 0 && (
                    <span className="text-xs text-blue-400">
                      {item.entities.join(', ')}
                    </span>
                  )}
                  <span className={`text-xs font-mono ${item.sentiment > 0.3 ? 'text-emerald-400' : item.sentiment < -0.3 ? 'text-red-400' : 'text-hermes-muted'}`}>
                    {item.sentiment > 0 ? '+' : ''}{item.sentiment.toFixed(1)}
                  </span>
                  <span className="text-xs text-hermes-muted ml-auto">
                    {new Date(item.publishedAt).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Event Database Note */}
      <div className="bg-hermes-card border border-hermes-border rounded-lg p-4">
        <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyan-400" />
          Event Intelligence Layer
        </h3>
        <div className="text-xs text-hermes-muted space-y-1">
          <p>• Each news item is classified by: event type, severity, confirmation status, asset relevance, sentiment</p>
          <p>• Bertina Radar items are treated as discovery — original source must be identified before high-confidence classification</p>
          <p>• Aggregator headlines ≠ primary-source confirmation</p>
          <p>• Rumors are never converted into high-confidence trading theses</p>
          <p>• Event database enables future testing: "Does event classifier improve risk-adjusted performance?"</p>
        </div>
      </div>
    </div>
  );
}
