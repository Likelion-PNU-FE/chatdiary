아래 후술할 사항은 제생각이니 다른의견있으시면 편하게 제안하셔도 좋습니다.

## 파일구조
- assets : 이미지나 svg font등의 파일
- components : 컴포넌트들을 모아놓은 폴더
- pages : 페이지들을 모아놓은 폴더
- styles : 전역적으로 사용되는 스타일을 모아놓은 폴더
- api : api 요청을 모아놓은 폴더
- utils : 유틸리티 함수들을 모아놓은 폴더
- hook : 커스텀 훅을 모아놓은 폴더

+ 필요하시면 추가...

### App.js
- 라우팅설정하거나 전역적으로 필요한(전역상태관리 컴포넌트등..)만 간단하게 선언하는걸루
```jsx
function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
```
이런식으로다가~

추가로 정할 부분이 있다고 생각하시는 분은 말씀해주세요.