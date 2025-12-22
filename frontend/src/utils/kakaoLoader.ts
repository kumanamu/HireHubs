let kakaoPromise: Promise<void> | null = null;

export const loadKakaoMap = (key: string) => {
  if (kakaoPromise) return kakaoPromise;

  kakaoPromise = new Promise((resolve, reject) => {
    if (window.kakao?.maps) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => resolve());
    };
    script.onerror = reject;

    document.head.appendChild(script);
  });

  return kakaoPromise;
};
