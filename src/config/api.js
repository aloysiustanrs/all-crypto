export const CoinList = () =>
  `https://api.coingecko.com/api/v3/coins/list?include_platform=false`;

export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = () => ``;

export const TrendingCoins = () =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

export const GlobalStats = () => `https://api.coingecko.com/api/v3/global`;
