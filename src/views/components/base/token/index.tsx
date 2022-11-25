import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import useAxiosLazyFetch from "utils/common/useAxiosLazyFetch";

export default function TokenWithImage({ symbol }: { symbol?: string }) {
  const iconApi = "https://giftdapp.rigelprotocol.com/icons/";
  const slugApi = "https://giftdapp.rigelprotocol.com/api/v1/slug/";
  const {
    fetchRequest: fetchSlug,
    loading,
    data,
  } = useAxiosLazyFetch<{
    slugs: boolean;
    result: string;
  }>(slugApi);
  const icon = (image?: string) => {
    return iconApi + (image || "ethereum") + ".png";
  };
  useEffect(() => {
    if (!symbol) return;
    (async () => {
      fetchSlug({
        url: slugApi + symbol,
      });
    })();
  }, [symbol]);
  return (
    <div style={{ padding: 5, display: "flex", alignItems: "center" }}>
      {loading ? (
        <CircularProgress size={14} />
      ) : (
        <img
          style={{ fontSize: 14, marginRight: 5 }}
          src={icon(data?.result)}
          alt={`token-${symbol}`}
        />
      )}
      {symbol}
    </div>
  );
}
