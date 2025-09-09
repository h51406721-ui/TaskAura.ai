import { useEffect, useState } from "react";

export function useSummaries(period?: string) {
  const [summaries, setSummaries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let url = "/api/summaries";
    if (period) url += `?period=${period}`;
    fetch(url)
      .then(res => res.json())
      .then(data => setSummaries(data))
      .finally(() => setLoading(false));
  }, [period]);

  return { summaries, loading };
}
