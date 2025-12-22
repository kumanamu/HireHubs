import { useEffect, useRef } from "react";
import { loadKakaoMap } from "../utils/kakaoLoader";

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  lat: number;
  lng: number;
}

const KakaoMap: React.FC<Props> = ({ lat, lng }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_MAP_JS_KEY;

  useEffect(() => {
    if (!mapRef.current) return;

    loadKakaoMap(KAKAO_JS_KEY).then(() => {
      const center = new window.kakao.maps.LatLng(lat, lng);

      const map = new window.kakao.maps.Map(mapRef.current, {
        center,
        level: 3,
      });

      new window.kakao.maps.Marker({
        map,
        position: center,
      });

      // 🔑 레이아웃 강제 재계산 (이거 없으면 height 있어도 안 보이는 케이스 있음)
      setTimeout(() => {
        map.relayout();
        map.setCenter(center);
      }, 0);
    });
  }, [lat, lng, KAKAO_JS_KEY]);

  return <div ref={mapRef} className="w-full h-full" />;
};

export default KakaoMap;
