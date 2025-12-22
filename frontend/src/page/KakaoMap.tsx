import { useEffect, useRef } from "react";

interface Props {
  lat: number;
  lng: number;
}

export default function KakaoMap({ lat, lng }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const kakaoMapRef = useRef<any>(null);

  useEffect(() => {
    if (!window.kakao || !mapRef.current) return;

    const center = new window.kakao.maps.LatLng(lat, lng);

    const map = new window.kakao.maps.Map(mapRef.current, {
      center,
      level: 3,
    });

    kakaoMapRef.current = map;

    // 🔥🔥🔥 최후 루트 핵심
    setTimeout(() => {
      map.relayout();
      map.setCenter(center);
    }, 300);
  }, [lat, lng]);

  return (
    <div
      ref={mapRef}
      className="w-full h-full"
      style={{ minHeight: "300px" }}
    />
  );
}
