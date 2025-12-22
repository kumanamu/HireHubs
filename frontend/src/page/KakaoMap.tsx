import { useEffect, useRef } from "react";
import { loadKakaoMap } from "./kakaoLoader";

interface Props {
  lat: number;
  lng: number;
}

export default function KakaoMap({ lat, lng }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: kakao.maps.Map | null = null;

    loadKakaoMap().then(() => {
      const container = mapRef.current;
      if (!container) return;
      console.error("Kakao SDK not ready");

      map = new window.kakao.maps.Map(container, {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 3,
      });

      new window.kakao.maps.Marker({
        map,
        position: new window.kakao.maps.LatLng(lat, lng),
      });
    });
  }, [lat, lng]);

  return <div ref={mapRef} className="w-full h-full" />;
}
