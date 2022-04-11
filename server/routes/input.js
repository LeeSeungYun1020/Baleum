const express = require('express')
const router = express.Router()
const connection = require('../lib/mysql')
const fs = require('fs')
const path = require('path');

router.get('/table', (req, res) => {
    connection.query(`
        CREATE TABLE user
        (
            id     VARCHAR(64) PRIMARY KEY,
            pw     VARCHAR(32)  NOT NULL,
            name   VARCHAR(32)  NOT NULL,
            detail VARCHAR(256) NOT NULL,
            phone  VARCHAR(16)  NOT NULL
        );

        CREATE TABLE classCategory
        (
            name VARCHAR(32) PRIMARY KEY
        );

        CREATE TABLE class
        (
            id       INT PRIMARY KEY AUTO_INCREMENT,
            name     VARCHAR(128) NOT NULL,
            detail   VARCHAR(1024),
            userId   VARCHAR(64)  NOT NULL,
            category VARCHAR(32)  NOT NULL,
            image    MEDIUMTEXT,
            FOREIGN KEY (userId) REFERENCES user (id),
            FOREIGN KEY (category) REFERENCES classCategory (name)
        );

        CREATE TABLE takingClass
        (
            userId          VARCHAR(64),
            classId         INT,
            completedDate   DATETIME,
            isCompleted     BOOLEAN DEFAULT FALSE,
            isSaved         BOOLEAN DEFAULT FALSE,
            blockHash       VARCHAR(66),
            transactionHash VARCHAR(66),
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
            questionId INT,
            title      VARCHAR(128)  NOT NULL,
            answer     VARCHAR(1024) NOT NULL,
            PRIMARY KEY (classId, contentId, questionId),
            FOREIGN KEY (classId, contentId) REFERENCES content (classId, contentId)
        );

        CREATE TABLE test
        (
            classId    INT,
            contentId  INT,
            questionId INT,
            userId     VARCHAR(64),
            answer     VARCHAR(1024) NOT NULL,
            PRIMARY KEY (classId, contentId, questionId, userId),
            FOREIGN KEY (classId, contentId, questionId) REFERENCES question (classId, contentId, questionId)
        );

        CREATE TABLE processState
        (
            name VARCHAR(32) PRIMARY KEY
        );

        CREATE TABLE process
        (
            classId         INT,
            contentId       INT,
            userId          VARCHAR(64),
            date            DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            state           VARCHAR(32) NOT NULL,
            score           INT         NOT NULL,
            feedback        VARCHAR(1024),
            isSaved         BOOLEAN     NOT NULL DEFAULT FALSE,
            blockHash       VARCHAR(66),
            transactionHash VARCHAR(66),
            PRIMARY KEY (classId, contentId, userId),
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
        );
    `, (err, result) => {
        if (err) {
            req.session.dbError = err.sqlMessage
        }
        if (req.session.command == undefined) req.session.command = "Table"
        res.redirect('/')
    })
});

router.get('/table/force', (req, res) => {
    connection.query(`
        DROP TABLE IF EXISTS notice;
        DROP TABLE IF EXISTS process;
        DROP TABLE IF EXISTS processState;
        DROP TABLE IF EXISTS test;
        DROP TABLE IF EXISTS question;
        DROP TABLE IF EXISTS content;
        DROP TABLE IF EXISTS contentType;
        DROP TABLE IF EXISTS takingClass;
        DROP TABLE IF EXISTS class;
        DROP TABLE IF EXISTS classCategory;
        DROP TABLE IF EXISTS user;
    `, (err, result) => {
        req.session.command = "Table-Force"
        if (err) {
            req.session.dbError = err.sqlMessage
            res.redirect('/')
        } else {
            res.redirect('/input/table')
        }
    })
})


router.get('/data', (req, res) => {
    connection.query(`
        DELETE
        FROM notice;
        DELETE
        FROM process;
        DELETE
        FROM processState;
        DELETE
        FROM test;
        DELETE
        FROM question;
        DELETE
        FROM content;
        DELETE
        FROM contentType;
        DELETE
        FROM takingClass;
        DELETE
        FROM class;
        DELETE
        FROM classCategory;
        DELETE
        FROM user;

        INSERT INTO user (id, pw, name, detail, phone)
        VALUES ('fabi88@naver.com', 'lsy1020', '이승윤', '일상의 고민을 해결하는 개발자 이승윤입니다.', '010-1111-2221');
        INSERT INTO user (id, pw, name, detail, phone)
        VALUES ('kym5957@naver.com', 'lsy1020', '김유미', '심심할때 오세요 개발자에게 큰 도움이 되는 김유미', '010-2222-2222');
        INSERT INTO user (id, pw, name, detail, phone)
        VALUES ('jysim0129@naver.com', 'lsy1020', '심재영', '다 잘하는 법, 심 재 영', '010-3333-2223');
        INSERT INTO user (id, pw, name, detail, phone)
        VALUES ('lsw4122@naver.com', 'lsy1020', '이상원', '게임에 관심이 많은 사람', '010-4444-2224');
        INSERT INTO user (id, pw, name, detail, phone)
        VALUES ('ileilliat@gmail.com', 'lsy1020', '이윤승', '묵묵히 걸어가다보면 마주할 찬란한 빛', '010-5555-2225');
        INSERT INTO user (id, pw, name, detail, phone)
        VALUES ('leeseungyun1020@gmail.com', 'lsy1020', '윤승이', '배우고자 하는 열정', '010-6666-2226');
        INSERT INTO user (id, pw, name, detail, phone)
        VALUES ('history@gmail.com', 'lsy1020', '이삼동', '역사에 관심이 많은 삼동이', '010-7777-2227');
        INSERT INTO user (id, pw, name, detail, phone)
        VALUES ('mathloverhs@kakao.com', 'lsy1020', '이학수', '수학은 학수', '010-8888-2228');
        INSERT INTO user (id, pw, name, detail, phone)
        VALUES ('plantviver@gmail.com', 'lsy1020', '이샛별', '리드 디자이너 이샛별', '010-9999-2229');
        INSERT INTO user (id, pw, name, detail, phone)
        VALUES ('kjn0099@naver.com', 'lsy1020', '김지나', '고달픈 배움의 길', '010-0000-2220');
        INSERT INTO user (id, pw, name, detail, phone)
        VALUES ('shchoi@gmail.com', 'lsy1020', '최수환', '다양한 툴 스케치업으로 끝냅니다.', '010-0100-1111');
        INSERT INTO user (id, pw, name, detail, phone)
        VALUES ('yoonbasic@naver.com', 'lsy1020', '윤지현', '기초가 탄탄하면 심화는 어려울 수가 없습니다.', '010-0100-2222');
        INSERT INTO user (id, pw, name, detail, phone)
        VALUES ('yejin0233@gmail.com', 'lsy1020', '장예진', '한 걸음 한 걸음', '010-0200-3333');
        INSERT INTO user (id, pw, name, detail, phone)
        VALUES ('khpark@gmail.com', 'lsy1020', '박건호', '힘들다.txt', '010-0200-4444');
        INSERT INTO user (id, pw, name, detail, phone)
        VALUES ('iammuungjin@kakao.com', 'lsy1020', '김명진', '명제를 알면 진실로 다가선다', '010-0300-5555');
        INSERT INTO user (id, pw, name, detail, phone)
        VALUES ('korock@naver.com', 'lsy1020', '윤석환', '숨어있는 재미있는 말을 찾아 쓰기', '010-0300-6666');
        INSERT INTO user (id, pw, name, detail, phone)
        VALUES ('jihoooo@naver.com', 'lsy1020', '최지후', '진짜 글씨를 찾아 떠나는 여행', '010-0400-7777');
        INSERT INTO user (id, pw, name, detail, phone)
        VALUES ('vjinsuv@gmail.com', 'lsy1020', '이진수', '진수야 학교 가자', '010-0400-8888');
        INSERT INTO user (id, pw, name, detail, phone)
        VALUES ('ddonghuck@naver.com', 'lsy1020', '박동혁', '멀고도 먼 배움의 길', '010-0050-9999');
        INSERT INTO user (id, pw, name, detail, phone)
        VALUES ('strongkh@gmail.com', 'lsy1020', '김강한', '진짜 이야기를 전합니다.', '010-0050-0000');

        INSERT INTO classCategory (name)
        VALUES ('컴퓨터 과학');
        INSERT INTO classCategory (name)
        VALUES ('프로그래밍');
        INSERT INTO classCategory (name)
        VALUES ('글쓰기');
        INSERT INTO classCategory (name)
        VALUES ('디자인');
        INSERT INTO classCategory (name)
        VALUES ('투자');

        INSERT INTO class (id, name, detail, userId, category, image)
        VALUES (1, '개념어로 배우는 운영체제', '운영체제의 기본적인 내용을 이해하고 있다고 가정하고 주요 용어에 대해 자세히 설명합니다.', 'fabi88@naver.com', '컴퓨터 과학',
                '${fs.readFileSync(path.join(__dirname, '../public/images/01.jpg'), 'base64')}');
        INSERT INTO class (id, name, detail, userId, category, image)
        VALUES (2, 'Front A to Z', 'React 전문가인 김유미가 기초부터 심화까지 하나하나 짚어주는 명품 프론트 강의', 'kym5957@naver.com', '컴퓨터 과학',
                '${fs.readFileSync(path.join(__dirname, '../public/images/02.jpg'), 'base64')}');
        INSERT INTO class (id, name, detail, userId, category, image)
        VALUES (3, '나도 작가다', '인생을 뒤바꾼 나만의 이야기 적는 법, 살을 파고드는 아픔을 노래하고 입이 귀에 걸리는 기쁨을 읊조리는 법을 배울 수 있다.',
                'jysim0129@naver.com', '글쓰기',
                '${fs.readFileSync(path.join(__dirname, '../public/images/03.jpg'), 'base64')}');
        INSERT INTO class (id, name, detail, userId, category, image)
        VALUES (4, '프로젝트로 배우는 안드로이드 앱 제작',
                '직접 만들면서 배우는 것만큼 쉽게 배울 수 있는 방법은 없습니다. 할 일 목록을 작성할 수 있는 CRUD가 가능한 간단하 어플리케이션을 함께 만들어 봅니다.',
                'fabi88@naver.com', '프로그래밍',
                '${fs.readFileSync(path.join(__dirname, '../public/images/04.jpg'), 'base64')}');
        INSERT INTO class (id, name, detail, userId, category, image)
        VALUES (5, '삐릿삐릿 네트워크', '네트워크 관련 개념을 삐릿빠릿하게 파악할 수 있는 강의입니다.', 'leeseungyun1020@gmail.com', '컴퓨터 과학',
                '${fs.readFileSync(path.join(__dirname, '../public/images/05.jpg'), 'base64')}');
        INSERT INTO class (id, name, detail, userId, category, image)
        VALUES (6, '무조건 오르는 부동산', '1억으로 시작하는 서울 시내 꼬마 빌딩 투자, 결국 집 값은 우상향, 살 수 있을 때 사야', 'mathloverhs@kakao.com', '투자',
                '${fs.readFileSync(path.join(__dirname, '../public/images/06.jpg'), 'base64')}');
        INSERT INTO class (id, name, detail, userId, category, image)
        VALUES (7, 'UI 디자인의 정석', '디자이너가 아니어도 쉽고 재미있게 유명 SNS 기업 리드 디자이너가 정석을 알려드립니다.', 'plantviver@gmail.com', '디자인',
                '${fs.readFileSync(path.join(__dirname, '../public/images/07.jpg'), 'base64')}');
        INSERT INTO class (id, name, detail, userId, category, image)
        VALUES (8, '두 번으로 끝내는 UI/UX 디자인',
                '이론과 실무 프로세스를 통한 UX 디자인, 스케치, 어도비 등 클론디자인 학습을 진행합니다. 죽은 포트폴리오도 살려낼 수 있는 두 번으로 끝내는 UI, UX 많은 수강 바랍니다.',
                'shchoi@gmail.com', '디자인',
                '${fs.readFileSync(path.join(__dirname, '../public/images/08.jpg'), 'base64')}');
        INSERT INTO class (id, name, detail, userId, category, image)
        VALUES (9, '쉽게 즐기는 JAVA 프로그래밍', '프로그래밍 언어가 낯설게만 느껴졌다고요? 자바로 프로그래밍을 시작하려는 당신을 위한 자바 기초 강의. 지금 시작합니다.',
                'kym5957@naver.com', '프로그래밍',
                '${fs.readFileSync(path.join(__dirname, '../public/images/09.jpg'), 'base64')}');
        INSERT INTO class (id, name, detail, userId, category, image)
        VALUES (10, '논리적인 UX 디자인',
                '데이터가 낯선 디자이너를 위한 유일한 데이터 기반 UX 디자인 강의. 왜 특정 제품을 선호하는지 이해하고 어떻게 하면 그들이 좋아하는 성공적인 제품을 디자인할 수 있을지에 대한 해답을 찾습니다.',
                'yoonbasic@naver.com', '디자인',
                '${fs.readFileSync(path.join(__dirname, '../public/images/10.jpg'), 'base64')}');
        INSERT INTO class (id, name, detail, userId, category, image)
        VALUES (11, '생각을 전하는 진실된 손', '설득의 무기는 손이다? 합리적이고 성공 가능성이 높은 의사결정을 위한 빠른 글쓰기, 설득의 힘을 믿습니다.',
                'strongkh@gmail.com',
                '글쓰기', '${fs.readFileSync(path.join(__dirname, '../public/images/11.jpg'), 'base64')}');
        INSERT INTO class (id, name, detail, userId, category, image)
        VALUES (12, '알고리즘 인터뷰 부수기',
                '알고리즘 테스트 열풍에 이어 알고리즘 인터뷰 열풍? 라이브 코딩은 어떻게 준비해야할까? 실제 작동되는 코드보다 개념 설명이 더 중요하다? 강의를 통해 함께 알아나갑시다.',
                'kjn0099@naver.com', '컴퓨터 과학',
                '${fs.readFileSync(path.join(__dirname, '../public/images/12.jpg'), 'base64')}');
        INSERT INTO class (id, name, detail, userId, category, image)
        VALUES (13, '개발자 언어를 사용자 표현으로 번역하다.', '기술 문서가 어려운 프로그래머, 엔지니어를 위한 메뉴얼, 테크니컬 WRITING',
                'jihoooo@naver.com', '글쓰기',
                '${fs.readFileSync(path.join(__dirname, '../public/images/13.jpg'), 'base64')}');
        INSERT INTO class (id, name, detail, userId, category, image)
        VALUES (14, '도대체 인공지능이 뭔데?',
                '제4차 산업 혁명 시대의 주요기술, 인공지능 이해하기',
                'yejin0233@gmail.com', '컴퓨터 과학',
                '${fs.readFileSync(path.join(__dirname, '../public/images/14.jpg'), 'base64')}');
        INSERT INTO class (id, name, detail, userId, category, image)
        VALUES (15, 'iOS 개발을 위한 Swift 완벽 가이드',
                '프로젝트 실습을 통해 Swift 코딩 배워보기',
                'lsw4122@naver.com', '프로그래밍',
                '${fs.readFileSync(path.join(__dirname, '../public/images/15.jpg'), 'base64')}');
        INSERT INTO class (id, name, detail, userId, category, image)
        VALUES (16, '당신이 잠든 사이, 알아서 축적되는 부',
                '파이썬을 활용한 비트코인 자동매매 프로그램 만들기',
                'yejin0233@gmail.com', '프로그래밍',
                '${fs.readFileSync(path.join(__dirname, '../public/images/16.jpg'), 'base64')}');

        INSERT INTO takingClass (userId, classId)
        VALUES ('ileilliat@gmail.com', '1');
        INSERT INTO takingClass (userId, classId)
        VALUES ('ileilliat@gmail.com', '2');
        INSERT INTO takingClass (userId, classId)
        VALUES ('ileilliat@gmail.com', '4');
        INSERT INTO takingClass (userId, classId)
        VALUES ('ileilliat@gmail.com', '7');

        INSERT INTO notice (classId, title, contents, userId)
        VALUES (1, '운영체제 강의 안내', '운영체제 강의에 오신 것을 환영합니다.
우리 강의는 운영체제 기본 개념을 알고 있다고 가정하고 중요 개념에 대해 짚고 넘어가는 강의입니다.
이 점 유의하시고 강의 수강하시길 바랍니다.', 'fabi88@naver.com');

        INSERT INTO contentType (name)
        VALUES ('영상');
        INSERT INTO contentType (name)
        VALUES ('과제');
        INSERT INTO contentType (name)
        VALUES ('시험');

        INSERT INTO content (classId, contentId, type, title, url)
        VALUES (1, 1, '영상', '운영체제 강의 소개', 'https://www.youtube.com/watch?v=wvQm3qf3CEo');
        INSERT INTO content (classId, contentId, type, title, url)
        VALUES (1, 2, '시험', '첫번째 퀴즈', 'https://www.youtube.com/watch?v=wvQm3qf3CEo');
        INSERT INTO content (classId, contentId, type, title, url)
        VALUES (1, 3, '영상', '가상화', 'https://www.youtube.com/watch?v=wvQm3qf3CEo');
        INSERT INTO content (classId, contentId, type, title, url)
        VALUES (1, 4, '영상', '클라우드 컴퓨팅', 'https://www.youtube.com/watch?v=wvQm3qf3CEo');
        INSERT INTO content (classId, contentId, type, title, url)
        VALUES (1, 5, '영상', '운영체제 서비스', 'https://www.youtube.com/watch?v=wvQm3qf3CEo');
        INSERT INTO content (classId, contentId, type, title, url)
        VALUES (1, 6, '영상', 'CLI', 'https://www.youtube.com/watch?v=wvQm3qf3CEo');
        INSERT INTO content (classId, contentId, type, title, url)
        VALUES (1, 7, '영상', '마이크로커널 시스템', 'https://www.youtube.com/watch?v=wvQm3qf3CEo');
        INSERT INTO content (classId, contentId, type, title, url)
        VALUES (1, 8, '영상', '프로세스와 스레드', 'https://www.youtube.com/watch?v=wvQm3qf3CEo');
        INSERT INTO content (classId, contentId, type, title, url)
        VALUES (1, 9, '영상', '프로세스 상태', 'https://www.youtube.com/watch?v=wvQm3qf3CEo');
        INSERT INTO content (classId, contentId, type, title, url)
        VALUES (1, 10, '영상', '스케줄러', 'https://www.youtube.com/watch?v=wvQm3qf3CEo');

        INSERT INTO question (classId, contentId, questionId, title, answer)
        VALUES (1, 2, 1, '1번 답을 입력하십시오.', '1번 답');
        INSERT INTO question (classId, contentId, questionId, title, answer)
        VALUES (1, 2, 2, '2번 답을 입력하십시오.', '2번 답');

        INSERT INTO content (classId, contentId, type, title, url)
        VALUES (2, 1, '영상', '웹은 무엇인가요?', 'https://www.youtube.com/watch?v=wvQm3qf3CEo');

        INSERT INTO processState (name)
        VALUES ('수강 필요');
        INSERT INTO processState (name)
        VALUES ('수강 완료');
        INSERT INTO processState (name)
        VALUES ('제출 필요');
        INSERT INTO processState (name)
        VALUES ('제출 완료');
        INSERT INTO processState (name)
        VALUES ('채점 완료');

        INSERT INTO process (classId, contentId, userId, state, score, feedback)
        VALUES (1, 1, 'ileilliat@gmail.com', '수강 완료', 100, (SELECT title
                                                            FROM content
                                                            WHERE content.classId = 1
                                                              AND content.contentId = 1));
        INSERT INTO process (classId, contentId, userId, state, score, feedback)
        VALUES (1, 2, 'ileilliat@gmail.com', '채점 완료', 100, '운영체제 기본 개념 테스트를 정말 잘 풀었습니다.');
        INSERT INTO process (classId, contentId, userId, state, score, feedback)
        VALUES (1, 3, 'ileilliat@gmail.com', '수강 완료', 100, (SELECT title
                                                            FROM content
                                                            WHERE content.classId = 1
                                                              AND content.contentId = 3));
        INSERT INTO process (classId, contentId, userId, state, score, feedback)
        VALUES (1, 4, 'ileilliat@gmail.com', '수강 완료', 100, (SELECT title
                                                            FROM content
                                                            WHERE content.classId = 1
                                                              AND content.contentId = 4));
        INSERT INTO process (classId, contentId, userId, state, score, feedback)
        VALUES (1, 5, 'ileilliat@gmail.com', '수강 완료', 100, (SELECT title
                                                            FROM content
                                                            WHERE content.classId = 1
                                                              AND content.contentId = 5));
        INSERT INTO process (classId, contentId, userId, state, score, feedback)
        VALUES (1, 6, 'ileilliat@gmail.com', '수강 완료', 100, (SELECT title
                                                            FROM content
                                                            WHERE content.classId = 1
                                                              AND content.contentId = 6));
        INSERT INTO process (classId, contentId, userId, state, score, feedback)
        VALUES (1, 7, 'ileilliat@gmail.com', '수강 완료', 100, (SELECT title
                                                            FROM content
                                                            WHERE content.classId = 1
                                                              AND content.contentId = 7));
        INSERT INTO process (classId, contentId, userId, state, score, feedback)
        VALUES (1, 8, 'ileilliat@gmail.com', '수강 완료', 100, (SELECT title
                                                            FROM content
                                                            WHERE content.classId = 1
                                                              AND content.contentId = 8));
        INSERT INTO process (classId, contentId, userId, state, score, feedback)
        VALUES (1, 9, 'ileilliat@gmail.com', '수강 완료', 100, (SELECT title
                                                            FROM content
                                                            WHERE content.classId = 1
                                                              AND content.contentId = 9));
        INSERT INTO process (classId, contentId, userId, state, score, feedback)
        VALUES (1, 10, 'ileilliat@gmail.com', '수강 완료', 100, (SELECT title
                                                             FROM content
                                                             WHERE content.classId = 1
                                                               AND content.contentId = 10));

        INSERT INTO process (classId, contentId, userId, state, score, feedback)
        VALUES (2, 1, 'ileilliat@gmail.com', '수강 완료', 100, (SELECT title
                                                            FROM content
                                                            WHERE content.classId = 2
                                                              AND content.contentId = 1));

        UPDATE takingClass
        SET isCompleted  = TRUE,
            completedDate=CURRENT_TIMESTAMP
        WHERE userId = 'ileilliat@gmail.com'
          AND classId = '1';

        UPDATE takingClass
        SET isCompleted  = TRUE,
            completedDate=CURRENT_TIMESTAMP
        WHERE userId = 'ileilliat@gmail.com'
          AND classId = '2';

    `, (err, result) => {
        if (err) {
            req.session.dbError = err.sqlMessage
            console.log(err)
        }
        req.session.command = "Data"
        res.redirect('/')
    })
})

module.exports = router;
