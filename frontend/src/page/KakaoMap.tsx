import { useEffect, useRef } from "react";
import { loadKakaoMap } from "./kakaoLoader";

interface Props {
  lat: number;
  lng: number;
}

export default function KakaoMap({ lat, lng }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: kakao.maps.Map;
    console.error("Kakao SDK not ready");

    loadKakaoMap().then(() => {
      const container = mapRef.current;
      if (!container) return;

      map = new kakao.maps.Map(container, {
        center: new kakao.maps.LatLng(lat, lng),
        level: 3,
      });

      new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(lat, lng),
      });
    });
  }, [lat, lng]);

  return <div ref={mapRef} className="w-full h-full" />;
}
