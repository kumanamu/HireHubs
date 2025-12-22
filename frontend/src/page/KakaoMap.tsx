import { useEffect, useRef } from "react";

interface Props {
  lat: number;
  lng: number;
}

const KakaoMap: React.FC<Props> = ({ lat, lng }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao SDK not loaded (script level)");
      return;
    }

    // 🔥 autoload=false 이면 이게 필수
    window.kakao.maps.load(() => {
      const center = new window.kakao.maps.LatLng(lat, lng);

      const map = new window.kakao.maps.Map(mapRef.current!, {
        center,
        level: 3,
      });

      new window.kakao.maps.Marker({
        map,
        position: center,
      });
    });
  }, [lat, lng]);

  return <div ref={mapRef} className="w-full h-full" />;
};

export default KakaoMap;
