import { useEffect, useRef } from "react";

export function useIndexedDBCache<T>(key: string, data: T, setData: (d: T) => void) {
  const dbRef = useRef<IDBDatabase | null>(null);

  useEffect(() => {
    const openReq = indexedDB.open("mindforge-db", 1);
    openReq.onupgradeneeded = () => {
      openReq.result.createObjectStore("cache");
    };
    openReq.onsuccess = () => {
      dbRef.current = openReq.result;
      // Load cached data
      const tx = dbRef.current.transaction("cache", "readonly");
      const store = tx.objectStore("cache");
      const getReq = store.get(key);
      getReq.onsuccess = () => {
        if (getReq.result) setData(getReq.result);
      };
    };
  }, [key, setData]);

  useEffect(() => {
    if (!dbRef.current) return;
    const tx = dbRef.current.transaction("cache", "readwrite");
    tx.objectStore("cache").put(data, key);
  }, [data, key]);
}
