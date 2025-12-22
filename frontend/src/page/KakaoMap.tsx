import { useEffect, useRef } from "react";
import { loadKakaoMap } from "./kakaoLoader";

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
    let map: any;

    loadKakaoMap(KAKAO_KEY).then(() => {
      if (!ref.current) return;

      const center = new window.kakao.maps.LatLng(lat, lng);
      map = new window.kakao.maps.Map(ref.current, {
        center,
        level: 3,
      });

      new window.kakao.maps.Marker({ map, position: center });
    });

    return () => {
      map = null;
    };
  }, [lat, lng]);

  return <div ref={ref} className="w-full h-full" />;
};

export default KakaoMap;
