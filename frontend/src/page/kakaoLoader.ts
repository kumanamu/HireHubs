// src/page/kakaoLoader.ts
let kakaoPromise: Promise<void> | null = null;

export const loadKakaoMap = (): Promise<void> => {
  if (kakaoPromise) return kakaoPromise;

  kakaoPromise = new Promise((resolve, reject) => {
    // SDK 자체가 없는 경우 (index.html에 없을 때만)
    if (!window.kakao) {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
        import.meta.env.VITE_KAKAO_MAP_JS_KEY
      }&autoload=false`;
      script.async = true;

      script.onload = () => {
        window.kakao.maps.load(() => resolve());
      };

      script.onerror = reject;
      document.head.appendChild(script);
      return;
    }

    // ✅ SDK는 있지만 "준비"는 안 된 경우 → 무조건 maps.load
    window.kakao.maps.load(() => resolve());
  });

  return kakaoPromise;
};
