-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Апр 26 2024 г., 09:23
-- Версия сервера: 8.0.31
-- Версия PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `pepp`
--

-- --------------------------------------------------------

--
-- Структура таблицы `activitys`
--

DROP TABLE IF EXISTS `activitys`;
CREATE TABLE IF NOT EXISTS `activitys` (
  `idActivity` int NOT NULL AUTO_INCREMENT,
  `idTeacher` int DEFAULT NULL,
  `planning` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `presentation` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `publishDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idSubject` int DEFAULT NULL,
  `idYear` int DEFAULT NULL,
  `idEducation` int DEFAULT NULL,
  PRIMARY KEY (`idActivity`),
  KEY `id_disciplina` (`idSubject`),
  KEY `id_ano` (`idYear`),
  KEY `id_ensino` (`idEducation`),
  KEY `id_professor` (`idTeacher`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `activitys`
--

INSERT INTO `activitys` (`idActivity`, `idTeacher`, `planning`, `presentation`, `title`, `description`, `publishDate`, `idSubject`, `idYear`, `idEducation`) VALUES
(1, 1, 'https://science.nasa.gov/moon/', 'https://science.nasa.gov/moon/', 'Viagem à Lua\nExploração da Lua: Novos Horizontes da Humanidade', 'Explore o fascinante mundo da pesquisa espacial, embarcando em uma incrível jornada até nosso satélite natural', '2024-04-09 19:32:18', 8, 12, 6),
(2, 1, 'https://eventhorizontelescope.org', 'https://bhi.fas.harvard.edu', 'Investigação de Buracos Negros\nA Grandeza e os Mistérios dos Buracos Negros: Adentrando as Profundezas do Espaço', 'Descubra os segredos dos buracos negros, os objetos mais misteriosos do universo, e explore seu impacto no mundo ao nosso redor', '2024-04-09 19:33:33', 70, 10, 6),
(3, 1, 'https://kepler.nasa.gov', 'https://exoplanets.nasa.gov', 'Explorando Exoplanetas À Beira da Descoberta: Em Busca de Vida em Exoplanetas', 'Prepare-se para uma jornada emocionante até novos mundos potenciais, onde formas de vida além do nosso sistema solar podem habitar', '2024-04-09 19:35:06', 3, 8, 3),
(4, 2, 'https://www.noao.edu', 'https://aas.org', 'Observação de Estrelas', 'Maravilhe-se com a beleza do céu noturno enquanto explora as estrelas, constelações e fenômenos cósmicos que pontuam o universo', '2024-04-09 19:41:03', 70, 7, 2),
(5, 5, 'google.com', 'google.com', 'Titulo', 'Texttt', '2024-04-26 08:52:09', 13, 6, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `activity_team`
--

DROP TABLE IF EXISTS `activity_team`;
CREATE TABLE IF NOT EXISTS `activity_team` (
  `idActivityTeam` int NOT NULL AUTO_INCREMENT,
  `idTeam` int DEFAULT NULL,
  `idTeacher` int DEFAULT NULL,
  `descriptionActivityTeam` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `fileName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `fileType` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `fileSize` bigint DEFAULT NULL,
  `CreateDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idActivityTeam`),
  KEY `id_equipa` (`idTeam`),
  KEY `equipa_atividades_ibfk_2` (`idTeacher`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Дамп данных таблицы `activity_team`
--

INSERT INTO `activity_team` (`idActivityTeam`, `idTeam`, `idTeacher`, `descriptionActivityTeam`, `fileName`, `path`, `fileType`, `fileSize`, `CreateDate`) VALUES
(1, 1, 1, '<p>123</p>', NULL, NULL, NULL, NULL, '2024-04-23 08:46:17');

-- --------------------------------------------------------

--
-- Структура таблицы `educations`
--

DROP TABLE IF EXISTS `educations`;
CREATE TABLE IF NOT EXISTS `educations` (
  `idEducation` int NOT NULL AUTO_INCREMENT,
  `nameEducation` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`idEducation`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `educations`
--

INSERT INTO `educations` (`idEducation`, `nameEducation`) VALUES
(1, '1.º Ciclo'),
(2, '2.º Ciclo'),
(3, '3.º Ciclo'),
(4, 'Secundário Científico-Humanísticos'),
(5, 'Secundário Profissionais'),
(6, 'PIEF');

-- --------------------------------------------------------

--
-- Структура таблицы `ficheiros`
--

DROP TABLE IF EXISTS `ficheiros`;
CREATE TABLE IF NOT EXISTS `ficheiros` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_file_team_activity` int DEFAULT NULL,
  `id_file_resources` int DEFAULT NULL,
  `filename` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `fileType` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `fileSize` bigint DEFAULT NULL,
  `publishDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_file_team_activity` (`id_file_team_activity`),
  KEY `id_file_resources` (`id_file_resources`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `groups`
--

DROP TABLE IF EXISTS `groups`;
CREATE TABLE IF NOT EXISTS `groups` (
  `idGroup` int NOT NULL,
  `codGroup` int DEFAULT NULL,
  `nameGroup` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idGroup`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `groups`
--

INSERT INTO `groups` (`idGroup`, `codGroup`, `nameGroup`) VALUES
(1, 100, 'Educacao Pre-Escolar'),
(2, 110, 'Ensino Basico - 1 Ciclo'),
(3, 120, 'Ingles'),
(4, 200, 'Portugues e Estudos Sociais/Historia'),
(5, 210, 'Portugues e Frances'),
(6, 220, 'Portugues e Ingles'),
(7, 230, 'Matematicae Ciencias da Natureza'),
(8, 240, 'Educacao Visual e Tecnologica'),
(9, 250, 'Educacao Musical'),
(10, 260, 'Educacao Fisica'),
(11, 290, 'Educacao Moral e Religiosa'),
(12, 300, 'Portugues'),
(13, 310, 'Latim e Grego'),
(14, 320, 'Frances'),
(15, 330, 'Ingles'),
(16, 340, 'Alemao'),
(17, 350, 'Espanhol'),
(18, 400, 'Historia'),
(19, 410, 'Filosofia'),
(20, 420, 'Geografia'),
(21, 430, 'Economia e Contabilidade'),
(22, 500, 'Matematica'),
(23, 510, 'Fisica e Quimica'),
(24, 520, 'Biologia e Geologia'),
(25, 530, 'Educacao Tecnologia'),
(26, 600, 'Artes Visuais'),
(27, 620, 'Educacao Fisica'),
(28, 540, 'Electrotecnica'),
(29, 550, 'Informatica'),
(30, 560, 'Ciencias Agro-pecuarias'),
(31, 610, 'Musica'),
(32, 360, 'Lingua Gestual Portguesa'),
(33, 910, 'Educacao Especial 1'),
(34, 920, 'Educacao Especial 2'),
(35, 930, 'Educacao Especial 3');

-- --------------------------------------------------------

--
-- Структура таблицы `resources`
--

DROP TABLE IF EXISTS `resources`;
CREATE TABLE IF NOT EXISTS `resources` (
  `idResource` int NOT NULL AUTO_INCREMENT,
  `idTeacher` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `fileName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `fileType` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `fileSize` bigint DEFAULT NULL,
  `publishDate` datetime DEFAULT NULL,
  PRIMARY KEY (`idResource`),
  KEY `id_professor` (`idTeacher`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `resources`
--

INSERT INTO `resources` (`idResource`, `idTeacher`, `title`, `fileName`, `path`, `fileType`, `fileSize`, `publishDate`) VALUES
(4, 1, 'Green Steam', 'Cyberpunk-2077.torrent', 'C:\\TeamTeach\\website\\backend\\uploads\\Cyberpunk-2077.torrent', 'application/x-bittorrent', 390986, '2024-04-09 19:35:49'),
(5, 2, 'More democracies', 'HellDrivers2.jpg', 'C:\\TeamTeach\\website\\backend\\uploads\\HellDrivers2.jpg', 'image/jpeg', 9881, '2024-04-09 19:42:35'),
(6, 1, 'Loss', 'Sin tÃ­tulo-1.docx', 'C:\\TeamTeach\\WebSite\\backend\\uploads\\Sin tÃ­tulo-1.docx', 'application/vnd.openxmlformats-officedocument.word', 222, '2024-04-24 11:09:43'),
(7, 5, 'asddd', 'Sin tÃ­tulo-1.docx', 'C:\\TeamTeach\\WebSite\\backend\\uploads\\Sin tÃ­tulo-1.docx', 'application/vnd.openxmlformats-officedocument.word', 222, '2024-04-26 08:52:40');

-- --------------------------------------------------------

--
-- Структура таблицы `schools`
--

DROP TABLE IF EXISTS `schools`;
CREATE TABLE IF NOT EXISTS `schools` (
  `idSchool` int NOT NULL AUTO_INCREMENT,
  `nameSchool` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`idSchool`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `schools`
--

INSERT INTO `schools` (`idSchool`, `nameSchool`) VALUES
(1, 'AE Bemposta'),
(2, 'AE Monchique'),
(3, 'AE Nuno Mergulhão'),
(4, 'AE Júdice Fialho'),
(5, 'AE Poeta António Aleixo'),
(6, 'AE Manuel Teixeira Gomes');

-- --------------------------------------------------------

--
-- Структура таблицы `subjects`
--

DROP TABLE IF EXISTS `subjects`;
CREATE TABLE IF NOT EXISTS `subjects` (
  `idSubject` int NOT NULL AUTO_INCREMENT,
  `nameSubject` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`idSubject`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `subjects`
--

INSERT INTO `subjects` (`idSubject`, `nameSubject`) VALUES
(1, 'Português'),
(2, 'Matematica'),
(3, 'Artes Visuais'),
(4, 'Expressão Dramática/Teatro'),
(5, 'Dança'),
(6, 'Música'),
(7, 'Cidadania e Desenvolvimento'),
(8, 'Educação Física'),
(9, 'Inglês'),
(10, 'TIC'),
(11, 'História e Geografia de Portugal'),
(12, 'Ciências Naturais'),
(13, 'Educação Visual'),
(14, 'Educação Tecnológica'),
(15, 'Educação Musical'),
(16, 'Alemão'),
(17, 'Espanhol'),
(18, 'Francês'),
(19, 'História'),
(20, 'Geografia'),
(21, 'Físico-Química'),
(22, 'Educação Moral e Religiosa Católica'),
(23, 'Filosofia'),
(24, 'Inglês Continuação'),
(25, 'Alemão Iniciação'),
(26, 'Alemão Continuação'),
(27, 'Espanhol Iniciação'),
(28, 'Espanhol Continuação'),
(29, 'Francês Iniciação'),
(30, 'Francês Continuação'),
(31, 'Desenho A'),
(32, 'História A'),
(33, 'Matemática A'),
(34, 'Biologia e Geologia'),
(35, 'Economia A'),
(36, 'Física e Química A'),
(37, 'Geografia A'),
(38, 'Geometria Descritiva A'),
(39, 'História B'),
(40, 'História da Cultura e das Artes'),
(41, 'Latim A'),
(42, 'Literatura Portuguesa'),
(43, 'Matemática Aplicada às Ciências Sociais'),
(44, 'Matemática B'),
(45, 'Antropologia'),
(46, 'Biologia'),
(47, 'Ciência Política'),
(48, 'Clássicos da Literatura'),
(49, 'Direito'),
(50, 'Economia C'),
(51, 'Filosofia A'),
(52, 'Física'),
(53, 'Geografia C'),
(54, 'Geologia'),
(55, 'Grego'),
(56, 'Latim B'),
(57, 'Literaturas de Língua Portuguesa'),
(58, 'Materiais e Tecnologias'),
(59, 'Oficina de Artes'),
(60, 'Oficina de Multimédia B'),
(61, 'Psicologia B'),
(62, 'Estudo do Meio'),
(63, 'Português Língua Não Materna'),
(64, 'Química'),
(65, 'Sociologia'),
(66, 'Aplicações Informáticas B'),
(67, 'Oficina de Design'),
(68, 'Teatro'),
(69, 'História Culturas e Democracia'),
(70, 'Outros');

-- --------------------------------------------------------

--
-- Структура таблицы `teams`
--

DROP TABLE IF EXISTS `teams`;
CREATE TABLE IF NOT EXISTS `teams` (
  `idTeam` int NOT NULL AUTO_INCREMENT,
  `idTeacher` int DEFAULT NULL,
  `nameTeam` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `descriptionTeam` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `areasWork` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `CreateDate` datetime DEFAULT NULL,
  PRIMARY KEY (`idTeam`),
  KEY `fk_id_professor` (`idTeacher`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `teams`
--

INSERT INTO `teams` (`idTeam`, `idTeacher`, `nameTeam`, `descriptionTeam`, `areasWork`, `CreateDate`) VALUES
(1, 1, 'Domen', 'Somos uma equipa de entusiastas que está pronta para criar algo novo e conquistar o topo!', 'XYZ', '2024-04-23 08:30:04'),
(2, 5, '1233', 'Somos uma equipa de entusiastas que está pronta para criar algo novo e conquistar o topo!', 'Serviço ao cliente', '2024-04-26 09:13:36');

-- --------------------------------------------------------

--
-- Структура таблицы `team_list`
--

DROP TABLE IF EXISTS `team_list`;
CREATE TABLE IF NOT EXISTS `team_list` (
  `idTeamList` int NOT NULL AUTO_INCREMENT,
  `idTeam` int DEFAULT NULL,
  `idTeacher` int DEFAULT NULL,
  `access` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT 'Convidado',
  PRIMARY KEY (`idTeamList`),
  KEY `id_equipa` (`idTeam`),
  KEY `id_professor` (`idTeacher`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `team_list`
--

INSERT INTO `team_list` (`idTeamList`, `idTeam`, `idTeacher`, `access`) VALUES
(1, 1, 1, 'Administrador'),
(2, 2, 5, 'Administrador');

-- --------------------------------------------------------

--
-- Структура таблицы `tools`
--

DROP TABLE IF EXISTS `tools`;
CREATE TABLE IF NOT EXISTS `tools` (
  `idTool` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `link` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `about` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `application` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `state` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idTool`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `tools`
--

INSERT INTO `tools` (`idTool`, `title`, `link`, `about`, `application`, `type`, `state`) VALUES
(1, 'Word', 'https://www.office.com/launch/word', 'O Word permite-lhe criar documentos com um design profissional, tais como currículos, cartas, relatórios e muito mais. É amplamente utilizado em ambientes de escritório e para fins educativos.', 'Redes sociais e plataformas de ligação em rede', 'Apresentações e documentos', 'Está a funcionar'),
(2, 'PowerPoint', 'https://www.office.com/launch/PowerPoint', 'Crie diaporamas informativos ou apresentações invulgares e expresse as suas ideias com o Microsoft PowerPoint.', 'Redes sociais e plataformas de ligação em rede', 'Apresentações e documentos', 'Está a funcionar');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `idTeacher` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `password` varchar(3000) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `resetToken` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idSchool` int DEFAULT NULL,
  `idGroup` int DEFAULT NULL,
  `role` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'utilizador',
  PRIMARY KEY (`idTeacher`),
  KEY `id_escola` (`idSchool`),
  KEY `id_grupo` (`idGroup`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`idTeacher`, `name`, `email`, `password`, `resetToken`, `CreateDate`, `idSchool`, `idGroup`, `role`) VALUES
(1, 'XYZ', 'mrzerox228@gmail.com', '$2b$10$a9skI/sz1.BmjwCZ8jdpKeth0wxkij1K5IES0CS1dhYGhQfgDkIgu', NULL, '2024-04-09 19:18:27', 6, 16, 'administrador'),
(2, 'Sofia', 'sofia@gmail.com', '$2b$10$F5pVc2ThPEvE2GkgKu/g.ea0vRjPvgcAcnFXTt885JFlNlkkMHl3u', NULL, '2024-04-09 19:39:54', 3, 15, 'utilizador'),
(3, 'qwer', 'qwer@gmail.com', '$2b$10$F8rqJVoSGdIDwLj0iqmld.pVnNPu9wqdMhQkCxJBX5RFhwkBph.dq', NULL, '2024-04-19 14:09:44', 5, 31, 'utilizador'),
(5, 'Andrii_Deluxe_Premium_VIP_SUPERMAN', 'andrii@gmail.com', '$2b$10$maDJFky3Wh1G.ER/N3468Ouh9te3wxb.Urhz.YhbkHD96QNkksD.G', NULL, '2024-04-24 11:48:27', 3, 15, 'utilizador');

-- --------------------------------------------------------

--
-- Структура таблицы `years`
--

DROP TABLE IF EXISTS `years`;
CREATE TABLE IF NOT EXISTS `years` (
  `idYear` int NOT NULL,
  `year` int NOT NULL,
  `idEducation` int NOT NULL,
  PRIMARY KEY (`idYear`),
  KEY `id_ensino` (`idEducation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `years`
--

INSERT INTO `years` (`idYear`, `year`, `idEducation`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 5, 2),
(6, 6, 2),
(7, 7, 3),
(8, 8, 3),
(9, 9, 3),
(10, 10, 4),
(11, 11, 4),
(12, 12, 4);

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `activitys`
--
ALTER TABLE `activitys`
  ADD CONSTRAINT `activitys_ibfk_1` FOREIGN KEY (`idSubject`) REFERENCES `subjects` (`idSubject`),
  ADD CONSTRAINT `activitys_ibfk_2` FOREIGN KEY (`idYear`) REFERENCES `years` (`idYear`),
  ADD CONSTRAINT `activitys_ibfk_3` FOREIGN KEY (`idEducation`) REFERENCES `educations` (`idEducation`),
  ADD CONSTRAINT `activitys_ibfk_4` FOREIGN KEY (`idTeacher`) REFERENCES `users` (`idTeacher`);

--
-- Ограничения внешнего ключа таблицы `activity_team`
--
ALTER TABLE `activity_team`
  ADD CONSTRAINT `activity_team_ibfk_1` FOREIGN KEY (`idTeam`) REFERENCES `teams` (`idTeam`),
  ADD CONSTRAINT `activity_team_ibfk_2` FOREIGN KEY (`idTeacher`) REFERENCES `users` (`idTeacher`);

--
-- Ограничения внешнего ключа таблицы `resources`
--
ALTER TABLE `resources`
  ADD CONSTRAINT `resources_ibfk_1` FOREIGN KEY (`idTeacher`) REFERENCES `users` (`idTeacher`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `teams`
--
ALTER TABLE `teams`
  ADD CONSTRAINT `fk_id_professor` FOREIGN KEY (`idTeacher`) REFERENCES `users` (`idTeacher`);

--
-- Ограничения внешнего ключа таблицы `team_list`
--
ALTER TABLE `team_list`
  ADD CONSTRAINT `team_list_ibfk_1` FOREIGN KEY (`idTeam`) REFERENCES `teams` (`idTeam`),
  ADD CONSTRAINT `team_list_ibfk_2` FOREIGN KEY (`idTeacher`) REFERENCES `users` (`idTeacher`);

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`idSchool`) REFERENCES `schools` (`idSchool`),
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`idGroup`) REFERENCES `groups` (`idGroup`);

--
-- Ограничения внешнего ключа таблицы `years`
--
ALTER TABLE `years`
  ADD CONSTRAINT `years_ibfk_1` FOREIGN KEY (`idEducation`) REFERENCES `educations` (`idEducation`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
