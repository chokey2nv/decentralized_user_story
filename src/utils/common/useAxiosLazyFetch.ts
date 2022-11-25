import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError, CancelTokenSource } from "axios";
export type FetchRequest = ({
  url,
  onSuccess,
  onFailure,
}: {
  url?: string;
  onSuccess?: (data: any) => void;
  onFailure?: (error: AxiosError) => void;
}) => Promise<void>;
const useAxiosLazyFetch = <T>(url: string, timeout?: number) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState<boolean>(true);
  const [source, setSource] = useState<CancelTokenSource | null>(null);
  const runRequest = useCallback(
    async (newUrl?: string) => {
      try {
        const apiUrl = newUrl || url;
        if (!apiUrl) return;
        let source = axios.CancelToken.source();
        setSource(source);
        const { data } = await axios.get(apiUrl, {
          cancelToken: source.token,
          timeout: timeout,
        });
        if (mounted) {
          // @ts-ignore
          setData(data);
          setLoading(false);
        }
        return { data };
      } catch (e: any) {
        if (mounted) {
          setError(true);
          setErrorMessage(e.message);
          setLoading(false);
          if (axios.isCancel(e)) {
            console.log(`request cancelled:${e.message}`);
          } else {
            console.log("another error happened:" + e.message);
          }
        }
        return { error: e };
      }
    },
    [url, timeout, mounted]
  );
  useEffect(() => {
    return function () {
      setMounted(false);
      if (source) source.cancel("Cancelling in cleanup");
    };
  }, [source]);
  const fetchRequest: FetchRequest = async ({ url, onSuccess, onFailure }) => {
    const res = await runRequest(url);
    if (res?.data && onSuccess) {
      onSuccess(res.data);
    }
    if (res?.error && onFailure) {
      onFailure(res.error);
    }
  };
  return { fetchRequest, data, loading, error, errorMessage };
};

export default useAxiosLazyFetch;
