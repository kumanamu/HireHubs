import { useEffect, useRef, useState } from "react";

interface Props {
  lat: number;
  lng: number;
}

const KakaoMap: React.FC<Props> = ({ lat, lng }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  // 1️⃣ 클라이언트 체크
  useEffect(() => {
    if (typeof window !== "undefined") {
      setReady(true);
    }
  }, []);

  // 2️⃣ 지도 생성
  useEffect(() => {
    if (!ready || !mapRef.current) return;
    if (!window.kakao?.maps) return;

    const center = new window.kakao.maps.LatLng(lat, lng);
    const map = new window.kakao.maps.Map(mapRef.current, {
      center,
      level: 3,
    });

    new window.kakao.maps.Marker({ map, position: center });
  }, [ready, lat, lng]);

  // 3️⃣ SSR 단계에서는 null 반환
  if (!ready) return null;

  return <div ref={mapRef} className="w-full h-full" />;
};

export default KakaoMap;
