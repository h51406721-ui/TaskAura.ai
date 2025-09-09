import { useEffect, useState } from "react";

export function usePresence(wsUrl: string) {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const ws = new WebSocket(wsUrl);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "presence") setUsers(data.users);
    };
    ws.onclose = () => setUsers([]);
    return () => ws.close();
  }, [wsUrl]);

  return users;
}
