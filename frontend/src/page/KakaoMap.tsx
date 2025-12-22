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
  const ref = useRef<HTMLDivElement>(null);
  const KAKAO_KEY = import.meta.env.VITE_KAKAO_MAP_JS_KEY;

  useEffect(() => {
    if (!ref.current) return;

    loadKakaoMap(KAKAO_KEY).then(() => {
      const center = new window.kakao.maps.LatLng(lat, lng);

      const map = new window.kakao.maps.Map(ref.current, {
        center,
        level: 3,
      });

      new window.kakao.maps.Marker({
        map,
        position: center,
      });

      // 🔥 이거 없으면 모바일/SPA에서 안 나오는 경우 있음
      setTimeout(() => {
        map.relayout();
        map.setCenter(center);
      }, 0);
    });
  }, [lat, lng, KAKAO_KEY]);

  return <div ref={ref} className="w-full h-full" />;
};

export default KakaoMap;
