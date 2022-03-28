const express = require('express');
const router = express.Router();
const connection = require('../lib/mysql')

router.get('/table', (req, res) => {
    connection.query(`
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
        );
    `, (err, result) => {
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
        DROP TABLE user;
    `, (err, result) => {
        res.redirect('/input')
    })
})

module.exports = router;
