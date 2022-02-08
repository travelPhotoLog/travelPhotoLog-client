# [{7}] {[FE] My travels 메인페이지}

## 노션 칸반 링크

​

- [[FE] My Travels 메인페이지](https://www.notion.so/vanillacoding/FE-My-travels-ff0f22b1445e400a96f78d7695246e72)
  ​

## 카드에서 구현 혹은 해결하려는 내용

- 서버에 해당 user(로그인 되어 있는)의 mapId와 mapTitle정보를 받아옴
- ​받아온 map데이터를 버튼으로 렌더링해줌
- map이름이 적혀있는 버튼을 클릭하면, 해당 맵 detail 페이지로 이동
- 마지막 부분에 + 버튼을 클릭하면 새로운 맵 생성 페이지로 이동
- Error가 발생한 경우 (404, 500) ErrorPage로 이동하여 메시지를 보여줌

## 테스트 방법

- axios = GET 메소드로 mapID, mapTitle 정보를 받아옴
- 성공적으로 데이터를 받아온 경우 버튼이 잘 보여지고 버튼 클릭시 원하는 url로 이동함
- Error가 발생한 경우 Error에 따른 메시지를 잘 렌더링 함

## 기타 사항

- 서버 500 에러의 경우도 FE사이드에서 처리해주었는데요, 이렇게 된다면 그동안 FE 작업도 업데이트를 해줘야 할 것 같습니다! 같이 논의해보아요
- components 파일을 관심사별로 분리했습니다
