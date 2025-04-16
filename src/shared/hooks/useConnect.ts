import { useState, useEffect } from "react";
import { provider } from "@/shared/constants";

const useConnect = () => {
  // Global Level에서의 wallet address 관리
  const [walletAddress, setWalletAddress] = useState<string>("");

  useEffect(() => {
    // 초기 주소 설정
    const currentAddress = provider.selectedAddress;
    if (currentAddress !== "" && currentAddress !== undefined) {
      setWalletAddress(currentAddress);
    }

    // 계정 변경 이벤트 리스너
    const handleAccountsChanged = (accounts: string[]) => {
      console.log("detact connection");
      setWalletAddress(accounts[0]);
    };
    const handleDisconnect = () => {
      // disconnect 이후 다시 지갑 연결시 accountsChanged 이벤트가 호출되지 않음
      // 이 문제를 해결하기 위해 window 강제 새로고침
      window.location.reload();
    };

    // 이벤트 리스너 등록
    provider.on("accountsChanged", handleAccountsChanged);
    provider.on("disconnected", handleDisconnect);

    // 클린업 함수
    return () => {
      provider.removeListener("accountsChanged", handleAccountsChanged);
      provider.removeListener("disconnected", handleDisconnect);
    };
  }, []);

  const onConnect = async (callback?: (address: string[]) => void) => {
    try {
      const accounts = await provider.enable();
      if (callback) {
        callback(accounts);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return { walletAddress, onConnect };
};

export { useConnect };
