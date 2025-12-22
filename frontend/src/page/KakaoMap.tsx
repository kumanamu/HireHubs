import { useEffect, useRef } from "react";

interface Props {
  lat: number;
  lng: number;
}

export default function KakaoMap({ lat, lng }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps || !mapRef.current) {
      console.error("Kakao SDK not loaded");
      return;
    }

    const center = new window.kakao.maps.LatLng(lat, lng);

    new window.kakao.maps.Map(mapRef.current, {
      center,
      level: 3,
    });
  }, [lat, lng]);

  return <div ref={mapRef} className="w-full h-full" />;
}
