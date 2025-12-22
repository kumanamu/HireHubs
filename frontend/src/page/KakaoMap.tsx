import { useEffect, useRef } from "react";

interface KakaoMapProps {
  lat: number;
  lng: number;
}

const KakaoMap: React.FC<KakaoMapProps> = ({ lat, lng }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const kakaoMapRef = useRef<any>(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps || !mapRef.current) return;

    const { kakao } = window;

    kakao.maps.load(() => {
      const center = new kakao.maps.LatLng(lat, lng);

      kakaoMapRef.current = new kakao.maps.Map(mapRef.current, {
        center,
        level: 3,
      });

      new kakao.maps.Marker({
        position: center,
        map: kakaoMapRef.current,
      });

      /** 🔥 핵심: 강제 리레이아웃 */
      setTimeout(() => {
        kakaoMapRef.current.relayout();
        kakaoMapRef.current.setCenter(center);
      }, 300);
    });
  }, [lat, lng]);

  return (
    <div
      ref={mapRef}
      className="w-full h-full min-h-[200px]"
      style={{ position: "relative" }}
    />
  );
};

export default KakaoMap;
