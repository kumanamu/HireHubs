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

    const loadKakaoMap = () => {
      window.kakao.maps.load(() => {
        if (!mapContainerRef.current) return;

        const center = new window.kakao.maps.LatLng(lat, lng);

        const map = new window.kakao.maps.Map(mapContainerRef.current, {
          center,
          level: 3,
        });

        new window.kakao.maps.Marker({
          map,
          position: center,
        });

        // 🔥 핵심: 렌더링 타이밍 보정
        setTimeout(() => {
          map.relayout();
          map.setCenter(center);
          console.log("✅ Kakao map relayout 완료");
        }, 0);
      });
    };

    // 이미 SDK 로드된 경우
    if (window.kakao && window.kakao.maps) {
      loadKakaoMap();
      return;
    }

    // SDK 아직 없는 경우 → script 주입
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JS_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      console.log("✅ Kakao SDK 로드 완료");
      loadKakaoMap();
    };

    script.onerror = () => {
      console.error("❌ Kakao SDK 로드 실패");
    };

    document.head.appendChild(script);

    return () => {
      // script 제거는 굳이 안 해도 되지만, 안전용
      document.head.removeChild(script);
    };
  }, [lat, lng, KAKAO_JS_KEY]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "300px", // 🔥 이 줄이 지도 안 뜨던 원인 박살냄
        borderRadius: "10px",
      }}
    />
  );
};

export default KakaoMap;
