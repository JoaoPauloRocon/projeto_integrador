/*
SQLyog Trial v13.1.8 (64 bit)
MySQL - 10.4.32-MariaDB : Database - r77eventos
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`r77eventos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `r77eventos`;

/*Table structure for table `admin` */

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `codAdmin` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  PRIMARY KEY (`codAdmin`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `admin` */

insert  into `admin`(`codAdmin`,`email`,`senha`) values 
(1,'admin@example.com','senha_segura'),
(2,'admin@gmail.com','admin');

/*Table structure for table `avaliacao` */

DROP TABLE IF EXISTS `avaliacao`;

CREATE TABLE `avaliacao` (
  `coaAvaliacao` int(11) NOT NULL AUTO_INCREMENT,
  `codUsuario` int(11) DEFAULT NULL,
  `descAvaliacao` varchar(1000) DEFAULT NULL,
  `notaAvaliacao` int(11) DEFAULT NULL,
  PRIMARY KEY (`coaAvaliacao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `avaliacao` */

/*Table structure for table `eventos` */

DROP TABLE IF EXISTS `eventos`;

CREATE TABLE `eventos` (
  `codEvento` int(11) NOT NULL AUTO_INCREMENT,
  `tituloEvento` varchar(255) NOT NULL,
  `descricaoEvento` text DEFAULT NULL,
  `anoEvento` int(11) DEFAULT NULL,
  `cidadeEvento` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`codEvento`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `eventos` */

insert  into `eventos`(`codEvento`,`tituloEvento`,`descricaoEvento`,`anoEvento`,`cidadeEvento`) values 
(12,'vfdvfda','vfdavfd',2024,'bgsbfda'),
(13,'EVENTO 2','vfrefebgre',2024,'Santa teresa'),
(14,'EVENTO 2','grthtrhgrt',2023,'Santa teresa'),
(15,'EVENTO 2','vfbfdbdv',2024,'Santa teresa'),
(16,'1783154','vfdvdfs',2024,'gregfdg');

/*Table structure for table `galeria` */

DROP TABLE IF EXISTS `galeria`;

CREATE TABLE `galeria` (
  `img` varchar(200) DEFAULT NULL,
  `descricao` varchar(500) DEFAULT NULL,
  `titulo` varchar(200) DEFAULT NULL,
  `idImg` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idImg`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `galeria` */

insert  into `galeria`(`img`,`descricao`,`titulo`,`idImg`) values 
('1727106526370-Inverno Motofest Santa Teresa - Renata Roque - Foto Pista-01.jpg','sem descrição','EVENTO 1',1),
('1727106585867-Inverno Motofest Santa Teresa - Renata Roque - Foto Pista-03.jpg','sem descição','EVENTO 2',2),
('1733168382795-1727106585867-Inverno Motofest Santa Teresa - Renata Roque - Foto Pista-03.jpg','',NULL,3),
('1733168382804-1727106526370-Inverno Motofest Santa Teresa - Renata Roque - Foto Pista-01.jpg','',NULL,4),
('1733169177988-1727106585867-Inverno Motofest Santa Teresa - Renata Roque - Foto Pista-03.jpg','',NULL,5),
('1733169177997-1727106526370-Inverno Motofest Santa Teresa - Renata Roque - Foto Pista-01.jpg','',NULL,6),
('1733169812738-1727106585867-Inverno Motofest Santa Teresa - Renata Roque - Foto Pista-03.jpg','',NULL,7),
('1733169812747-1727106526370-Inverno Motofest Santa Teresa - Renata Roque - Foto Pista-01.jpg','',NULL,8),
('1733171481815-1727106585867-Inverno Motofest Santa Teresa - Renata Roque - Foto Pista-03.jpg','',NULL,9),
('1733171481822-1727106526370-Inverno Motofest Santa Teresa - Renata Roque - Foto Pista-01.jpg','',NULL,10),
('1733171505927-1727106585867-Inverno Motofest Santa Teresa - Renata Roque - Foto Pista-03.jpg','',NULL,11),
('1733171505933-1727106526370-Inverno Motofest Santa Teresa - Renata Roque - Foto Pista-01.jpg','',NULL,12),
('1733171550050-1727106585867-Inverno Motofest Santa Teresa - Renata Roque - Foto Pista-03.jpg','',NULL,13),
('1733171550056-1727106526370-Inverno Motofest Santa Teresa - Renata Roque - Foto Pista-01.jpg','',NULL,14),
('1733171581247-1727106585867-Inverno Motofest Santa Teresa - Renata Roque - Foto Pista-03.jpg','',NULL,15),
('1733171581253-1727106526370-Inverno Motofest Santa Teresa - Renata Roque - Foto Pista-01.jpg','',NULL,16);

/*Table structure for table `imagens_eventos` */

DROP TABLE IF EXISTS `imagens_eventos`;

CREATE TABLE `imagens_eventos` (
  `codImagem` int(11) NOT NULL AUTO_INCREMENT,
  `codEvento` int(11) DEFAULT NULL,
  `imgEvento` varchar(255) DEFAULT NULL,
  `descricaoImagem` text DEFAULT NULL,
  PRIMARY KEY (`codImagem`),
  KEY `codEvento` (`codEvento`),
  CONSTRAINT `imagens_eventos_ibfk_1` FOREIGN KEY (`codEvento`) REFERENCES `eventos` (`codEvento`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `imagens_eventos` */

insert  into `imagens_eventos`(`codImagem`,`codEvento`,`imgEvento`,`descricaoImagem`) values 
(1,12,'1733169812738-1727106585867-Inverno Motofest Santa Teresa - Renata Roque - Foto Pista-03.jpg',''),
(2,12,'1733169812747-1727106526370-Inverno Motofest Santa Teresa - Renata Roque - Foto Pista-01.jpg',''),
(3,13,'1733171481815-1727106585867-Inverno Motofest Santa Teresa - Renata Roque - Foto Pista-03.jpg',''),
(4,13,'1733171481822-1727106526370-Inverno Motofest Santa Teresa - Renata Roque - Foto Pista-01.jpg',''),
(5,14,'1733171505927-1727106585867-Inverno Motofest Santa Teresa - Renata Roque - Foto Pista-03.jpg',''),
(6,14,'1733171505933-1727106526370-Inverno Motofest Santa Teresa - Renata Roque - Foto Pista-01.jpg',''),
(7,15,'1733171550050-1727106585867-Inverno Motofest Santa Teresa - Renata Roque - Foto Pista-03.jpg',''),
(8,15,'1733171550056-1727106526370-Inverno Motofest Santa Teresa - Renata Roque - Foto Pista-01.jpg',''),
(9,16,'1733171581247-1727106585867-Inverno Motofest Santa Teresa - Renata Roque - Foto Pista-03.jpg',''),
(10,16,'1733171581253-1727106526370-Inverno Motofest Santa Teresa - Renata Roque - Foto Pista-01.jpg','');

/*Table structure for table `usuario` */

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `codUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `dataNascimento` date DEFAULT NULL,
  `CPF` varchar(100) DEFAULT NULL,
  `telefone` varchar(100) NOT NULL,
  PRIMARY KEY (`codUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `usuario` */

insert  into `usuario`(`codUsuario`,`email`,`senha`,`nome`,`dataNascimento`,`CPF`,`telefone`) values 
(1,'joaopaulorocon@gmail.com','12345678','JOAO PAULO ROCON','2004-03-22','191.825.127-44','27997805450'),
(2,'amanda@gmail.com','Amanda@4321','Amanda@4321','2001-03-02','191.825.127-44','27997805450');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
