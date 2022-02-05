# [{3}] {로그인페이지 UI}

## 노션 칸반 링크

​

- [[FE] 로그인 페이지 (Google)](https://www.notion.so/vanillacoding/FE-Google-b9134616141441b186e33813f8f34dc2)
  ​

## 카드에서 구현 혹은 해결하려는 내용

- 구글 Firebase를 이용한 로그인페이지 구현
- ​user database에 저장여부에 따른 라우팅(main page, sign-up page)
- 로그아웃 하지 않은 채 다시 접속했을 때 user의 email을 알기 위해 localstorage에 저장

## 테스트 방법

- axios = POST 메소드와 req.body에 "email"을 전달
- 해당 "email"이 DB에 있다면 메인페이지로 이동하고 localstorage에 email이 저장됨을 확인함
- 해당 "email"이 DB에 없다면 sign-up페이지로 이동함을 확인함

## 기타 사항

- Firebase 구글 로그인을 통해 전달된 user의 email을 req.body로 보내기 위해 컴포넌트 내부 state로 관리하였습니다.
- react query 비동기 Hook을 이용하여 BE 데이터를 가져왔고, 이 과정 중에 구글 로그인이 되고 DB와 검증하는 일련의 과정을 구현하는 부분에서 어려움을 겪었습니다.("enabled" 조건 설정...) 팀원의 도움으로 enabled의 조건을 내부state에서 관리하는 userEmail로 설정했고, 구현 방향대로 라우팅을 할 수 있게 되었습니다.
- useQuery부분 분해할당인자들이 사용되지 않음에도 명시되어 있는데, 삭제하는 것이 좋을까요?
