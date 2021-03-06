# [#5-1] {[FE] 회원가입 프론트엔드 수정}

## 노션 칸반 링크

- [[FE] 회원가입 프론트엔드 수정](https://www.notion.so/vanillacoding/FE-bd6c4005fe5444f794b2b5dfd07d5c16)
  ​

## 카드에서 구현 혹은 해결하려는 내용

- SignUp 컴포넌트를 controlled 컴포넌트로 수정함
- ​인풋 값에 대해서 클라이언트에서 유효성 검사하는 로직 추가 / 변경
- 서버에서 인풋 값에 대해 유효성 검사한 에러 메세지 핸들링 로직 추가
- 회원가입 페이지에 대해 접근을 제한하는 로직 추가
- Error가 발생한 경우 (500) ErrorPage로 이동하여 메시지를 보여줌
- css 변경 사항 추가

## 테스트 방법

- 서버와 연동하여 로그인 / 회원가입 전반적이 부분에 대해서 잘 동작하는지 확인함
- Error가 발생한 경우 Error에 따른 메시지를 잘 렌더링 함

## 기타 사항

- 각 인풋 값에 대한 유효성 검사를 onBlur 속성 사용하여 따로 분리해주었습니다. 따라서 save 버튼을 눌렀을 때, warnMsg가 하나라도 빈 문자열이 아니라면 저장하지 못하게 해주었습니다.
- handleSaveButtonClick 파일 안에 for문을 사용했는데, eslint가 for - in문 사용을 금지해서 그냥 for문을 사용하였고, i++를 사용하기 위해서 eslint 파일에 "no-plusplus": "off" 코드 추가했습니다.
- 인풋 값 state로 관리하였습니다.
