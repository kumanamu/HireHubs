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
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_MAP_JS_KEY;

  useEffect(() => {
    console.log("🧪 KAKAO KEY =", KAKAO_JS_KEY);
    console.log("🧭 KakaoMap lat/lng =", lat, lng);

    if (!KAKAO_JS_KEY) {
      console.error("❌ VITE_KAKAO_MAP_JS_KEY 없음");
      return;
    }

    if (!mapContainerRef.current) {
      console.warn("⚠️ mapContainerRef 없음");
      return;
    }

    const initMap = () => {
      if (!mapContainerRef.current) return;

      const center = new window.kakao.maps.LatLng(lat, lng);

      mapRef.current = new window.kakao.maps.Map(
        mapContainerRef.current,
        {
          center,
          level: 3,
        }
      );

      new window.kakao.maps.Marker({
        map: mapRef.current,
        position: center,
      });

      // 🔥 핵심: 레이아웃 확정 후 강제 재계산
      setTimeout(() => {
        mapRef.current.relayout();
        mapRef.current.setCenter(center);
        console.log("✅ Kakao map relayout 완료");
      }, 300);
    };

    // ✅ SDK 이미 로드된 경우
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(initMap);
      return;
    }

    // ✅ SDK 최초 로드 (한 번만)
    const existingScript = document.querySelector(
      'script[src*="dapi.kakao.com/v2/maps/sdk.js"]'
    );
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JS_KEY}&autoload=false`;
    script.async = true;
    script.onload = () => {
      console.log("✅ Kakao SDK 로드 완료");
      window.kakao.maps.load(initMap);
    };

    document.head.appendChild(script);
  }, [lat, lng, KAKAO_JS_KEY]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "300px", // 🔥 이 줄 없으면 다시 안 뜸
        borderRadius: "10px",
      }}
    />
  );
};

export default KakaoMap;
