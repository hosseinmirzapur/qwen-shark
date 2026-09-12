export type Asset = 'BTC' | 'ETH' | 'SOL' | 'XRP' | 'DOGE';

export type Provider = 'kucoin' | 'toobit' | 'bitpin';

export type NewsSource = 'bitycle' | 'arzdigital' | 'tgju' | 'bertina';

export type ProviderStatus = 'HEALTHY' | 'DEGRADED' | 'DOWN' | 'CONNECTING';

export type MarketRegime = 
  | 'TRENDING_UP' 
  | 'TRENDING_DOWN' 
  | 'RANGE' 
  | 'HIGH_VOLATILITY' 
  | 'LOW_VOLATILITY' 
  | 'LIQUIDITY_STRESS' 
  | 'CROWDED_LONG' 
  | 'CROWDED_SHORT' 
  | 'EVENT_RISK' 
  | 'NEWS_SHOCK' 
  | 'UNKNOWN';

export type Direction = 'LONG' | 'SHORT' | 'NO_TRADE';

export type Decision = 'TRADEABLE' | 'WAIT' | 'NO_TRADE' | 'DATA_INVALID';

export type DataQuality = 'GOOD' | 'DEGRADED' | 'INVALID';

export type Fragility = 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';

export type EventSeverity = 'ROUTINE' | 'RELEVANT' | 'MARKET_MOVING' | 'HIGH_IMPACT' | 'EXTREME_EVENT';

export type ConfirmationStatus = 'FACT' | 'REPORT' | 'CLAIM' | 'RUMOR' | 'COMMENTARY' | 'ANALYSIS';

export interface ProviderHealth {
  provider: Provider;
  status: ProviderStatus;
  latency_ms: number;
  uptime: number;
  lastMessage: string;
  reconnectCount: number;
  sequenceGaps: number;
  role: 'PRIMARY' | 'SECONDARY' | 'IRANIAN_LOCAL';
}

export interface MarketTicker {
  symbol: string;
  asset: Asset;
  provider: Provider;
  price: number;
  change24h: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  bid: number;
  ask: number;
  spread: number;
  timestamp: string;
}

export interface DerivativesData {
  symbol: string;
  provider: Provider;
  openInterest: number;
  oiChange24h: number;
  fundingRate: number;
  fundingNext: string;
  markPrice: number;
  indexPrice: number;
  basis: number;
  liquidations24h: number;
  longLiquidations: number;
  shortLiquidations: number;
}

export interface CrossExchangeMetrics {
  pair: [Provider, Provider];
  asset: Asset;
  priceSpread: number;
  priceSpreadBps: number;
  volumeRatio: number;
  oiDifference: number;
  fundingDifference: number;
  basisDifference: number;
  status: 'NORMAL' | 'TEMPORARY_DISLOCATION' | 'LIQUIDITY_DISTORTION' | 'STALE_DATA' | 'ABNORMAL_DIVERGENCE';
}

export interface NewsItem {
  id: string;
  source: NewsSource;
  title: string;
  url: string;
  publishedAt: string;
  detectedAt: string;
  language: 'fa' | 'en';
  category: string;
  entities: Asset[];
  severity: EventSeverity;
  confirmation: ConfirmationStatus;
  sentiment: number;
  isOriginal: boolean;
}

export interface Signal {
  canonical_symbol: string;
  providers: Provider[];
  timestamp: string;
  time_horizon: string;
  regime: MarketRegime;
  direction: Direction;
  probability_up: number;
  probability_down: number;
  expected_return: number;
  estimated_cost: number;
  expected_net_edge: number;
  volatility: number;
  funding_state: string;
  oi_state: string;
  liquidation_fragility: Fragility;
  flow_state: string;
  cross_exchange_state: string;
  news_state: string;
  iran_market_state: string;
  data_quality: DataQuality;
  evidence_for: string[];
  evidence_against: string[];
  historical_support: string;
  confidence: number;
  decision: Decision;
  reason: string;
}

export interface IranMarketData {
  usdtIrt: number;
  btcIrt: number;
  goldPrice: number;
  goldUsd: number;
  localPremium: number;
  connectivityStatus: 'NORMAL' | 'DEGRADED' | 'DISRUPTED';
  lastUpdate: string;
}

export interface SystemConfig {
  symbols: Asset[];
  providers: Provider[];
  newsSources: NewsSource[];
  timeframes: string[];
  riskLimit: number;
  maxLeverage: number;
  feeRate: number;
  slippageEstimate: number;
}
