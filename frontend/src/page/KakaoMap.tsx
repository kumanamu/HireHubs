import { useEffect, useRef, useState } from "react";

interface Props {
  lat: number;
  lng: number;
}

const KakaoMap: React.FC<Props> = ({ lat, lng }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!mapRef.current) return;
    if (!window.kakao?.maps) return;

    const center = new window.kakao.maps.LatLng(lat, lng);

    const map = new window.kakao.maps.Map(mapRef.current, {
      center,
      level: 3,
    });

    new window.kakao.maps.Marker({
      map,
      position: center,
    });
  }, [mounted, lat, lng]);

  if (!mounted) return null;

  // ✅ 여기 중요
  return <div ref={mapRef} className="w-full h-[100%]" />;
};

export default KakaoMap;
