// src/page/kakaoLoader.ts
export const loadKakaoMap = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_JS_KEY
    }&autoload=false`;

    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => resolve());
    };

    script.onerror = (e) => {
      console.error("❌ KakaoMap load error", e);
      reject(e);
    };

    document.head.appendChild(script);
  });
};
