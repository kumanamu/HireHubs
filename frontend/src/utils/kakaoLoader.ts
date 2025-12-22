// src/utils/kakaoLoader.ts
let kakaoPromise: Promise<void> | null = null;

export function loadKakaoMap(apiKey: string) {
  if (kakaoPromise) return kakaoPromise;

  kakaoPromise = new Promise((resolve, reject) => {
    // 이미 로드된 경우
    if (window.kakao && window.kakao.maps) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        resolve();
      });
    };

    script.onerror = reject;

    document.head.appendChild(script);
  });

  return kakaoPromise;
}
