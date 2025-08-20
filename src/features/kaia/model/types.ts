import type { Abi, Address } from "@kaiachain/viem-ext";

import { TxType } from "@kaiachain/viem-ext";

type ABI = Abi;

const KaiaTxType = TxType;
const KAIROS_NETWORK_ID = 1001;

const ZERO_ADDRESS: Address = "0x0000000000000000000000000000000000000000";

export type { ABI };
export { KaiaTxType, KAIROS_NETWORK_ID, ZERO_ADDRESS };
