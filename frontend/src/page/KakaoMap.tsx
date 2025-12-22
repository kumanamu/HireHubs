import { useEffect, useRef } from "react";

interface Props {
  lat: number;
  lng: number;
}

export default function KakaoMap({ lat, lng }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (!window.kakao || !window.kakao.maps) {
    console.error("Kakao SDK not ready");
    return;
  }

  window.kakao.maps.load(() => {
    const container = mapRef.current;
    if (!container) return;

    const map = new window.kakao.maps.Map(container, {
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
