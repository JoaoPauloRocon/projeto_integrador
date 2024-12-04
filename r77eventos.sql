/*
SQLyog Community v13.2.1 (64 bit)
MySQL - 10.4.28-MariaDB : Database - r77eventos
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `eventos` */

insert  into `eventos`(`codEvento`,`tituloEvento`,`descricaoEvento`,`anoEvento`,`cidadeEvento`) values 
(24,'Santa Teresa Inverno Motofest','O Santa Teresa Inverno Motofest é um evento que engloba tanto a população, quanto visitantes de outras cidades, sendo eles motociclistas ou apenas alguém querendo uma parada para curtir com a família, tendo atrações musicais, praça de alimentação, praça temática e expositores variados.',2024,'Santa Teresa'),
(25,'My Helmet Rock Hotel','O My Helmet Rock Hotel, sediado no SESC Domingos Martins é um evento diferente do comum na cidade, trazendo consigo pessoas de todo lugar, em sua maioria motociclistas, porém não deixando de agradar o público local, que comparece desde a primeira edição em 2023, o evento ganhou mais visibilidade em 2024, contando com expositores tanto de praça temática, quanto montadoras, o evento também dispõe de uma variada praça de alimentação e atrações musicais em todos os dias de realização.',2024,'Domingos Martins');

/*Table structure for table `galeria` */

DROP TABLE IF EXISTS `galeria`;

CREATE TABLE `galeria` (
  `img` varchar(200) DEFAULT NULL,
  `descricao` varchar(500) DEFAULT NULL,
  `titulo` varchar(200) DEFAULT NULL,
  `idImg` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idImg`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `galeria` */

insert  into `galeria`(`img`,`descricao`,`titulo`,`idImg`) values 
('1733268353079-Inverno Moto Fest (169).jpg','',NULL,63),
('1733268353373-Inverno Moto Fest (35).jpg','',NULL,64),
('1733268353475-Inverno Moto Fest (45).jpg','',NULL,65),
('1733268353588-Inverno Moto Fest (91).jpg','',NULL,66),
('1733268353783-Inverno Moto Fest (114).jpg','',NULL,67),
('1733268354012-Inverno Moto Fest (152).jpg','',NULL,68),
('1733268354187-Inverno Moto Fest (155).jpg','',NULL,69),
('1733268354349-Inverno Moto Fest (178).jpg','',NULL,70),
('1733268354615-Inverno Moto Fest (253).jpg','',NULL,71),
('1733268510093-12c2b63570d6fd8c9d589819db8c1e56..jpg','',NULL,72),
('1733268510247-00ded95b2b7e8023e1048f0ed411ec91..jpg','',NULL,73),
('1733268510400-0e03292d88078c36b57afcabbfb3614a..jpg','',NULL,74),
('1733268510511-0eab191ae47851ef89d9b498c559b15e..jpg','',NULL,75),
('1733268510580-2d35cb7c9f4a60089ade94c6b192c3fa..jpg','',NULL,76),
('1733268510630-4d9b6fdd859ecd031d19f36f3a33fc80..jpg','',NULL,77),
('1733268510698-9c11bf14719953218190b7a8f8775c15..jpg','',NULL,78),
('1733268510785-25b33e1a603df03b1ceb9670b64d3492..jpg','',NULL,79),
('1733268510859-111455c88d89e51e1d60d38ab3f6ff9d..jpg','',NULL,80);

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
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `imagens_eventos` */

insert  into `imagens_eventos`(`codImagem`,`codEvento`,`imgEvento`,`descricaoImagem`) values 
(57,24,'1733268353079-Inverno Moto Fest (169).jpg',''),
(58,24,'1733268353373-Inverno Moto Fest (35).jpg',''),
(59,24,'1733268353475-Inverno Moto Fest (45).jpg',''),
(60,24,'1733268353588-Inverno Moto Fest (91).jpg',''),
(61,24,'1733268353783-Inverno Moto Fest (114).jpg',''),
(62,24,'1733268354012-Inverno Moto Fest (152).jpg',''),
(63,24,'1733268354187-Inverno Moto Fest (155).jpg',''),
(64,24,'1733268354349-Inverno Moto Fest (178).jpg',''),
(65,24,'1733268354615-Inverno Moto Fest (253).jpg',''),
(66,25,'1733268510093-12c2b63570d6fd8c9d589819db8c1e56..jpg',''),
(67,25,'1733268510247-00ded95b2b7e8023e1048f0ed411ec91..jpg',''),
(68,25,'1733268510400-0e03292d88078c36b57afcabbfb3614a..jpg',''),
(69,25,'1733268510511-0eab191ae47851ef89d9b498c559b15e..jpg',''),
(70,25,'1733268510580-2d35cb7c9f4a60089ade94c6b192c3fa..jpg',''),
(71,25,'1733268510630-4d9b6fdd859ecd031d19f36f3a33fc80..jpg',''),
(72,25,'1733268510698-9c11bf14719953218190b7a8f8775c15..jpg',''),
(73,25,'1733268510785-25b33e1a603df03b1ceb9670b64d3492..jpg',''),
(74,25,'1733268510859-111455c88d89e51e1d60d38ab3f6ff9d..jpg','');

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
