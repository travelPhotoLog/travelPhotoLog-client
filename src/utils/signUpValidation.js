export const validateContact = (event, warnMsgs, setWarnMsgs) => {
  const { name, value } = event.target;

  if (value.length) {
    if (!value.includes("-")) {
      setWarnMsgs({
        ...warnMsgs,
        [name]: "전화번호는 '-'를 포함하여 입력해주세요.",
      });

      return;
    }

    const [frontNumber, middleNumber, backNumber] = value.split("-");

    if (
      frontNumber?.length !== 3 ||
      middleNumber?.length !== 4 ||
      backNumber?.length !== 4
    ) {
      setWarnMsgs({
        ...warnMsgs,
        [name]: "휴대폰 번호의 형식에 맞게 입력해주세요.",
      });

      return;
    }
  }

  setWarnMsgs({
    ...warnMsgs,
    [name]: "",
  });
};

export const validateBirthday = (event, warnMsgs, setWarnMsgs) => {
  const { name, value } = event.target;

  if (new Date(value) > new Date()) {
    setWarnMsgs({
      ...warnMsgs,
      [name]: "생일은 현재 날짜보다 이전 날짜여야 합니다.",
    });

    return;
  }

  setWarnMsgs({
    ...warnMsgs,
    [name]: "",
  });
};
