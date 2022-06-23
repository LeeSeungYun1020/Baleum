# Baleum

## 개요

QR코드로 수강한 교육 과정을 한 번에 증명할 수 있는 블록체인 기반 학습 인증 서비스

![poster](./report/final/poster.png)

## 주요 기능

- 강의 수강
- 강의 생성
- 블록체인을 통한 학습 진행 과정 저장
- 블록체인을 통한 수업 수료 인증
- QR코드로 수료 확인

## 시스템 구조

### 웹

- 메인
- 로그인/회원가입
- 강의 검색
- 강의 정보
- 강의 수강
- 강의 공지사항
- 마이페이지(수강 중, 수강 완료, 생성 강의)
- 강의 생성
- 강의 인증서(개별 강의, 전체 강의)

### 서버

- API description: API 설명
- Input: 초기 테이블 생성, 데이터 자동 입력
- User: 사용자 로그인, 회원강비, 로그아웃
- Class: 강의 관련 작업 처리
- Contract: 블록체인 네트워크와 상호작용

### 블록체인

- 학습 과정 저장하는 Learn 컨트랙트
- 수료한 강의 저장하는 Course 컨트랙트

## 실행

### 1. 요구사항

#### API 서버

- Node.js 14
- MySQL 8

#### Web 서버

- Node.js 14
- React.js 17
- Next.js 12

### 2. 설치

#### 필요 프로그램

- Node.js
- MySQL Community Server

#### node module 설치

```text
npm install
```

#### 시작

```text
npm start
```

### 3. 설정

```mysql
create database baleum;
create database session;
```
이후 API server(port: 3000)에 접속하시어 `테이블 생성` 버튼을 누르시면 자동으로 데이터베이스 설정을 완료합니다.  
데이터 입력이 필요할 경우 `데이터 입력` 버튼을 눌러 가상 데이터를 추가할 수 있습니다.  
사용 중 오류가 발생하였을 경우 `테이블 강제 생성` 버튼을 눌러 전체 테이블을 삭제하고 다시 생성해 보십시오.  
데이터베이스에 저장된 데이터는 모두 삭제됩니다.

## 보고서

[최종보고서](report/final/2021후기 최종보고서_08_PLMS_이더리움 기반 학습 인증 서비스 개발.pdf)
