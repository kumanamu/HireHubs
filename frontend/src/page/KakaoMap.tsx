import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  lat: number;
  lng: number;
}

const KakaoMap = ({ lat, lng }: KakaoMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_MAP_JS_KEY;
  console.log("🧪 KAKAO KEY =", KAKAO_JS_KEY);
  console.log("🧭 KakaoMap lat/lng =", lat, lng);

  useEffect(() => {
    if (!KAKAO_JS_KEY || !mapContainer.current) return;

    const existingScript = document.querySelector(
      'script[src*="dapi.kakao.com"]'
    );

    const loadMap = () => {
      window.kakao.maps.load(() => {
        if (!mapContainer.current) return;

        const center = new window.kakao.maps.LatLng(lat, lng);

        const map = new window.kakao.maps.Map(mapContainer.current, {
          center,
          level: 3,
        });

        new window.kakao.maps.Marker({
          map,
          position: center,
        });

        // ⭐⭐⭐ 핵심 한 줄 ⭐⭐⭐
        setTimeout(() => {
          map.relayout();
          map.setCenter(center);
        }, 0);
      });
    };

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JS_KEY}&autoload=false`;
      script.async = true;
      script.onload = loadMap;
      document.head.appendChild(script);
    } else {
      loadMap();
    }
  }, [lat, lng, KAKAO_JS_KEY]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "200px",
      }}
    />
  );
};

export default KakaoMap;
