import { useEffect, useRef } from "react";
import { loadKakaoMap } from "./kakaoLoader";

interface Props {
  lat: number;
  lng: number;
}

export default function KakaoMap({ lat, lng }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;

    loadKakaoMap()
      .then(() => {
        if (!mounted) return;

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
      })
      .catch((e) => {
        console.error("Kakao map init failed", e);
      });

    return () => {
      mounted = false;
    };
  }, [lat, lng]);

  return <div ref={mapRef} className="w-full h-full" />;
}
