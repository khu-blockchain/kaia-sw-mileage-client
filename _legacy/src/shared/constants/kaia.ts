import {
  createPublicClient,
  createWalletClient,
  custom,
  rpcSchema,
  http,
} from "viem";
import { kairos } from "viem/chains";
import { TransactionForSendRPC } from "caver-js";

type KLAY_REQUEST_METHODS = [
  {
    Method: "klay_signTransaction";
    Parameters: [TransactionForSendRPC];
    ReturnType: any;
  }
];

// Kaia wallet 존재 여부 확인 함수
const isKaiaWalletAvailable = (): boolean => {
  return typeof window !== "undefined" && !!window.klaytn;
};

// Fallback RPC URL (테스트넷)
const KAIROS_RPC_URL = "https://public-en-kairos.node.kaia.io";

const provider = window.klaytn;

// wallet이 없을 때는 HTTP transport 사용
const getTransport = () => {
  if (isKaiaWalletAvailable()) {
    return custom(window.klaytn!);
  }
  return http(KAIROS_RPC_URL);
};

const publicClient = createPublicClient({
  chain: kairos,
  transport: getTransport(),
});

// wallet client는 wallet이 있을 때만 생성
const walletClient = createWalletClient({
      chain: kairos,
      transport: getTransport(),
      rpcSchema: rpcSchema<KLAY_REQUEST_METHODS>(),
    }).extend((client) => ({
      async klaySignTransaction(transaction: TransactionForSendRPC) {
        return client.request({
          method: "klay_signTransaction",
          params: [transaction],
        });
      },
    }))

const kaia = {
  wallet: walletClient,
  public: publicClient,
  browserProvider: provider,
  isWalletAvailable: isKaiaWalletAvailable(),
};

export { kaia, isKaiaWalletAvailable };
