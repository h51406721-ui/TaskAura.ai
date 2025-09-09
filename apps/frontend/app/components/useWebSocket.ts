import { useEffect, useRef } from "react";

export function useWebSocket(url: string, onMessage: (msg: any) => void) {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(url);
    ws.current.onmessage = (event) => {
      onMessage(JSON.parse(event.data));
    };
    return () => {
      ws.current?.close();
    };
  }, [url, onMessage]);

  function send(data: any) {
    ws.current?.send(JSON.stringify(data));
  }

  return { send };
}
