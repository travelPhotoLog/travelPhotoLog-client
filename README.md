# OCN - Travel PhotoLog

### `Project description`

<!-- <img src = "https://travelphotolog.s3.ap-northeast-2.amazonaws.com/6.png" width="170" height="200">
<img src = "https://travelphotolog.s3.ap-northeast-2.amazonaws.com/Readme+pic.png" width="170" height="200"> -->

사진으로 특별한 추억을 공유하고 싶은 사람들까라 지도를 공유하여 장소 별로 함께한 시간들을 지도 상에서 한 눈에 알아보기 쉽게 기록해나가는 서비스를 제공하는 웹사이트.

> Portfolio : https://travel-photo-log.com

#

### `📃 Overview`

<img src = "https://travelphotolog.s3.ap-northeast-2.amazonaws.com/picture+page1.png" width="250" height="150">
<img src = "https://travelphotolog.s3.ap-northeast-2.amazonaws.com/board.png" width="250" height="150">  
<img src = "https://travelphotolog.s3.ap-northeast-2.amazonaws.com/editor.png" width="250" height="150">

#

### `🛠 Tech stack`

**FrontEnd**

- React
- Redux-Toolkit
- React-Query
- Firebase authentication + jwt
- Google Maps API (Maps JavaScript API, Geocoding API, Places API)

**BackEnd**

- Node JS
- Express
- MongoDB, Mongoose
- AWS S3 + multer, multer s3

**Testing**

- FrontEnd: cypress, jest
- BackEnd : supertest, jest

**Deployment**

- Netlify
- AWS Elastic Beanstalk

#

### `📌 Main functions`

- 지도

  - 지도 생성 후 공유하고 싶은 사용자에게 이메일 초대 가능
  - 추억을 저장하고 싶은 특정 위치 검색 후, 사진을 포함한 간단한 글 업로드 가능
  - 지도를 공유하고 있는 멤버들끼리 댓글 소통 가능
  - 같은 지도를 공유하는 사용자 간 실시간 지도 변경사항 확인 가능

- 게시판

  - 여행 정보 공유를 위한 게시글 작성
  - 사용자가 지도에 등록한 사진들로만 이미지 첨부가능(AWS S3)
  - 지역, 태그 별 검색 가능

#

### `📋 Work Flow`

- **스크럼 기법 :** 매일 정해진 회의 시간을 통해 팀원 간 작업진행 상태, 이슈발생 여부 등의 상황 공유
- **KANBAN 기법 :** 개발의 연속적인 과정, 순서(Work In Process (WIP))에 따라 하루 분량의 작업 태스크 카드를 우선순위 별로 작성하여  
   `backlog`, `todo(작업자 배정)` , `in progress`, `review`, `closed` 총 5가지 태스크 카드 상태 분류를 통한 워크플로우 시각화
- **Git flow :** KANBAN에 작성된 ID로 각각 브랜치를 만들어 개발 진행
- **코드 스타일 관리 :** ESLint, Prettier, Husky

#

### `🏷 How to use`

**FrontEnd**

- 프로젝트 클론, dependency 설치

  ```(javascript
  git clone https://github.com/travelPhotoLog/travelPhotoLog-client.git
  cd travelPhotoLog-client
  npm install
  ```

- 프로젝트 root 디렉토리에 .env.local파일을 생성한 후, 아래 형식에 맞게 환경변수 값 설정

  ```(javascript)
  REACT_APP_API_KEY=<YOUR FIREBASE API KEY>
  REACT_APP_AUTH_DOMAIN=<YOUR FIREBASE AUTH DOMAIN>
  REACT_APP_PROJECT_ID=<YOUR FIREBASE PROJECT ID>
  REACT_APP_STORAGE_BUCKET=<YOUR FIREBASE STORAGE BUCKET>
  REACT_APP_MESSAGING_SENDER_ID=<>
  REACT_APP_APP_ID=<>
  REACT_APP_GOOGLE_API_KEY=<>
  REACT_APP_SERVER_URI=<>
  ```

**BackEnd**

- 프로젝트 클론, dependency 설치

  ```(javascript
  git clone https://github.com/travelPhotoLog/travelPhotoLog-server.git
  cd travelPhotoLog-server
  npm install
  ```

- 프로젝트 root 디렉토리에 .env파일을 생성한 후, 아래 형식에 맞게 환경변수 값 설정

  ```(javascript)
  S3_KEY_ID=<YOUR S3 KEY ID>
  S3_SECRET_KEY=<YOUR S3 SECRET KEY>
  MONGODB_URL=<YOUR MONGODB URL>
  ACCESS_SECRET_KEY=<YOUR ACCESS SECRET KEY>
  REFRESH_SECRET_KEY=<YOUR REFRESH SECRET KEY>
  INVITATION_SECRET_KEY=<YOUR INVITATION SECRET KEY>
  INVITATION_MAIL=<YOUR INVITATION G-MAIL>
  INVITATION_PASSWORD=<YOUR INVITATION G-MAIL PASSWORD>
  ```

#

### `💡 Our Topics`

- <U>AWS S3 이미지 업로드 방식</U>  
  옵션1 > FrontEnd 사이드에서 이미지 파일을 S3에 업데이트한 후 DB에 저장  
  옵션2 > BackEnd 사이드에서 직접 이미지 파일을 S3에 업데이트 한 후 DB에 저장 <U>**[선택]**</U>

  - 이미지만을 처리하지 않는 경우 (ex - description 등등) 롤백이슈를 고려해봤을 경우, 서버에서 처리해주는 것이 직관적이고 안정적이라 생각
  - 클라이언트는 비교적 보안에 취약 (커스터머에게 노출되는 공간)하기 때문에 데이터/이미지 처리를 서버쪽에서 해주는 것이 적합하다고 생각
  - 이후 가능한 작업: 현재 서버에서 모든 처리를 해주고 있지만, 이미지 서버를 따로 구축 (클라우드 함수)하여 사용되지 않는 이미지는 추후 삭제함으로 롤백 전략을 취할 수 있음

- <U>실시간 통신 방식</U>  
  옵션1 > [socket.io](http://socket.io)<U>**[선택]**</U>  
  옵션2 > polling

  - 회원가입 시 로그인 확인과 같은 기능에 polling이 자주 사용됨
  - 하지만 우리 서비스의 경우 정확한 통신 시간이 정해지지 않아서 낭비가 심할 것으로 예상되므로 socket이 적합하다고 판단

- <U>로그인/자동로그인 로직</U>  
  자동로그인과 안정적인 구현을 위해 Refresh token, Access token을 사용하기로 결정  
  token 저장 위치 : DB에 refresh token을 저장, cookie에 access token과 refresh token 둘다 저장  
  로컬스토리지도 고려해 보았으나 개인적인 유저정보를 저장하기에 보안상 취약 (토큰 탈취, 조작)하고, 만료된 토큰의 경우 별다른 요청이 없다면 UI는 유저가 로그인 되어 있다고 생각되는 문제가 있음

- <U>게시글 작성 에디터</U>
  프로젝트 기회취지(여행사진 저장, 유저간 공유)에 맞게 로컬 이미지만을 업로드 하지 않고, 지도에 업로드한 사진을 게시글 작성에 사용하고자 함  
  이미지핸들링 커스터마이즈가 중요한 요인이었고, 이 기능이 가능한 에디터 quill을 사용하기로 판단  
  의논1 > quill 에디터를 사용하며 문자열로 출력되는 html을 content로 보관하게 되는데, 보안상 조심해야하는 부분이 있고 아래와 같은 태그들이 에디터에서 실행되지 않도록 서버에서 막아주는 추가 작업 진행

  ```jsx
  <script>console.log(document.cookie)</script>
  ```

  의논2 > 게시판에 등록된 사진이 지워지게 되면 x박스나 default 이미지가 보여지게 되는데, 사용자의 경험을 고려했을 때 적합하지 않다는 의견도 있었지만,  
  사진게시자가 삭제한다는 것은 더이상 사진을 공유하지 않다는 의미이며 또한 추억을 위치별로 공유한다는 저희 서비스 기획의도를 생각했을 때 기존방식을 고수하기로 결정함

- <U>페이지네이션 구현 방법</U>  
  mongoDB에서 페이지네이션 작업 시 sorting해주는 작업이 다소 무거울 것이라는 우려로 인해 서버에서 자체 로직을 구현하였으나(관련된 모든 데이터를 불러와 sorting 하지 않고, 페이지 번호와 포스팅 갯수를 활용해 뒤에서부터 자르는 방식 ) 데이터베이스에서 할 일을 서버에서 하게 되어 서버에 부담이 된다고 판단함. 데이터베이스에 시킬 수 있는 일을 서버에서 하고 있으니 메모리 차원에서 낭비가 된다고 판단하여 mongoose 에서 자체적으로 제공하는 skip limit 활용하기로 함.

- <U>React Query 비동기처리</U>

  **사용동기: 서버와의 비동기 통신, 그리고 서버 측으로 부터 넘겨받는 상태 관리 부분을 캐싱으로 전담해서 관리할 수 있도록 디자인 된 React Query를 사용해 관심사의 분리를 시도해보고 싶어서 사용 결정**  
  그러나 CRUD 에서 Create, Update, Delete가 주가 되는 서비스에서는 React Query를 사용해 캐싱한 데이터를 활용하는데 어려움이 많다고 느꼈음 (Read가 주가되는 서비스라면 메리트가 있다고 생각). post 같은 메서드를 사용할 경우 클라이언트에서 응답으로 받는 결과 값은 일반적인데 ({reslut: “ok”}), 이런 경우 캐싱할 필요가 없는 데이터를 캐싱한다고 느낌. 캐싱이 필요한 데이터를 위한 비동기 통신에 react query 를 사용하는 것이 바람직하다고 생각했으나, 코드의 일관성을 위해 따로 캐싱할 필요가 없는 비동기 통신에서도 react query를 사용한 점에서 아쉬움이 남았음. 또한 비교적 문서화가 잘 되어 있지 않고 자료가 많지 않은 기술스택을 선정한데서 오는 어려움도 많이 있었음.

#

### `📝 Our Reviews`

#### `영진`

#### `성훈`

#### `서영`
