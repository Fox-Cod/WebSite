-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Апр 11 2024 г., 21:38
-- Версия сервера: 8.2.0
-- Версия PHP: 8.2.13

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
-- Структура таблицы `anos`
--

DROP TABLE IF EXISTS `anos`;
CREATE TABLE IF NOT EXISTS `anos` (
  `id_ano` int NOT NULL,
  `ano` int NOT NULL,
  `id_ensino` int NOT NULL,
  PRIMARY KEY (`id_ano`),
  KEY `id_ensino` (`id_ensino`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `anos`
--

INSERT INTO `anos` (`id_ano`, `ano`, `id_ensino`) VALUES
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

-- --------------------------------------------------------

--
-- Структура таблицы `atividades`
--

DROP TABLE IF EXISTS `atividades`;
CREATE TABLE IF NOT EXISTS `atividades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_professor` int DEFAULT NULL,
  `planificacao` text COLLATE utf8mb3_unicode_ci,
  `presentacao` text COLLATE utf8mb3_unicode_ci,
  `titulo` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `descricao` text COLLATE utf8mb3_unicode_ci,
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_disciplina` int DEFAULT NULL,
  `id_ano` int DEFAULT NULL,
  `id_ensino` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_disciplina` (`id_disciplina`),
  KEY `id_ano` (`id_ano`),
  KEY `id_ensino` (`id_ensino`),
  KEY `id_professor` (`id_professor`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `atividades`
--

INSERT INTO `atividades` (`id`, `id_professor`, `planificacao`, `presentacao`, `titulo`, `descricao`, `data_criacao`, `id_disciplina`, `id_ano`, `id_ensino`) VALUES
(1, 1, 'https://science.nasa.gov/moon/', 'https://science.nasa.gov/moon/', 'Viagem à Lua\nExploração da Lua: Novos Horizontes da Humanidade', 'Explore o fascinante mundo da pesquisa espacial, embarcando em uma incrível jornada até nosso satélite natural', '2024-04-09 19:32:18', 8, 12, 6),
(2, 1, 'https://eventhorizontelescope.org', 'https://bhi.fas.harvard.edu', 'Investigação de Buracos Negros\nA Grandeza e os Mistérios dos Buracos Negros: Adentrando as Profundezas do Espaço', 'Descubra os segredos dos buracos negros, os objetos mais misteriosos do universo, e explore seu impacto no mundo ao nosso redor', '2024-04-09 19:33:33', 70, 10, 6),
(3, 1, 'https://kepler.nasa.gov', 'https://exoplanets.nasa.gov', 'Explorando Exoplanetas À Beira da Descoberta: Em Busca de Vida em Exoplanetas', 'Prepare-se para uma jornada emocionante até novos mundos potenciais, onde formas de vida além do nosso sistema solar podem habitar', '2024-04-09 19:35:06', 3, 8, 3),
(4, 2, 'https://www.noao.edu', 'https://aas.org', 'Observação de Estrelas', 'Maravilhe-se com a beleza do céu noturno enquanto explora as estrelas, constelações e fenômenos cósmicos que pontuam o universo', '2024-04-09 19:41:03', 70, 7, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `convites`
--

DROP TABLE IF EXISTS `convites`;
CREATE TABLE IF NOT EXISTS `convites` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_equipa` int DEFAULT NULL,
  `id_professor` int DEFAULT NULL,
  `nivel_de_acesso` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT 'pending',
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `convites`
--

INSERT INTO `convites` (`id`, `id_equipa`, `id_professor`, `nivel_de_acesso`, `status`, `data_criacao`) VALUES
(1, 2, 1, 'can edit', 'pending', '2024-01-11 21:03:58'),
(2, 2, 6, 'can edit', 'pending', '2024-01-11 21:15:42');

-- --------------------------------------------------------

--
-- Структура таблицы `disciplinas`
--

DROP TABLE IF EXISTS `disciplinas`;
CREATE TABLE IF NOT EXISTS `disciplinas` (
  `id_disciplina` int NOT NULL AUTO_INCREMENT,
  `nome_disciplina` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id_disciplina`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `disciplinas`
--

INSERT INTO `disciplinas` (`id_disciplina`, `nome_disciplina`) VALUES
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
-- Структура таблицы `disciplina_ano`
--

DROP TABLE IF EXISTS `disciplina_ano`;
CREATE TABLE IF NOT EXISTS `disciplina_ano` (
  `id_disciplina_ano` int NOT NULL AUTO_INCREMENT,
  `id_disciplina` int DEFAULT NULL,
  `id_ano` int DEFAULT NULL,
  `id_ensino` int DEFAULT NULL,
  PRIMARY KEY (`id_disciplina_ano`),
  KEY `id_disciplina` (`id_disciplina`),
  KEY `id_ano` (`id_ano`),
  KEY `id_ensino` (`id_ensino`)
) ENGINE=InnoDB AUTO_INCREMENT=217 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `disciplina_ano`
--

INSERT INTO `disciplina_ano` (`id_disciplina_ano`, `id_disciplina`, `id_ano`, `id_ensino`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 1),
(3, 1, 3, 1),
(4, 1, 4, 1),
(5, 1, 5, 2),
(6, 1, 6, 2),
(7, 1, 7, 3),
(8, 1, 8, 3),
(9, 1, 9, 3),
(10, 1, 10, 4),
(11, 1, 11, 4),
(12, 1, 12, 4),
(13, 2, 1, 1),
(14, 2, 2, 1),
(15, 2, 3, 1),
(16, 2, 4, 1),
(17, 2, 5, 2),
(18, 2, 6, 2),
(19, 2, 7, 3),
(20, 2, 8, 3),
(21, 2, 9, 3),
(22, 3, 1, 1),
(23, 3, 2, 1),
(24, 3, 3, 1),
(25, 3, 4, 1),
(26, 4, 1, 1),
(27, 4, 2, 1),
(28, 4, 3, 1),
(29, 4, 4, 1),
(30, 5, 1, 1),
(31, 5, 2, 1),
(32, 5, 3, 1),
(33, 5, 4, 1),
(34, 6, 1, 1),
(35, 6, 2, 1),
(36, 6, 3, 1),
(37, 6, 4, 1),
(38, 7, 1, 1),
(39, 7, 2, 1),
(40, 7, 3, 1),
(41, 7, 4, 1),
(42, 7, 5, 2),
(43, 7, 6, 2),
(44, 7, 7, 3),
(45, 7, 8, 3),
(46, 7, 9, 3),
(47, 8, 1, 1),
(48, 8, 2, 1),
(49, 8, 3, 1),
(50, 8, 4, 1),
(51, 8, 5, 2),
(52, 8, 6, 2),
(53, 8, 7, 3),
(54, 8, 8, 3),
(55, 8, 9, 3),
(56, 8, 10, 4),
(57, 8, 11, 4),
(58, 8, 12, 4),
(59, 9, 3, 1),
(60, 9, 4, 1),
(61, 9, 5, 2),
(62, 9, 6, 2),
(63, 9, 7, 3),
(64, 9, 8, 3),
(65, 9, 9, 3),
(66, 10, 1, 1),
(67, 10, 2, 1),
(68, 10, 3, 1),
(69, 10, 4, 1),
(70, 10, 5, 2),
(71, 10, 6, 2),
(72, 10, 7, 3),
(73, 10, 8, 3),
(74, 10, 9, 3),
(75, 11, 5, 2),
(76, 11, 6, 2),
(77, 12, 5, 2),
(78, 12, 6, 2),
(79, 12, 7, 3),
(80, 12, 8, 3),
(81, 12, 9, 3),
(82, 13, 5, 2),
(83, 13, 6, 2),
(84, 13, 7, 3),
(85, 13, 8, 3),
(86, 13, 9, 3),
(87, 14, 5, 2),
(88, 14, 6, 2),
(89, 14, 7, 3),
(90, 14, 8, 3),
(91, 14, 9, 3),
(92, 15, 5, 2),
(93, 15, 6, 2),
(94, 15, 7, 3),
(95, 15, 8, 3),
(96, 15, 9, 3),
(97, 16, 7, 3),
(98, 16, 8, 3),
(99, 16, 9, 3),
(100, 17, 7, 3),
(101, 17, 8, 3),
(102, 17, 9, 3),
(103, 18, 7, 3),
(104, 18, 8, 3),
(105, 18, 9, 3),
(106, 19, 7, 3),
(107, 19, 8, 3),
(108, 19, 9, 3),
(109, 20, 7, 3),
(110, 20, 8, 3),
(111, 20, 9, 3),
(112, 21, 1, 1),
(113, 21, 2, 1),
(114, 21, 3, 1),
(115, 21, 4, 1),
(116, 21, 5, 2),
(117, 21, 6, 2),
(118, 21, 7, 3),
(119, 21, 8, 3),
(120, 21, 9, 3),
(121, 22, 10, 4),
(122, 22, 11, 4),
(123, 22, 12, 4),
(124, 23, 10, 4),
(125, 23, 11, 4),
(126, 24, 10, 4),
(127, 24, 11, 4),
(128, 24, 12, 4),
(129, 25, 10, 4),
(130, 25, 11, 4),
(131, 25, 12, 4),
(132, 26, 10, 4),
(133, 26, 11, 4),
(134, 26, 12, 4),
(135, 27, 10, 4),
(136, 27, 11, 4),
(137, 27, 12, 4),
(138, 28, 10, 4),
(139, 28, 11, 4),
(140, 28, 12, 4),
(141, 29, 10, 4),
(142, 29, 11, 4),
(143, 29, 12, 4),
(144, 30, 10, 4),
(145, 30, 11, 4),
(146, 30, 12, 4),
(147, 31, 10, 4),
(148, 31, 11, 4),
(149, 31, 12, 4),
(150, 32, 10, 4),
(151, 32, 11, 4),
(152, 32, 12, 4),
(153, 33, 10, 4),
(154, 33, 11, 4),
(155, 33, 12, 4),
(156, 34, 10, 4),
(157, 34, 11, 4),
(158, 35, 10, 4),
(159, 35, 11, 4),
(160, 36, 10, 4),
(161, 36, 11, 4),
(162, 37, 10, 4),
(163, 37, 11, 4),
(164, 38, 10, 4),
(165, 38, 11, 4),
(166, 39, 10, 4),
(167, 39, 11, 4),
(168, 40, 10, 4),
(169, 40, 11, 4),
(170, 41, 10, 4),
(171, 41, 11, 4),
(172, 42, 10, 4),
(173, 42, 11, 4),
(174, 43, 10, 4),
(175, 43, 11, 4),
(176, 44, 10, 4),
(177, 44, 11, 4),
(178, 45, 12, 4),
(179, 46, 12, 4),
(180, 47, 12, 4),
(181, 48, 12, 4),
(182, 49, 12, 4),
(183, 50, 12, 4),
(184, 51, 12, 4),
(185, 52, 12, 4),
(186, 53, 12, 4),
(187, 54, 12, 4),
(188, 55, 12, 4),
(189, 56, 12, 4),
(190, 57, 12, 4),
(191, 58, 12, 4),
(192, 59, 12, 4),
(193, 60, 12, 4),
(194, 61, 12, 4),
(195, 62, 1, 1),
(196, 62, 2, 1),
(197, 62, 3, 1),
(198, 62, 4, 1),
(199, 63, 1, 1),
(200, 63, 2, 1),
(201, 63, 3, 1),
(202, 63, 4, 1),
(203, 63, 5, 2),
(204, 63, 6, 2),
(205, 63, 7, 3),
(206, 63, 8, 3),
(207, 63, 9, 3),
(208, 63, 10, 4),
(209, 63, 11, 4),
(210, 63, 12, 4),
(211, 64, 12, 4),
(212, 65, 12, 4),
(213, 66, 12, 4),
(214, 67, 12, 4),
(215, 68, 12, 4),
(216, 69, 12, 4);

-- --------------------------------------------------------

--
-- Структура таблицы `equipa`
--

DROP TABLE IF EXISTS `equipa`;
CREATE TABLE IF NOT EXISTS `equipa` (
  `id_equipa` int NOT NULL AUTO_INCREMENT,
  `id_professor` int DEFAULT NULL,
  `nome_equipa` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `descricao_equipa` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `industria` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id_equipa`),
  KEY `fk_id_professor` (`id_professor`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `equipa`
--

INSERT INTO `equipa` (`id_equipa`, `id_professor`, `nome_equipa`, `descricao_equipa`, `industria`) VALUES
(1, 1, 'TestDrive', 'Somos uma equipa de entusiastas que está pronta para criar algo novo e conquistar o topo!', 'XYZ');

-- --------------------------------------------------------

--
-- Структура таблицы `equipa_atividades`
--

DROP TABLE IF EXISTS `equipa_atividades`;
CREATE TABLE IF NOT EXISTS `equipa_atividades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_equipa` int DEFAULT NULL,
  `id_professor` int DEFAULT NULL,
  `descricao` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `filename` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `fileType` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `fileSize` bigint DEFAULT NULL,
  `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_equipa` (`id_equipa`),
  KEY `equipa_atividades_ibfk_2` (`id_professor`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Дамп данных таблицы `equipa_atividades`
--

INSERT INTO `equipa_atividades` (`id`, `id_equipa`, `id_professor`, `descricao`, `filename`, `path`, `fileType`, `fileSize`, `data_criacao`) VALUES
(1, 1, 1, '<p><strong>123</strong> <em>456</em> <u>789</u> <s>012</s></p><ol><li>345</li></ol><ul><li>678</li></ul><p><a href=\"https://console.cloud.google.com/apis/credentials/oauthclient/41978584350-7q77ll8c23fktgf7ehes1piaq5q18jc5.apps.googleusercontent.com?project=papvite\" rel=\"noopener noreferrer\" target=\"_blank\"><strong><em><s><u>Google</u></s></em></strong></a></p><p><a href=\"https://developers.google.com/oauthplayground/?code=4/0AeaYSHA-RapEtMMzI41SGPpb819FkH-wLLyZC29g_jaKRRvBSxFkr79vins_3hLneqYGqA&amp;scope=https://mail.google.com/\" rel=\"noopener noreferrer\" target=\"_blank\"><strong><em><s><u>Google 2</u></s></em></strong></a></p>', NULL, NULL, NULL, NULL, '2024-04-09 19:28:05'),
(2, 1, 1, '<p><a href=\"https://onedrive.live.com/personal/35e7d717dd1e661d/_layouts/15/doc2.aspx?resid=dd1e661d-d717-20e7-8035-160100000000&amp;cid=35e7d717dd1e661d&amp;ct=1712861672100&amp;wdOrigin=OFFICECOM-WEB.START.EDGEWORTH&amp;wdPreviousSessionSrc=HarmonyWeb&amp;wdPreviousSession=d9dda1f1-984a-4f3f-8a62-0c126fdc2d23\" rel=\"noopener noreferrer\" target=\"_blank\">Relatório</a></p>', 'RelatÃ³rio TeamTeach.docx', 'C:\\TeamTeach\\WebSite\\backend\\uploads\\RelatÃ³rio TeamTeach.docx', '.docx', 483449, '2024-04-11 18:56:34');

-- --------------------------------------------------------

--
-- Структура таблицы `escola`
--

DROP TABLE IF EXISTS `escola`;
CREATE TABLE IF NOT EXISTS `escola` (
  `id_escola` int NOT NULL AUTO_INCREMENT,
  `nome_escola` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id_escola`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `escola`
--

INSERT INTO `escola` (`id_escola`, `nome_escola`) VALUES
(1, 'AE Bemposta'),
(2, 'AE Monchique'),
(3, 'AE Nuno Mergulhão'),
(4, 'AE Júdice Fialho'),
(5, 'AE Poeta António Aleixo'),
(6, 'AE Manuel Teixeira Gomes');

-- --------------------------------------------------------

--
-- Структура таблицы `ferramentos`
--

DROP TABLE IF EXISTS `ferramentos`;
CREATE TABLE IF NOT EXISTS `ferramentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `link` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `sobre` text COLLATE utf8mb3_unicode_ci,
  `aplicacao` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `tipo` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `estado` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `iconeURL` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `ferramentos`
--

INSERT INTO `ferramentos` (`id`, `titulo`, `link`, `sobre`, `aplicacao`, `tipo`, `estado`, `iconeURL`) VALUES
(1, 'Word', 'https://www.office.com/launch/word', 'O Word permite-lhe criar documentos com um design profissional, tais como currículos, cartas, relatórios e muito mais. É amplamente utilizado em ambientes de escritório e para fins educativos.', 'Redes sociais e plataformas de ligação em rede', 'Apresentações e documentos', 'Está a funcionar', 'http://localhost:8081/uploads/icone-1707671665127'),
(2, 'PowerPoint', 'https://www.office.com/launch/PowerPoint', 'Crie diaporamas informativos ou apresentações invulgares e expresse as suas ideias com o Microsoft PowerPoint.', 'Redes sociais e plataformas de ligação em rede', 'Apresentações e documentos', 'Está a funcionar', 'http://localhost:8081/uploads/icone-1709146940219');

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
-- Структура таблицы `grupo`
--

DROP TABLE IF EXISTS `grupo`;
CREATE TABLE IF NOT EXISTS `grupo` (
  `id_grupo` int NOT NULL,
  `cod_grupo` int DEFAULT NULL,
  `nome_grupo` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_grupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `grupo`
--

INSERT INTO `grupo` (`id_grupo`, `cod_grupo`, `nome_grupo`) VALUES
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
-- Структура таблицы `nivel_ensino`
--

DROP TABLE IF EXISTS `nivel_ensino`;
CREATE TABLE IF NOT EXISTS `nivel_ensino` (
  `id_ensino` int NOT NULL AUTO_INCREMENT,
  `nome_ensino` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id_ensino`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `nivel_ensino`
--

INSERT INTO `nivel_ensino` (`id_ensino`, `nome_ensino`) VALUES
(1, '1.º Ciclo'),
(2, '2.º Ciclo'),
(3, '3.º Ciclo'),
(4, 'Secundário Científico-Humanísticos'),
(5, 'Secundário Profissionais'),
(6, 'PIEF');

-- --------------------------------------------------------

--
-- Структура таблицы `professores`
--

DROP TABLE IF EXISTS `professores`;
CREATE TABLE IF NOT EXISTS `professores` (
  `id_professor` int NOT NULL AUTO_INCREMENT,
  `nome_professor` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `email_professor` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `password_professor` varchar(3000) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `resetToken` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `resetTokenExpires` date DEFAULT NULL,
  `data_registro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_escola` int DEFAULT NULL,
  `id_grupo` int DEFAULT NULL,
  `role` varchar(50) COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'utilizador',
  PRIMARY KEY (`id_professor`),
  KEY `id_escola` (`id_escola`),
  KEY `id_grupo` (`id_grupo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `professores`
--

INSERT INTO `professores` (`id_professor`, `nome_professor`, `email_professor`, `password_professor`, `resetToken`, `resetTokenExpires`, `data_registro`, `id_escola`, `id_grupo`, `role`) VALUES
(1, 'XYZ', 'mrzerox228@gmail.com', '$2b$10$UzI1PL6LywjVTVo.Vlq2E.jaRMbPRA210TZx0On74CuV/cylT.iqy', NULL, NULL, '2024-04-09 19:18:27', 6, 16, 'administrador'),
(2, 'Sofia', 'sofia@gmail.com', '$2b$10$F5pVc2ThPEvE2GkgKu/g.ea0vRjPvgcAcnFXTt885JFlNlkkMHl3u', NULL, NULL, '2024-04-09 19:39:54', 3, 15, 'utilizador');

-- --------------------------------------------------------

--
-- Структура таблицы `recursos`
--

DROP TABLE IF EXISTS `recursos`;
CREATE TABLE IF NOT EXISTS `recursos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_professor` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `filename` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `fileType` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `fileSize` bigint DEFAULT NULL,
  `iconPath` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `publishDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_professor` (`id_professor`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `recursos`
--

INSERT INTO `recursos` (`id`, `id_professor`, `title`, `filename`, `path`, `fileType`, `fileSize`, `iconPath`, `publishDate`) VALUES
(4, 1, 'Green Steam', 'Cyberpunk-2077.torrent', 'C:\\TeamTeach\\website\\backend\\uploads\\Cyberpunk-2077.torrent', 'application/x-bittorrent', 390986, NULL, '2024-04-09 19:35:49'),
(5, 2, 'More democracies', 'HellDrivers2.jpg', 'C:\\TeamTeach\\website\\backend\\uploads\\HellDrivers2.jpg', 'image/jpeg', 9881, NULL, '2024-04-09 19:42:35');

-- --------------------------------------------------------

--
-- Структура таблицы `relacao_equipa_utilizador`
--

DROP TABLE IF EXISTS `relacao_equipa_utilizador`;
CREATE TABLE IF NOT EXISTS `relacao_equipa_utilizador` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_equipa` int DEFAULT NULL,
  `id_professor` int DEFAULT NULL,
  `nivel_de_acesso` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT 'guest',
  PRIMARY KEY (`id`),
  KEY `id_equipa` (`id_equipa`),
  KEY `id_professor` (`id_professor`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `relacao_equipa_utilizador`
--

INSERT INTO `relacao_equipa_utilizador` (`id`, `id_equipa`, `id_professor`, `nivel_de_acesso`) VALUES
(1, 1, 1, 'Administrator'),
(2, 1, 2, 'Guest');

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `anos`
--
ALTER TABLE `anos`
  ADD CONSTRAINT `anos_ibfk_1` FOREIGN KEY (`id_ensino`) REFERENCES `nivel_ensino` (`id_ensino`);

--
-- Ограничения внешнего ключа таблицы `atividades`
--
ALTER TABLE `atividades`
  ADD CONSTRAINT `atividades_ibfk_1` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplinas` (`id_disciplina`),
  ADD CONSTRAINT `atividades_ibfk_2` FOREIGN KEY (`id_ano`) REFERENCES `anos` (`id_ano`),
  ADD CONSTRAINT `atividades_ibfk_3` FOREIGN KEY (`id_ensino`) REFERENCES `nivel_ensino` (`id_ensino`),
  ADD CONSTRAINT `atividades_ibfk_4` FOREIGN KEY (`id_professor`) REFERENCES `professores` (`id_professor`);

--
-- Ограничения внешнего ключа таблицы `disciplina_ano`
--
ALTER TABLE `disciplina_ano`
  ADD CONSTRAINT `disciplina_ano_ibfk_1` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplinas` (`id_disciplina`),
  ADD CONSTRAINT `disciplina_ano_ibfk_2` FOREIGN KEY (`id_ano`) REFERENCES `anos` (`id_ano`),
  ADD CONSTRAINT `disciplina_ano_ibfk_3` FOREIGN KEY (`id_ensino`) REFERENCES `nivel_ensino` (`id_ensino`);

--
-- Ограничения внешнего ключа таблицы `equipa`
--
ALTER TABLE `equipa`
  ADD CONSTRAINT `fk_id_professor` FOREIGN KEY (`id_professor`) REFERENCES `professores` (`id_professor`);

--
-- Ограничения внешнего ключа таблицы `equipa_atividades`
--
ALTER TABLE `equipa_atividades`
  ADD CONSTRAINT `equipa_atividades_ibfk_1` FOREIGN KEY (`id_equipa`) REFERENCES `equipa` (`id_equipa`),
  ADD CONSTRAINT `equipa_atividades_ibfk_2` FOREIGN KEY (`id_professor`) REFERENCES `professores` (`id_professor`);

--
-- Ограничения внешнего ключа таблицы `professores`
--
ALTER TABLE `professores`
  ADD CONSTRAINT `professores_ibfk_1` FOREIGN KEY (`id_escola`) REFERENCES `escola` (`id_escola`),
  ADD CONSTRAINT `professores_ibfk_2` FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id_grupo`);

--
-- Ограничения внешнего ключа таблицы `recursos`
--
ALTER TABLE `recursos`
  ADD CONSTRAINT `recursos_ibfk_1` FOREIGN KEY (`id_professor`) REFERENCES `professores` (`id_professor`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `relacao_equipa_utilizador`
--
ALTER TABLE `relacao_equipa_utilizador`
  ADD CONSTRAINT `relacao_equipa_utilizador_ibfk_1` FOREIGN KEY (`id_equipa`) REFERENCES `equipa` (`id_equipa`),
  ADD CONSTRAINT `relacao_equipa_utilizador_ibfk_2` FOREIGN KEY (`id_professor`) REFERENCES `professores` (`id_professor`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
