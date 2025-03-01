import { AxiosRequestConfig, CanceledError } from "axios";
import { useEffect, useState, useCallback } from "react";
import apiClient from "../services/api-client";

interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Memoized fetch function to prevent unnecessary API calls
  const fetchData = useCallback(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError("");

    apiClient
      .get<FetchResponse<T>>(endpoint, { signal: controller.signal, ...requestConfig })
      .then((res) => {
        setData(res.data.results || []); // Ensure empty response doesn't break the UI
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, deps ? [...deps] : []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, isLoading };
};

export default useData;
