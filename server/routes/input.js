const express = require('express');
const router = express.Router();
const connection = require('../lib/mysql')

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
            image    MEDIUMBLOB,
            FOREIGN KEY (userId) REFERENCES user (id),
            FOREIGN KEY (category) REFERENCES classCategory (name)
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
        DROP TABLE notice;
        DROP TABLE process;
        DROP TABLE processstate;
        DROP TABLE question;
        DROP TABLE content;
        DROP TABLE contenttype;
        DROP TABLE takingclass;
        DROP TABLE class;
        DROP TABLE classcategory;
        DROP TABLE user;
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
        VALUES ('plantviver@gmail.com', 'lsy1020', '이샛별', '꽃의 향기를 부르는 진정한 식물학자', '010-9999-2229');
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
        DELETE
        FROM classcategory;
        INSERT INTO classcategory (name)
        VALUES ('컴퓨터 과학');
        INSERT INTO classcategory (name)
        VALUES ('프로그래밍');
        INSERT INTO classcategory (name)
        VALUES ('글쓰기');
        INSERT INTO classcategory (name)
        VALUES ('디자인');
        INSERT INTO classcategory (name)
        VALUES ('재테크');
        DELETE
        FROM class;
        INSERT INTO class (name, detail, userId, category, image)
        VALUES ('개념어로 배우는 운영체제', '운영체제의 기본적인 내용을 이해하고 있다고 가정하고 주요 용어에 대해 자세히 설명합니다.', 'fabi88@naver.com', '컴퓨터 과학',
                LOAD_FILE(''));
        INSERT INTO class (name, detail, userId, category, image)
        VALUES ('Front A to Z', 'React 전문가인 김유미가 기초부터 심화까지 하나하나 짚어주는 명품 프론트 강의', 'kym5957@naver.com', '컴퓨터 과학',
                LOAD_FILE(''));
        INSERT INTO class (name, detail, userId, category, image)
        VALUES ('나도 작가다', '인생을 뒤바꾼 나만의 이야기 적는 법, 살을 파고드는 아픔을 노래하고 입이 귀에 걸리는 기쁨을 읊조리는 법을 배울 수 있다.',
                'jysim0129@naver.com', '컴퓨터 과학', LOAD_FILE(''));
        INSERT INTO class (name, detail, userId, category, image)
        VALUES ('프로젝트로 배우는 안드로이드 앱 제작',
                '직접 만들면서 배우는 것만큼 쉽게 배울 수 있는 방법은 없습니다. 할 일 목록을 작성할 수 있는 CRUD가 가능한 간단하 어플리케이션을 함께 만들어 봅니다.',
                'fabi88@naver.com', '컴퓨터 과학', LOAD_FILE(''));
        INSERT INTO class (name, detail, userId, category, image)
        VALUES ('삐릿삐릿 네트워크', '네트워크 관련 개념을 삐릿빠릿하게 파악할 수 있는 강의입니다.', 'leeseungyun1020@gmail.com', '컴퓨터 과학',
                LOAD_FILE(''));
        INSERT INTO class (name, detail, userId, category, image)
        VALUES ('', '', '', '', LOAD_FILE(''));
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
