import { useState, useEffect } from "react";
import { kaia } from "@/shared/constants";


//TODO: 연결된 지갑 주소와 계정에 등록된 지갑 주소 일치 여부 확인 및 피드백
const useConnect = () => {
  // Global Level에서의 wallet address 관리
  const [walletAddress, setWalletAddress] = useState<string>("");

  const setWalletAddressFromClient = async () => {
    const [address] = await kaia.wallet.getAddresses();
    if (address !== undefined) {
      setWalletAddress(address);
    }
  };

  useEffect(() => {
    // 초기 주소 설정
    setWalletAddressFromClient();
    // 계정 변경 이벤트 리스너
    const handleAccountsChanged = (accounts: string[]) => {
      setWalletAddress(accounts[0]);
    };
    const handleDisconnect = () => {
      // disconnect 이후 다시 지갑 연결시 accountsChanged 이벤트가 호출되지 않음
      // 이 문제를 해결하기 위해 window 강제 새로고침
      window.location.reload();
    };
    // 이벤트 리스너 등록
    kaia.browserProvider.on("accountsChanged", handleAccountsChanged);
    kaia.browserProvider.on("disconnected", handleDisconnect);

    // 클린업 함수
    return () => {
      kaia.browserProvider.removeListener(
        "accountsChanged",
        handleAccountsChanged
      );
      kaia.browserProvider.removeListener("disconnected", handleDisconnect);
    };
  }, []);

  const onConnect = async (callback?: (address: string[]) => void) => {
    try {
      const accounts = await kaia.wallet.requestAddresses();
      console.log(accounts);
      // const accounts = await provider.enable();
      if (callback) {
        callback(accounts);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return { walletAddress, onConnect };
};

export default useConnect;
