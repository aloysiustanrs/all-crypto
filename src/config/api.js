export const CoinList = () =>
  `https://api.coingecko.com/api/v3/coins/list?include_platform=false`;

export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = () => ``;

export const TrendingCoins = () =>
  `https://api.coingecko.com/api/v3/search/trending`;

export const GlobalStats = () => `https://api.coingecko.com/api/v3/global`;
