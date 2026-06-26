import WebSocket from 'ws';

const ws = new WebSocket('wss://stream.binance.us:9443/stream?streams=ethusd@aggTrade/btcusdt@aggTrade');
//docs :https://www.binance.com/en/academy/articles/how-to-use-binance-websocket-stream




ws.on('open', () => {
  console.log('connected to binance');
});
ws.on('message', (data: WebSocket.RawData) => {
  const parsed = JSON.parse(data.toString());
  // combined stream shape: { stream: "btcusdt@aggTrade", data: {...} }
  console.log(parsed.stream, parsed.data.p); // p = price
});
ws.on('error', console.error);