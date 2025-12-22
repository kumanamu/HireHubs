// src/page/kakaoLoader.ts
let kakaoPromise: Promise<void> | null = null;

export const loadKakaoMap = () => {
  if (kakaoPromise) return kakaoPromise;

  kakaoPromise = new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_JS_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => resolve());
    };

    script.onerror = reject;
    document.head.appendChild(script);
  });

  return kakaoPromise;
};
