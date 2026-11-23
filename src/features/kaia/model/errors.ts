const WRONG_NETWORK_MESSAGE =
	"Kaia Wallet이 Kairos 테스트넷에 연결되어 있지 않습니다. 네트워크를 전환한 뒤 다시 시도해주세요.";

// 학생 화면에서 호출하는 StudentManager 함수의 revert 사유 (현재 배포본은 문자열 revert 사용).
// "target address ..."가 "address ..."를 포함하므로 순서를 유지해야 한다.
const REVERT_MESSAGES: ReadonlyArray<readonly [string, string]> = [
	[
		"student ID already registered",
		"이미 가입된 학번입니다. 로그인하거나 관리자에게 문의해주세요.",
	],
	[
		"target address already registered",
		"변경하려는 지갑은 이미 다른 학번에 연결되어 있습니다.",
	],
	[
		"address already registered",
		"이미 가입에 사용된 지갑입니다. 다른 지갑을 연결해주세요.",
	],
	[
		"unregistered address",
		"연결된 지갑이 가입된 지갑이 아닙니다. 가입한 지갑을 연결해주세요.",
	],
	[
		"unauthorized student ID",
		"더 이상 이 학번에 연결된 지갑이 아닙니다. 현재 등록된 지갑을 연결해주세요.",
	],
	["no pending account change", "진행 중인 지갑 변경 요청이 없습니다."],
	[
		"confirmation must be from target",
		"변경할 지갑을 연결한 뒤 다시 시도해주세요.",
	],
];

class KaiaTransactionError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "KaiaTransactionError";
	}
}

const getErrorText = (error: unknown) =>
	error instanceof Error ? error.message : String(error);

const toEstimateGasError = (error: unknown) => {
	const text = getErrorText(error);
	if (!/execution reverted/i.test(text)) {
		return new KaiaTransactionError(
			"Kaia 네트워크에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.",
		);
	}
	const matched = REVERT_MESSAGES.find(([reason]) => text.includes(reason));
	return new KaiaTransactionError(
		matched?.[1] ??
			"블록체인에서 요청이 거부되었습니다. 입력 내용을 확인해주세요.",
	);
};

const getKaiaErrorMessage = (error: unknown, fallback: string) => {
	if (error instanceof KaiaTransactionError) {
		return error.message;
	}
	const text = getErrorText(error);
	if (/user denied|user rejected/i.test(text)) {
		return "지갑 서명이 취소되었습니다.";
	}
	if (/does not match current network/i.test(text)) {
		return WRONG_NETWORK_MESSAGE;
	}
	return fallback;
};

export {
	KaiaTransactionError,
	WRONG_NETWORK_MESSAGE,
	getKaiaErrorMessage,
	toEstimateGasError,
};
