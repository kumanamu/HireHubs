import { useEffect, useRef } from "react";

let kakaoMapPromise: Promise<void> | null = null;

function loadKakaoMap() {
  if (kakaoMapPromise) return kakaoMapPromise;

  kakaoMapPromise = new Promise((resolve, reject) => {
    if (window.kakao?.maps) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=2e719824edfa619ecac23825b67ff17d&autoload=false";
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => resolve());
    };
    script.onerror = reject;

    document.head.appendChild(script);
  });

  return kakaoMapPromise;
}

interface Props {
  lat: number;
  lng: number;
}

export default function KakaoMap({ lat, lng }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: any;

    loadKakaoMap()
      .then(() => {
        if (!mapRef.current) return;

        const center = new window.kakao.maps.LatLng(lat, lng);
        map = new window.kakao.maps.Map(mapRef.current, {
          center,
          level: 3,
        });

        new window.kakao.maps.Marker({
          map,
          position: center,
        });

        // 🔥 이 한 줄이 핵심
        window.kakao.maps.event.trigger(map, "resize");
      })
      .catch(console.error);

    return () => {
      map = null;
    };
  }, [lat, lng]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "200px", // 👈 중요
      }}
    />
  );
}
