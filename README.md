## Overview

Next.js 프레임워크와 Mantine 컴포넌트 라이브러리를 이용해 제작한 SPA 어플리케이
션입니다. 처음 시작은 집에 손님이 왔을 때 칵테일 레시피를 일일히 찾는데 시간이
많이 소요되어 보기 쉽게 정리를 해서 저장해보자는 생각으로 시작되었습니다. 현재는
재료별로 검색을 하거나 도수 자동 계산 등의 기능과 칵테일 데이터의 CURD를 위한 데
이터베이스 등이 추가되었습니다. 궁극적인 목표는 인터넷 위키와 같이 많은 사용자들
이 공식 칵테일 레시피와 사용자가 직접 만든 칵테일 레시피를 등록하고 추천/비추천
시스템으로 신뢰도를 책정하는 플랫폼을 꿈꾸고 있습니다. 백엔드는 django와 mariaDB
를 사용해 구축했으며, 추후 레시피 등록을 위한 인증/인가 시스템을 구축할 예정입니
다.

## Live link : [https://cocktail-web.vercel.app/](https://cocktail-web.vercel.app/)

## Features

- 칵테일 검색
  - 칵테일 이름, 들어가는 재료 모두 검색 가능
  - DB의 모든 칵테일 재료를 badge 리스트로 보여줌
  - 위 리스트의 선택을 통해 원하는 재료의 조합으로 칵테일 검색 가능
- 오늘의 칵테일 추천
  - 날짜 기반으로 DB의 랜덤한 칵테일 하나 추천
  - 추후 사용자의 검색 데이터를 통해 성향에 맞춰 추천으로 업그레이드 예정
- 칵테일 View
  - 재료의 ml / oz 별 용량 표시 선택 가능
  - 모바일 UI의 접근성을 위해 메인의 추천 칵테일은 mini view가 기본값
  - DB에 베이스 술 별 도수를 저장하고 그에 따른 도수 계산
  - 추후 믹싱방법 가독성 개선 예정
  - 추후 칵테일 맛 설명을 해시태그 기능으로 추가 예정
  - 추후 재료들에 관한 간단한 설명 추가 예정
  - 추후 해당 칵테일에 대한 상식 등 설명 추가 예정

## Tech Used / Dependencies

- Create next-app, Mantine UI를 사용해 제작되었습니다
  - Next.js는 SSR을 익혀보기 위해 채택했는데, 사이트를 제작하다 보니 SSR보다 CSR
    이 사이트와 더 맞다고 생각해 SSR을 걷어내고 CSR로 변경했습니다
  - Mantine UI는 기존에 사용하던 Material-UI 말고도 다양하게 경험해보고 싶은 생
    각에 비교적 최근 만들어진 신생 라이브러리인 Mantine UI를 채택했습니다.
- 코드의 안정성을 위해 typescript를 채택했습니다
- HTTP Requests 클라이언트로 Axios를 선택해 사용했습니다
- Server state 라이브러리로 react-query를 사용했습니다
- Object 클래스의 정적 메서드들에서 타입을 정확하게 사용하기 위해 Object-typed
  라이브러리를 사용했습니다

## Running this propject locally

1. 로컬에 프로젝트를 Clone합니다.
2. `yarn` 명령어로 라이브러리를 설치합니다.
3. `yarn start` 명령어로 개발서버를 실행합니다.

## Build & deploy

- Vercel의 자동 deploy를 사용하고 있습니다.
- master branch에 commit시 실행되는 파이프라인입니다.

## Dev Dependencies

- [Next.js](https://nextjs.org/docs/getting-started)
- [Mantine](https://mantine.dev/)
- [Axios](https://axios-http.com/kr/docs/intro)
- [React-Query](https://tanstack.com/query/v4/docs/overview)
