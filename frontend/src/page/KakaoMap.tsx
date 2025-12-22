import { useEffect, useRef } from "react";
import { loadKakaoMap } from "./kakaoLoader";

interface Props {
  lat: number;
  lng: number;
}

const KakaoMap: React.FC<Props> = ({ lat, lng }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: kakao.maps.Map | null = null;

    loadKakaoMap()
      .then(() => {
        if (!mapRef.current) return;

        const center = new window.kakao.maps.LatLng(lat, lng);

        map = new window.kakao.maps.Map(mapRef.current, {
          center,
          level: 3,
        });

        new window.kakao.maps.Marker({
          map,
          position: center,
        });
      })
      .catch((err) => {
        console.error("❌ KakaoMap load error:", err);
      });

    return () => {
      map = null;
    };
  }, [lat, lng]);

  return <div ref={mapRef} className="w-full h-full" />;
};

export default KakaoMap;
