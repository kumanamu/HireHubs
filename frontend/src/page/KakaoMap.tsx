import { useEffect, useRef, useState } from "react";

interface Props {
  lat: number | null;
  lng: number | null;
}

const KakaoMap: React.FC<Props> = ({ lat, lng }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<kakao.maps.Map | null>(null);
  const markerInstance = useRef<kakao.maps.Marker | null>(null);

  const [mounted, setMounted] = useState(false);

  // ✅ SSR-safe
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!mapRef.current) return;
    if (!window.kakao || !window.kakao.maps) return;

    // ✅ 핵심: lat / lng 가드 (이거 없어서 지금까지 안 떴음)
    if (lat == null || lng == null) return;

    const center = new window.kakao.maps.LatLng(lat, lng);

    // ✅ 이미 지도 있으면 center만 이동
    if (mapInstance.current) {
      mapInstance.current.setCenter(center);

      if (markerInstance.current) {
        markerInstance.current.setPosition(center);
      }

      return;
    }

    // ✅ 최초 1회만 지도 생성
    mapInstance.current = new window.kakao.maps.Map(mapRef.current, {
      center,
      level: 3,
    });

    markerInstance.current = new window.kakao.maps.Marker({
      map: mapInstance.current,
      position: center,
    });
  }, [mounted, lat, lng]);

  // ✅ SSR / hydration 안정성
  if (!mounted) return null;

  return (
    <div
      ref={mapRef}
      className="w-full h-full"
    />
  );
};

export default KakaoMap;
