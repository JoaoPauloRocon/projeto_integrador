/*
SQLyog Community Edition- MySQL GUI v6.54
MySQL - 5.5.5-10.4.28-MariaDB : Database - r77eventos
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`r77eventos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `r77eventos`;

/*Table structure for table `admin` */

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `codAdmin` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  PRIMARY KEY (`codAdmin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `admin` */

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

/*Table structure for table `endereco` */

DROP TABLE IF EXISTS `endereco`;

CREATE TABLE `endereco` (
  `codEndereco` int(11) NOT NULL AUTO_INCREMENT,
  `rua` varchar(100) DEFAULT NULL,
  `pontoReferencia` varchar(100) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `cep` char(8) DEFAULT NULL,
  PRIMARY KEY (`codEndereco`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `endereco` */

/*Table structure for table `eventos` */

DROP TABLE IF EXISTS `eventos`;

CREATE TABLE `eventos` (
  `codEvento` int(11) NOT NULL AUTO_INCREMENT,
  `codEndereco` int(11) NOT NULL,
  `nomeEvento` varchar(1000) NOT NULL,
  `imgEvento` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`codEvento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `eventos` */

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `usuario` */

insert  into `usuario`(`codUsuario`,`email`,`senha`,`nome`,`dataNascimento`,`CPF`,`telefone`) values (1,'joaopaulorocon@gmail.com','12345678','JOAO PAULO ROCON','2004-03-22','191.825.127','2147483647'),(2,'joaopaulorocon@gmail.com','12345678','JOAO PAULO ROCON','2004-03-22','191.825.127','2147483647'),(3,'luiza@email.com','1234567','Luiza Klug Adami','2007-01-10','191.825.127-44','2147483647'),(4,'luiza@email.com','1234567','Luiza Klug Adami','2007-01-10','191.825.127-44','2147483647'),(5,'luiza@email.com','1234567','Luiza Klug Adami','2007-01-10','191.825.127-44','2147483647'),(6,'giulia@gmail.com','12345678','Giulia Lopes','2006-08-31','191.825.127-44','2147483647'),(7,'joaopaulorocon@gmail.com','12345678','JOAO PAULO ROCON','2004-03-22','191.825.127-44','27997805450');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
