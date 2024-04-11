-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Апр 08 2024 г., 15:13
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
-- Структура таблицы `equipa_atividades`
--

DROP TABLE IF EXISTS `equipa_atividades`;
CREATE TABLE IF NOT EXISTS `equipa_atividades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_equipa` int DEFAULT NULL,
  `id_professor` int DEFAULT NULL,
  `descricao` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `filename` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `fileType` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `fileSize` bigint DEFAULT NULL,
  `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_equipa` (`id_equipa`),
  KEY `equipa_atividades_ibfk_2` (`id_professor`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `equipa_atividades`
--

INSERT INTO `equipa_atividades` (`id`, `id_equipa`, `id_professor`, `descricao`, `filename`, `path`, `fileType`, `fileSize`, `data_criacao`) VALUES
(1, 5, 2, 'fgyuhi', '', '', '', 0, '2024-04-08 10:16:00'),
(2, NULL, NULL, '<p>456778asd</p>', NULL, NULL, NULL, NULL, '2024-04-08 11:51:49'),
(3, NULL, NULL, '<p>654321</p>', NULL, NULL, NULL, NULL, '2024-04-08 11:57:43');

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `equipa_atividades`
--
ALTER TABLE `equipa_atividades`
  ADD CONSTRAINT `equipa_atividades_ibfk_1` FOREIGN KEY (`id_equipa`) REFERENCES `equipa` (`id_equipa`),
  ADD CONSTRAINT `equipa_atividades_ibfk_2` FOREIGN KEY (`id_professor`) REFERENCES `professores` (`id_professor`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
