const ERROR_MESSAGE = Object.freeze({
  SERVER_UNSTABLE: "서버가 불안정합니다. 잠시 후 다시 시도해주세요.",
  BAD_REQUEST: "유효한 URL이 아닙니다.",
  FORBIDDEN: "해당 페이지에 접근 권한이 없습니다.",
  UNAUTHORIZED: "인증되지 않은 유저입니다.",
});

const RESPONSE_MESSAGE = Object.freeze({
  RELOGIN_REQUIRED: "재로그인이 필요한 유저입니다",
  USER_NOT_EXIST: "해당 유저가 존재하지 않습니다.",
  EXIST_NICKNAME: "해당 닉네임이 존재합니다.",
  SENDING_SUCCESS: "메일 발송 성공",
  ALREADY_IN_SAME_GROUP: "이미 같은 그룹 멤버입니다.",
  ALREADY_INVITED: "이미 초대 메일을 보낸 유저입니다.",
});

export { ERROR_MESSAGE, RESPONSE_MESSAGE };
