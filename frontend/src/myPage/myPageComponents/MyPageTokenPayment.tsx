import { useEffect, useState } from "react";
import api from "../../api/api";
import { useAuth } from "../../hooks/useAuth";

declare global {
  interface Window {
    IMP: any;
  }
}

const tokenProducts = [
  { tokens: 10, price: 1000, color: "#7CAEF2" },
  { tokens: 30, price: 2900, color: "#66D294" },
  { tokens: 50, price: 4800, color: "#FFB358" },
];

const MyPageTokenPayment = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  /** 🔑 PortOne IMP 코드 */
  const IMP_KEY = import.meta.env.VITE_PORTONE_IMP_KEY;

  /** 결제수단 */
  const [payMethod, setPayMethod] = useState<"card" | "kakaopay">("card");

  /** IMP 초기화 */
  useEffect(() => {
    if (!window.IMP) {
      console.error("❌ window.IMP 로드 실패");
      return;
    }
    if (!IMP_KEY) {
      console.error("❌ VITE_PORTONE_IMP_KEY 없음");
      return;
    }

    console.log("🔑 IMP.init:", IMP_KEY);
    window.IMP.init(IMP_KEY);
  }, [IMP_KEY]);

  /** 결제 요청 */
  const requestPayment = async (price: number, tokenAmount: number) => {
    if (!user) return alert("로그인 후 이용해주세요.");
    if (loading) return;

    setLoading(true);

    try {
      const orderId = `order_${Date.now()}`;
      const { IMP } = window;

      /** 🔥 핵심 수정 1: 카카오페이 pg에 MID 명시 */
      const pg =
        payMethod === "kakaopay"
          ? "kakaopay.TCSUBSCRIP"
          : "html5_inicis";

      console.log("📡 결제 요청:", {
        pg,
        amount: price,
        buyer: user.email,
        tokenAmount,
      });

      IMP.request_pay(
        {
          pg,
          pay_method: payMethod === "card" ? "card" : undefined,
          merchant_uid: orderId,
          name: `토큰 ${tokenAmount}개`,
          amount: price,
          buyer_email: user.email,
          buyer_name: user.name,
        },
        async (rsp: any) => {
          if (rsp.success) {
            console.log("✔ 결제 성공:", rsp);

            try {
              /** 🔥 핵심 수정 2: verify API 경로 */
              const verifyRes = await api.post("/api/payment/verify", {
                impUid: rsp.imp_uid,
                merchantUid: rsp.merchant_uid,
                amount: rsp.paid_amount,
                tokenAmount,
              });

              console.log("✔ 서버 검증 완료:", verifyRes.data);
              alert("결제가 정상적으로 완료되었습니다!");
              window.location.reload();
            } catch (err) {
              console.error("❌ 서버 검증 실패:", err);
              alert("결제 검증 실패. 관리자에게 문의해주세요.");
            }
          } else {
            console.warn("❌ 결제 실패:", rsp);
            alert("결제가 취소되었거나 실패했습니다.");
          }

          setLoading(false);
        }
      );
    } catch (err) {
      console.error("❌ 결제 요청 오류:", err);
      alert("결제 요청 중 문제가 발생했습니다.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">토큰 결제</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tokenProducts.map((item) => (
          <div key={item.tokens} className="p-6 border rounded-xl">
            <div style={{ color: item.color }} className="font-bold mb-2">
              ● {item.tokens} Tokens
            </div>
            <div className="text-2xl font-extrabold mb-4">
              {item.price.toLocaleString()}원
            </div>
            <button
              disabled={loading}
              onClick={() => requestPayment(item.price, item.tokens)}
              className="w-full py-3 bg-blue-600 text-white rounded-xl"
            >
              {loading ? "처리중..." : "구매하기"}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h3 className="font-bold mb-4">결제 수단 선택</h3>
        <div className="flex gap-4">
          <button onClick={() => setPayMethod("card")}>💳 카드</button>
          <button onClick={() => setPayMethod("kakaopay")}>🟡 카카오페이</button>
        </div>
      </div>
    </div>
  );
};

export default MyPageTokenPayment;
