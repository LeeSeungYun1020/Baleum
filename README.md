# Baleum

## 개요

Blockchain Authentication Learning Experience User Management platform

## 기능 요구사항

| 번호  | 이름          | 우선 순위  | 내용                                                                                                                                                                                                                              |
|-----|-------------|--------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1   | 서비스 소개      | 4      | 서비스 내용을 소개한다.                                                                                                                                                                                                                   |
| 2   | 로그인         | 1      | 학습 시스템에 접근하기 위해 로그인이 필요하다. 아이디와 비밀번호를 입력 받아 사용자를 검증한다. 로그인 페이지는 아이디, 비밀번호 입력 상자와 로그인 버튼과 회원가입 버튼을 포함한다. 로그인에 성공하면 내 강의 화면으로 이동한다. 로그인에 실패하면 실패 알림을 표시한다.                                                                        |
| 3   | 로그아웃        | 1      | 로그인한 사용자는 로그아웃하여 외부 사용자로 변환할 수 있다. 로그아웃하면 로그인이 필요한 화면일 경우 홈페이지로 이동하고 그렇지 않은 경우 로그인 화면으로 이동한다.                                                                                                                                   |
| 4   | 회원가입        | 1      | 외부 사용자는 회원가입을 통해 기능 접근 권한을 부여받을 수 있다. 회원가입을 위해 이름, 아이디, 비밀번호, 휴대전화 번호, 이메일을 입력 받는다. 사용자 아이디를 중복 여부를 검증한다. 회원가입 화면은 이름, 아이디, 비밀번호, 비밀번호 확인, 휴대전화 번호, 이메일 입력 상자와 회원가입 버튼으로 구성된다. 회원가입이 완료되면 로그인 화면으로 이동한다.                        |
| 5   | 내 강의 (강의 홈) | 2      | 현재 수강 중인 강의 목록과 수강 완료한 강의 목록, 내가생성한 강의 목록을 표시한다. 강의명, 강의자, 진도율을 표시한다.                                                                                                                                                           |
| 6   | 강의 조회(검색)   | 2      | 검색 상자를 이용하여 강의 과정과 개별 강의를 검색할 수 있다.                                                                                                                                                                                             |
| 7   | 강의 정보(상세)   | 2      | 강의 제목, 강의 요약, 강의 목록을 표시한다. 강의 진도를 블록을 이용하여 상세 표시를 제공한다. 종류(출석, 과제, 시험)에 따라 다른 블록으로 표시하고 날짜를 함께 제공한다. 공지사항의 최신 게시글 목록을 5개까지 표시한다.                                                                                                |
| 8   | 강의 공지사항     | 2      | 강의별로 공지사항 게시글을 구분하여 목록을 출력한다. 게시글은 제목, 내용, 작성자, 작성일자로 구성된다.                                                                                                                                                                     |
| 9   | 강의 수강       | 3      | 측면에 강의 목록을 표시한다. 수강(영상), 과제, 시험 화면을 표시한다. 수강은 수강 필요, 수강 완료 상태가 존재한다. 과제는 제출 필요, 제출 완료, 채점 완료 상태가 존재한다. 과제는 제출 여부와 채점 상황을 표시한다. 시험은 응시 필요, 응시 완료, 채점 완료 상태가 존재한다. 과제와 시험은 채점 완료 상태인 경우 점수를 표시한다. 수강, 과제, 시험 항목마다 상태 변화 시간을 표시한다. |
| 10  | 강의 생성       | 2      | 강의는 강의명, 강의 요약, 강의 목록을 입력하여 추가할 수 있다. 입력한 강의 목록에 따라 강의 영상, 과제, 시험을 추가해야한다. 강의 목록에 있는 추가하기 버튼을 눌러 강의 영상, 과제, 퀴즈 중 하나를 선택한다. 강의 영상인 경우 첨부파일로 영상을 올리고 과제인 경우 과제 제목, 설명, 과제 첨부파일을 추가한다. 퀴즈인 경우 문제를 만들고 보기, 답을 입력한다..                |
| 11  | 수강 인증       | 3      | 수강 완료된 강의 인증서를 발급한다. 강의 과정 트리에 따라 지정 과목을 모두 수강 완료할 경우 과정 수료 인증서를 발급한다.                                                                                                                                                          |

## 실행

### 1. 요구사항

#### API 서버

- Node.js >= 14
- MySQL >= 8.0

#### Web 서버

- Node.js >= 14

### 2. 설치

#### 필요 프로그램

- Node.js
- MySQL Community Server

node module 설치

```text
npm install
```

### 3. 설정

#### 데이터베이스

```mysql
create database baleum;
create database session;
use baluem;

CREATE TABLE user
(
    id     VARCHAR(64) PRIMARY KEY,
    pw     VARCHAR(32)  NOT NULL,
    detail VARCHAR(256) NOT NULL,
    phone  VARCHAR(16)  NOT NULL
);

CREATE TABLE class
(
    id     INT PRIMARY KEY AUTO_INCREMENT,
    name   VARCHAR(128) NOT NULL,
    detail VARCHAR(1024),
    userId VARCHAR(64),
    FOREIGN KEY (userId) REFERENCES user (id)
);

CREATE TABLE takingClass
(
    userId  VARCHAR(64),
    classId INT,
    PRIMARY KEY (userId, classId),
    FOREIGN KEY (userId) REFERENCES user (id),
    FOREIGN KEY (classId) REFERENCES class (id)
);

CREATE TABLE contentType
(
    name VARCHAR(16) PRIMARY KEY
);

CREATE TABLE content
(
    classId   INT,
    contentId INT,
    type      VARCHAR(16)  NOT NULL,
    title     VARCHAR(128) NOT NULL,
    url       VARCHAR(128),
    PRIMARY KEY (classId, contentId),
    FOREIGN KEY (classId) REFERENCES class (id),
    FOREIGN KEY (type) REFERENCES contentType (name)
);

CREATE TABLE question
(
    classId    INT,
    contentId  INT,
    questionId Int,
    title      VARCHAR(128)  NOT NULL,
    answer     VARCHAR(1024) NOT NULL,
    PRIMARY KEY (classId, contentId, questionId),
    FOREIGN KEY (classId, contentId) REFERENCES content (classId, contentId)
);

CREATE TABLE processState
(
    name VARCHAR(32) PRIMARY KEY
);

CREATE TABLE process
(
    classId   INT,
    contentId INT,
    date      DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    state     VARCHAR(32) NOT NULL,
    score     INT         NOT NULL,
    feedback  VARCHAR(1024),
    isSaved   BOOLEAN     NOT NULL DEFAULT FALSE,
    PRIMARY KEY (classId, contentId),
    FOREIGN KEY (state) REFERENCES processState (name)
);

CREATE TABLE notice
(
    id               INT PRIMARY KEY AUTO_INCREMENT,
    classId          INT,
    title            VARCHAR(128)  NOT NULL,
    contents         VARCHAR(1024) NOT NULL,
    userId           VARCHAR(64),
    date             DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modificationDate DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (classId) REFERENCES class (id),
    FOREIGN KEY (userId) REFERENCES user (id)
)
```