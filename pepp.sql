-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 12 2024 г., 19:33
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
-- Структура таблицы `activitys`
--

DROP TABLE IF EXISTS `activitys`;
CREATE TABLE IF NOT EXISTS `activitys` (
  `idActivity` int NOT NULL AUTO_INCREMENT,
  `idTeacher` int DEFAULT NULL,
  `planning` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `presentation` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `publishDate` datetime DEFAULT NULL,
  `viewsCount` int DEFAULT '0',
  `commentsCount` int DEFAULT '0',
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

INSERT INTO `activitys` (`idActivity`, `idTeacher`, `planning`, `presentation`, `title`, `description`, `publishDate`, `viewsCount`, `commentsCount`, `idSubject`, `idYear`, `idEducation`) VALUES
(1, 1, 'https://minhasviagensculinarias.blogspot.com/2014/07/receitas-de-chuck-e-monotonia.html', 'https://escolaamiga.pt/projetos/86cfb578-c485-4973-b96f-8fb0aaeab1a8?category=&school=&name=&offset=190&total=200', 'Explorando culturas através da culinária', ' Transforme sua sala de aula em um laboratório culinário! Os alunos irão explorar a cultura de diferentes países através da preparação de pratos nacionais. Esta é uma forma envolvente de estudar geografia, história e tradições de diversas nações, enquanto', '2024-05-29 15:31:53', 0, 0, 34, 4, 2),
(2, 3, 'https://faveni.edu.br/curso/ecologia-e-desenvolvimento-sustentavel/', 'https://edukatu.org.br/uploads/EDKT/Plano_de_Aula_ODS17_Parcerias.pdf', 'Desenvolvimento sustentável e ecologia', 'Discuta com os alunos os problemas ambientais atuais e maneiras de solucioná-los. A aula incluirá a exibição de documentários, realização de experimentos e criação de projetos de preservação ambiental. Isso ajudará os alunos a entenderem melhor como suas ', '2024-05-29 15:34:04', 0, 0, 70, 6, 3),
(3, 3, 'https://www.wook.pt/arvoretematica/livros-em-portugues-arte/8066x5839x18000/P', 'https://www.arte.tv/en/', 'Arte e Criatividade', 'Esta aula é dedicada à exploração de diferentes formas de arte e ao desenvolvimento de habilidades criativas. Os alunos serão apresentados a várias técnicas artísticas, como pintura, escultura e design gráfico, e criarão suas próprias obras de arte.', '2024-05-29 15:35:38', 0, 0, 3, 8, 3),
(4, 2, 'https://www.slideshare.net/slideshow/planejamento-financeiro-na-prtica/64948704', 'https://novaescola.org.br/planos-de-aula/temas/educacao-financeira', 'Planejamento Financeiro: Preparando os Alunos para o Futuro', 'Ensine aos seus alunos a importância do planejamento financeiro pessoal. Esta aula abordará tópicos como orçamento, economia, investimento e gestão de dívidas. Os alunos sairão com uma compreensão sólida de como gerenciar suas finanças e tomar decisões fi', '2024-05-29 15:38:26', 0, 0, 10, 6, 3),
(5, 2, ' Apresentação \"Explorando o Futuro Digital\"', 'Plano de aula para tecnologia e inovação', 'Explorando o Futuro Digital: Desenvolvendo Habilidades Tecnológicas', ' Prepare seus alunos para o mundo digital em constante mudança com esta aula sobre tecnologia e inovação. Eles explorarão tópicos como programação, inteligência artificial, realidade virtual e ética digital. Esta é uma oportunidade para os alunos desenvol', '2024-05-29 15:38:57', 0, 0, 16, 4, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `activity_team`
--

DROP TABLE IF EXISTS `activity_team`;
CREATE TABLE IF NOT EXISTS `activity_team` (
  `idActivityTeam` int NOT NULL AUTO_INCREMENT,
  `idTeam` int DEFAULT NULL,
  `idTeacher` int DEFAULT NULL,
  `descriptionActivityTeam` text COLLATE utf32_unicode_ci,
  `fileName` varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
  `path` varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
  `fileType` varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
  `fileSize` bigint DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  PRIMARY KEY (`idActivityTeam`),
  KEY `id_equipa` (`idTeam`),
  KEY `equipa_atividades_ibfk_2` (`idTeacher`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Дамп данных таблицы `activity_team`
--

INSERT INTO `activity_team` (`idActivityTeam`, `idTeam`, `idTeacher`, `descriptionActivityTeam`, `fileName`, `path`, `fileType`, `fileSize`, `CreateDate`) VALUES
(1, 14, 1, '<p>Reactivate the token on 7d <a href=\"https://developers.google.com/oauthplayground/?code=4/0AeaYSHB9jAvLdm6uFaeAYuky2L_Qb8jPLXNbZxKgvomlqmzZjskZA2osAn9J4UGSZWQmKw&amp;scope=https://mail.google.com/\" rel=\"noopener noreferrer\" target=\"_blank\">Token</a></p><p><br></p><p>About this documentation</p><p><a href=\"https://nodejs.org/api/documentation.html#about-this-documentation\" rel=\"noopener noreferrer\" target=\"_blank\">#</a></p><p>Welcome to the official API reference documentation for Node.js!</p><p>Node.js is a JavaScript runtime built on the&nbsp;<a href=\"https://v8.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">V8 JavaScript engine</a>.</p><p>Contributing</p><p><a href=\"https://nodejs.org/api/documentation.html#contributing\" rel=\"noopener noreferrer\" target=\"_blank\">#</a></p><p>Report errors in this documentation in&nbsp;<a href=\"https://github.com/nodejs/node/issues/new\" rel=\"noopener noreferrer\" target=\"_blank\">the issue tracker</a>. See&nbsp;<a href=\"https://github.com/nodejs/node/blob/HEAD/CONTRIBUTING.md\" rel=\"noopener noreferrer\" target=\"_blank\">the contributing guide</a>&nbsp;for directions on how to submit pull requests.</p><p>Stability index</p><p><a href=\"https://nodejs.org/api/documentation.html#stability-index\" rel=\"noopener noreferrer\" target=\"_blank\">#</a></p><p>Throughout the documentation are indications of a section\'s stability. Some APIs are so proven and so relied upon that they are unlikely to ever change at all. Others are brand new and experimental, or known to be hazardous.</p><p>The stability indexes are as follows:</p><p>Stability: 0 - Deprecated. The feature may emit warnings. Backward compatibility is not guaranteed.</p><p>Stability: 1 - Experimental. The feature is not subject to&nbsp;<a href=\"https://semver.org/\" rel=\"noopener noreferrer\" target=\"_blank\">semantic versioning</a>&nbsp;rules. Non-backward compatible changes or removal may occur in any future release. Use of the feature is not recommended in production environments.</p><p>Experimental features are subdivided into stages:</p><ul><li>1.0 - Early development. Experimental features at this stage are unfinished and subject to substantial change.</li><li>1.1 - Active development. Experimental features at this stage are nearing minimum viability.</li><li>1.2 - Release candidate. Experimental features at this stage are hopefully ready to become stable. No further breaking changes are anticipated but may still occur in response to user feedback. We encourage user testing and feedback so that we can know that this feature is ready to be marked as stable.</li></ul><p>Stability: 2 - Stable. Compatibility with the npm ecosystem is a high priority.</p><p>Stability: 3 - Legacy. Although this feature is unlikely to be removed and is still covered by semantic versioning guarantees, it is no longer actively maintained, and other alternatives are available.</p><p>Features are marked as legacy rather than being deprecated if their use does no harm, and they are widely relied upon within the npm ecosystem. Bugs found in legacy features are unlikely to be fixed.</p><p>Use caution when making use of Experimental features, particularly when authoring libraries. Users may not be aware that experimental features are being used. Bugs or behavior changes may surprise users when Experimental API modifications occur. To avoid surprises, use of an Experimental feature may need a command-line flag. Experimental features may also emit a&nbsp;<a href=\"https://nodejs.org/api/process.html#event-warning\" rel=\"noopener noreferrer\" target=\"_blank\">warning</a>.</p><p>Stability overview</p><p><a href=\"https://nodejs.org/api/documentation.html#stability-overview\" rel=\"noopener noreferrer\" target=\"_blank\">#</a></p><p>APIStability<a href=\"https://nodejs.org/api/assert.html\" rel=\"noopener noreferrer\" target=\"_blank\">Assert</a>(2) Stable<a href=\"https://nodejs.org/api/async_hooks.html\" rel=\"noopener noreferrer\" target=\"_blank\">Async hooks</a>(1) Experimental<a href=\"https://nodejs.org/api/async_context.html\" rel=\"noopener noreferrer\" target=\"_blank\">Asynchronous context tracking</a>(2) Stable<a href=\"https://nodejs.org/api/buffer.html\" rel=\"noopener noreferrer\" target=\"_blank\">Buffer</a>(2) Stable<a href=\"https://nodejs.org/api/child_process.html\" rel=\"noopener noreferrer\" target=\"_blank\">Child process</a>(2) Stable<a href=\"https://nodejs.org/api/cluster.html\" rel=\"noopener noreferrer\" target=\"_blank\">Cluster</a>(2) Stable<a href=\"https://nodejs.org/api/console.html\" rel=\"noopener noreferrer\" target=\"_blank\">Console</a>(2) Stable<a href=\"https://nodejs.org/api/crypto.html\" rel=\"noopener noreferrer\" target=\"_blank\">Crypto</a>(2) Stable<a href=\"https://nodejs.org/api/diagnostics_channel.html\" rel=\"noopener noreferrer\" target=\"_blank\">Diagnostics Channel</a>(2) Stable<a href=\"https://nodejs.org/api/dns.html\" rel=\"noopener noreferrer\" target=\"_blank\">DNS</a>(2) Stable<a href=\"https://nodejs.org/api/domain.html\" rel=\"noopener noreferrer\" target=\"_blank\">Domain</a>(0) Deprecated<a href=\"https://nodejs.org/api/fs.html\" rel=\"noopener noreferrer\" target=\"_blank\">File system</a>(2) Stable<a href=\"https://nodejs.org/api/http.html\" rel=\"noopener noreferrer\" target=\"_blank\">HTTP</a>(2) Stable<a href=\"https://nodejs.org/api/http2.html\" rel=\"noopener noreferrer\" target=\"_blank\">HTTP/2</a>(2) Stable<a href=\"https://nodejs.org/api/https.html\" rel=\"noopener noreferrer\" target=\"_blank\">HTTPS</a>(2) Stable<a href=\"https://nodejs.org/api/inspector.html\" rel=\"noopener noreferrer\" target=\"_blank\">Inspector</a>(2) Stable<a href=\"https://nodejs.org/api/module.html\" rel=\"noopener noreferrer\" target=\"_blank\">Modules:&nbsp;node:module&nbsp;API</a>(1) .2 - Release candidate<a href=\"https://nodejs.org/api/modules.html\" rel=\"noopener noreferrer\" target=\"_blank\">Modules: CommonJS modules</a>(2) Stable<a href=\"https://nodejs.org/api/os.html\" rel=\"noopener noreferrer\" target=\"_blank\">OS</a>(2) Stable<a href=\"https://nodejs.org/api/path.html\" rel=\"noopener noreferrer\" target=\"_blank\">Path</a>(2) Stable<a href=\"https://nodejs.org/api/perf_hooks.html\" rel=\"noopener noreferrer\" target=\"_blank\">Performance measurement APIs</a>(2) Stable<a href=\"https://nodejs.org/api/punycode.html\" rel=\"noopener noreferrer\" target=\"_blank\">Punycode</a>(0) Deprecated<a href=\"https://nodejs.org/api/querystring.html\" rel=\"noopener noreferrer\" target=\"_blank\">Query string</a>(2) Stable<a href=\"https://nodejs.org/api/readline.html\" rel=\"noopener noreferrer\" target=\"_blank\">Readline</a>(2) Stable<a href=\"https://nodejs.org/api/repl.html\" rel=\"noopener noreferrer\" target=\"_blank\">REPL</a>(2) Stable<a href=\"https://nodejs.org/api/single-executable-applications.html\" rel=\"noopener noreferrer\" target=\"_blank\">Single executable applications</a>(1) .1 - Active development<a href=\"https://nodejs.org/api/stream.html\" rel=\"noopener noreferrer\" target=\"_blank\">Stream</a>(2) Stable<a href=\"https://nodejs.org/api/string_decoder.html\" rel=\"noopener noreferrer\" target=\"_blank\">String decoder</a>(2) Stable<a href=\"https://nodejs.org/api/test.html\" rel=\"noopener noreferrer\" target=\"_blank\">Test runner</a>(2) Stable<a href=\"https://nodejs.org/api/timers.html\" rel=\"noopener noreferrer\" target=\"_blank\">Timers</a>(2) Stable<a href=\"https://nodejs.org/api/tls.html\" rel=\"noopener noreferrer\" target=\"_blank\">TLS (SSL)</a>(2) Stable<a href=\"https://nodejs.org/api/tracing.html\" rel=\"noopener noreferrer\" target=\"_blank\">Trace events</a>(1) Experimental<a href=\"https://nodejs.org/api/tty.html\" rel=\"noopener noreferrer\" target=\"_blank\">TTY</a>(2) Stable<a href=\"https://nodejs.org/api/dgram.html\" rel=\"noopener noreferrer\" target=\"_blank\">UDP/datagram sockets</a>(2) Stable<a href=\"https://nodejs.org/api/url.html\" rel=\"noopener noreferrer\" target=\"_blank\">URL</a>(2) Stable<a href=\"https://nodejs.org/api/util.html\" rel=\"noopener noreferrer\" target=\"_blank\">Util</a>(2) Stable<a href=\"https://nodejs.org/api/vm.html\" rel=\"noopener noreferrer\" target=\"_blank\">VM (executing JavaScript)</a>(2) Stable<a href=\"https://nodejs.org/api/webcrypto.html\" rel=\"noopener noreferrer\" target=\"_blank\">Web Crypto API</a>(2) Stable<a href=\"https://nodejs.org/api/webstreams.html\" rel=\"noopener noreferrer\" target=\"_blank\">Web Streams API</a>(2) Stable<a href=\"https://nodejs.org/api/wasi.html\" rel=\"noopener noreferrer\" target=\"_blank\">WebAssembly System Interface (WASI)</a>(1) Experimental<a href=\"https://nodejs.org/api/worker_threads.html\" rel=\"noopener noreferrer\" target=\"_blank\">Worker threads</a>(2) Stable<a href=\"https://nodejs.org/api/zlib.html\" rel=\"noopener noreferrer\" target=\"_blank\">Zlib</a>(2) Stable</p><p>JSON output</p><p><a href=\"https://nodejs.org/api/documentation.html#json-output\" rel=\"noopener noreferrer\" target=\"_blank\">#</a></p><p>Added in: v0.6.12</p><p>Every&nbsp;.html&nbsp;document has a corresponding&nbsp;.json&nbsp;document. This is for IDEs and other utilities that consume the documentation.</p><p>System calls and man pages</p><p><a href=\"https://nodejs.org/api/documentation.html#system-calls-and-man-pages\" rel=\"noopener noreferrer\" target=\"_blank\">#</a></p><p>Node.js functions which wrap a system call will document that. The docs link to the corresponding man pages which describe how the system call works.</p>', NULL, NULL, NULL, NULL, '2024-05-29 15:43:07'),
(2, 15, 5, '<p>Temos o prazer de o acolher na nossa equipa de programadores web talentosos. As suas competências e experiência serão um contributo inestimável para os nossos projectos e ajudar-nos-ão a alcançar novos patamares.</p><p><br></p><p><strong>A nossa equipa</strong></p><p>Somos um grupo de profissionais apaixonados, unidos por um objetivo comum de construir aplicações Web de alta qualidade, intuitivas e funcionais. Valorizamos o trabalho em equipa, a partilha de conhecimentos e a procura constante de melhorias.</p><p><br></p><p><strong>As nossas expectativas</strong></p><p>Como parte da nossa equipa, esperamos de si</p><p><br></p><p>Profissionalismo e Responsabilidade: Liderar projectos com atenção aos detalhes e cumprir prazos.</p><p>Criatividade: Gerar novas ideias e soluções para melhorar os nossos produtos.</p><ol><li>Trabalho de equipa: Participar ativamente nas discussões e trabalhar em estreita colaboração com os outros membros da equipa.</li><li>Aprendizagem contínua: Desenvolver continuamente as suas competências e aprender novas tecnologias.</li></ol><p><strong>O que oferecemos</strong></p><p>Em troca, oferecemos-lhe:</p><p><br></p><p>Projectos interessantes: Participar no desenvolvimento de projectos diversos e interessantes que o desafiam e o ajudam a crescer.</p><p><br></p><p>Atmosfera amigável: Trabalhar num ambiente de apoio e inspirador onde todas as contribuições são valorizadas.</p><p>Oportunidades de crescimento: Formação, workshops e acesso a recursos para o ajudar a desenvolver-se profissionalmente.</p><p>Horário flexível: A possibilidade de adaptar o seu horário de trabalho às suas necessidades pessoais.</p><p>Os nossos valores</p>', NULL, NULL, NULL, NULL, '2024-06-06 20:04:45');

-- --------------------------------------------------------

--
-- Структура таблицы `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idActivity` int NOT NULL,
  `idTeacher` int NOT NULL,
  `content` text COLLATE utf8mb3_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idActivity` (`idActivity`),
  KEY `idTeacher` (`idTeacher`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `comments`
--

INSERT INTO `comments` (`id`, `idActivity`, `idTeacher`, `content`, `created_at`, `updated_at`) VALUES
(1, 5, 1, '<p>Hi world</p>', '2024-05-29 18:27:57', '2024-05-29 18:27:57'),
(2, 5, 1, '<p>12</p>', '2024-05-29 18:31:34', '2024-05-29 18:31:34'),
(3, 4, 1, '<p><strong><em><u>Hi World!</u></em></strong></p>', '2024-06-10 13:44:08', '2024-06-10 13:44:08');

-- --------------------------------------------------------

--
-- Структура таблицы `educations`
--

DROP TABLE IF EXISTS `educations`;
CREATE TABLE IF NOT EXISTS `educations` (
  `idEducation` int NOT NULL AUTO_INCREMENT,
  `nameEducation` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
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
  `idGroup` int NOT NULL AUTO_INCREMENT,
  `codGroup` int DEFAULT NULL,
  `nameGroup` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idGroup`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

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
  `title` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `link` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `fileName` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `path` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `fileType` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `fileSize` bigint DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `publishDate` datetime DEFAULT NULL,
  PRIMARY KEY (`idResource`),
  KEY `id_professor` (`idTeacher`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `resources`
--

INSERT INTO `resources` (`idResource`, `idTeacher`, `title`, `description`, `link`, `fileName`, `path`, `fileType`, `fileSize`, `type`, `publishDate`) VALUES
(1, 1, 'The old database', 'Description', NULL, 'pepp (5).sql', 'C:\\TeamTeach\\WebSite\\backend\\uploads\\pepp (5).sql', 'application/x-sql', 242070, 'Ficheiro', '2024-05-29 15:45:54'),
(2, 1, 'Hi wrold', '`', NULL, 'pepp 3.7.sql', 'C:\\TeamTeach\\WebSite\\backend\\uploads\\pepp 3.7.sql', 'application/x-sql', 173467, NULL, '2024-06-02 15:13:55'),
(3, 1, '123213123', '123133321', 'https://www.youtube.com/watch?v=Q3tN73Jfg_o', NULL, NULL, NULL, NULL, 'Video', '2024-06-02 15:26:29'),
(4, 1, '123321', '123123213', NULL, NULL, NULL, NULL, NULL, 'Qualquer', '2024-06-05 12:44:32'),
(5, 1, '123213', '123123', 'adssadads', NULL, NULL, NULL, NULL, 'Qualquer', '2024-06-05 12:48:30');

-- --------------------------------------------------------

--
-- Структура таблицы `schools`
--

DROP TABLE IF EXISTS `schools`;
CREATE TABLE IF NOT EXISTS `schools` (
  `idSchool` int NOT NULL AUTO_INCREMENT,
  `nameSchool` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
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
  `nameSubject` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
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
  `nameTeam` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `descriptionTeam` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `areasWork` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `privacy` int DEFAULT '0',
  PRIMARY KEY (`idTeam`),
  KEY `fk_id_professor` (`idTeacher`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `teams`
--

INSERT INTO `teams` (`idTeam`, `idTeacher`, `nameTeam`, `descriptionTeam`, `areasWork`, `CreateDate`, `privacy`) VALUES
(14, 1, 'XYZ', 'Somos uma equipa de entusiastas que está pronta para criar algo novo e conquistar o topo!', 'XYZ', '2024-05-29 15:40:48', 0),
(15, 5, 'TestDrive', 'Somos uma equipa de entusiastas que está pronta para criar algo novo e conquistar o topo!', 'Web Developer', '2024-06-06 20:01:45', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `team_list`
--

DROP TABLE IF EXISTS `team_list`;
CREATE TABLE IF NOT EXISTS `team_list` (
  `idTeamList` int NOT NULL AUTO_INCREMENT,
  `idTeam` int DEFAULT NULL,
  `idTeacher` int DEFAULT NULL,
  `access` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT 'guest',
  PRIMARY KEY (`idTeamList`),
  KEY `id_equipa` (`idTeam`),
  KEY `id_professor` (`idTeacher`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `team_list`
--

INSERT INTO `team_list` (`idTeamList`, `idTeam`, `idTeacher`, `access`) VALUES
(1, 14, 1, 'Administrador'),
(2, 14, 2, 'Administrador'),
(3, 15, 5, 'Administrador'),
(4, 15, 1, 'Convidado');

-- --------------------------------------------------------

--
-- Структура таблицы `tools`
--

DROP TABLE IF EXISTS `tools`;
CREATE TABLE IF NOT EXISTS `tools` (
  `idTool` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `link` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `about` text COLLATE utf8mb3_unicode_ci,
  `application` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idTool`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `tools`
--

INSERT INTO `tools` (`idTool`, `title`, `link`, `about`, `application`, `type`, `state`) VALUES
(1, 'Word', 'https://www.office.com/launch/word', 'Word allows you to create professionally designed documents such as CVs, letters, reports and much more. It is widely used in office environments and for educational purposes.', 'Redes sociais e plataformas de ligação em rede', 'Apresentações e documentos', 'Está a funcionar'),
(2, 'PowerPoint', 'https://www.office.com/launch/PowerPoint', 'Create informative slideshows or unusual presentations and express your ideas with Microsoft PowerPoint.', 'Redes sociais e plataformas de ligação em rede', 'Apresentações e documentos', 'Está a funcionar'),
(3, 'Canva', 'https://www.canva.com', 'A graphic design platform used to create social media graphics, presentations, posters, documents and other visual content.', 'Design gráfico e edição de imagens', 'Design gráfico e edição de imagens', 'Está a funcionar'),
(4, 'Figma', 'https://www.figma.com', 'A web-based UI/UX design tool, known for its real-time collaboration capabilities.', 'Colaboração em linha e gestão de projectos', 'Design gráfico e edição de imagens', 'Está a funcionar'),
(5, 'Google Drive', 'https://www.google.com/drive/', 'A file storage and synchronization service created by Google.', 'Computação em nuvem e armazenamento de dados', 'Apresentações e documentos', 'Está a funcionar'),
(6, 'Trello', 'https://trello.com', 'A collaboration tool that organizes your projects into boards.', 'Colaboração em linha e gestão de projectos', 'Colaboração em linha e gestão de projectos', 'Está a funcionar'),
(7, 'Zoom', 'https://zoom.us', 'A cloud-based video conferencing service used for virtual meetings.', 'Educação e formação em linha', 'Colaboração em linha e gestão de projectos', 'Está a funcionar'),
(8, 'Slack', 'https://slack.com', 'A messaging app for teams that brings all your communication together.', 'Colaboração em linha e gestão de projectos', 'Colaboração em linha e gestão de projectos', 'Está a funcionar'),
(9, 'Dropbox', 'https://www.dropbox.com', 'A cloud storage service that lets you save files online and sync them to your devices.', 'Computação em nuvem e armazenamento de dados', 'Apresentações e documentos', 'Está a funcionar'),
(10, 'Notion', 'https://www.notion.so', 'An all-in-one workspace where you can write, plan, collaborate, and get organized.', 'Colaboração em linha e gestão de projectos', 'Apresentações e documentos', 'Está a funcionar'),
(11, 'Asana', 'https://asana.com', 'A web and mobile application designed to help teams organize, track, and manage their work.', 'Colaboração em linha e gestão de projectos', 'Colaboração em linha e gestão de projectos', 'Está a funcionar'),
(12, 'Airtable', 'https://airtable.com', 'A cloud collaboration service that is a hybrid of a spreadsheet and a database.', 'Computação em nuvem e armazenamento de dados', 'Colaboração em linha e gestão de projectos', 'Está a funcionar'),
(13, 'Microsoft Teams', 'https://www.microsoft.com/en-us/microsoft-teams/group-chat-software', 'A collaboration app that helps your team stay organized and has conversations all in one place.', 'Colaboração em linha e gestão de projectos', 'Colaboração em linha e gestão de projectos', 'Está a funcionar'),
(14, 'Adobe Photoshop', 'https://www.adobe.com/products/photoshop.html', 'A software for photo editing and graphic design.', 'Design gráfico e edição de imagens', 'Design gráfico e edição de imagens', 'Está a funcionar'),
(15, 'InVision', 'https://www.invisionapp.com', 'A digital product design platform powering the world’s best user experiences.', 'Colaboração em linha e gestão de projectos', 'Design gráfico e edição de imagens', 'Está a funcionar'),
(16, 'Basecamp', 'https://basecamp.com', 'A project management tool that helps you keep track of tasks, deadlines, files, discussions, and more.', 'Colaboração em linha e gestão de projectos', 'Colaboração em linha e gestão de projectos', 'Está a funcionar'),
(17, 'Jira', 'https://www.atlassian.com/software/jira', 'A tool developed by Atlassian for bug tracking, issue tracking, and project management.', 'Colaboração em linha e gestão de projectos', 'Colaboração em linha e gestão de projectos', 'Está a funcionar'),
(18, 'Evernote', 'https://evernote.com', 'An app designed for note taking, organizing, task management, and archiving.', 'Colaboração em linha e gestão de projectos', 'Apresentações e documentos', 'Está a funcionar'),
(19, 'Google Docs', 'https://docs.google.com', 'A web-based word processor in which documents can be created, edited, and stored online.', 'Educação e formação em linha', 'Apresentações e documentos', 'Está a funcionar'),
(20, 'Hootsuite', 'https://hootsuite.com', 'A social media management platform that allows you to schedule posts, track social media engagement, and analyze results.', 'Redes sociais e plataformas de ligação em rede', 'Redes sociais e plataformas de ligação em rede', 'Está a funcionar'),
(21, 'Buffer', 'https://buffer.com', 'A software application for the web and mobile, designed to manage accounts in social networks.', 'Redes sociais e plataformas de ligação em rede', 'Redes sociais e plataformas de ligação em rede', 'Está a funcionar'),
(22, 'Loom', 'https://www.loom.com', 'A video messaging tool that helps you get your message across through instantly shareable videos.', 'Educação e formação em linha', 'Vídeo e montagem', 'Está a funcionar'),
(23, 'Grammarly', 'https://www.grammarly.com', 'An AI-powered writing assistant that helps people with spelling, grammar, and more.', 'Educação e formação em linha', 'Apresentações e documentos', 'Está a funcionar'),
(25, 'Prezi', 'https://prezi.com', 'A presentation software that uses motion, zoom, and spatial relationships to bring your ideas to life and make you a great presenter.', 'Educação e formação em linha', 'Apresentações e documentos', 'Está a funcionar'),
(26, 'Miro', 'https://miro.com', 'A collaborative online whiteboard platform designed for remote and distributed teams.', 'Colaboração em linha e gestão de projectos', 'Colaboração em linha e gestão de projectos', 'Está a funcionar'),
(27, 'SoundCloud', 'https://soundcloud.com', 'An online audio distribution platform and music sharing website.', 'Áudio e Podcasting', 'Áudio e Podcasting', 'Está a funcionar'),
(28, 'Toggl', 'https://toggl.com', 'A time tracking app that allows you to track your time spent on various projects and analyze productivity.', 'Colaboração em linha e gestão de projectos', 'Colaboração em linha e gestão de projectos', 'Está a funcionar'),
(29, 'ClickUp', 'https://clickup.com', 'An all-in-one productivity platform to manage tasks, docs, goals, and teams.', 'Colaboração em linha e gestão de projectos', 'Colaboração em linha e gestão de projectos', 'Está a funcionar'),
(30, 'Sketch', 'https://www.sketch.com', 'A digital design toolkit for app prototyping and collaboration.', 'Design gráfico e edição de imagens', 'Design gráfico e edição de imagens', 'Está a funcionar'),
(31, 'Bitbucket', 'https://bitbucket.org', 'A Git repository management solution designed for professional teams.', 'Colaboração em linha e gestão de projectos', 'Colaboração em linha e gestão de projectos', 'Está a funcionar'),
(32, 'GitHub', 'https://github.com', 'A provider of Internet hosting for software development and version control using Git.', 'Colaboração em linha e gestão de projectos', 'Colaboração em linha e gestão de projectos', 'Está a funcionar'),
(33, 'Quip', 'https://quip.com', 'A collaborative productivity software suite for mobile and the Web.', 'Colaboração em linha e gestão de projectos', 'Apresentações e documentos', 'Está a funcionar'),
(34, 'SurveyMonkey', 'https://www.surveymonkey.com', 'A cloud-based software that allows you to create, send and analyze surveys.', 'Educação e formação em linha', 'Apresentações e documentos', 'Está a funcionar'),
(35, 'Typeform', 'https://www.typeform.com', 'A web-based platform for collecting and sharing information in conversational, human ways.', 'Educação e formação em linha', 'Apresentações e documentos', 'Está a funcionar'),
(36, 'Zendesk', 'https://www.zendesk.com', 'A customer service software and support ticketing system.', 'Colaboração em linha e gestão de projectos', 'Colaboração em linha e gestão de projectos', 'Está a funcionar'),
(37, 'Salesforce', 'https://www.salesforce.com', 'A cloud-based software company providing customer relationship management service.', 'Colaboração em linha e gestão de projectos', 'Colaboração em linha e gestão de projectos', 'Está a funcionar'),
(38, 'Mailchimp', 'https://mailchimp.com', 'A marketing automation platform and email marketing service.', 'Redes sociais e plataformas de ligação em rede', 'Redes sociais e plataformas de ligação em rede', 'Está a funcionar'),
(40, 'HubSpot', 'https://www.hubspot.com', 'A CRM platform that provides software and support to help businesses grow.', 'Colaboração em linha e gestão de projectos', 'Colaboração em linha e gestão de projectos', 'Está a funcionar'),
(41, 'Monday.com', 'https://monday.com', 'A Work OS that powers teams to run projects and workflows with confidence.', 'Colaboração em linha e gestão de projectos', 'Colaboração em linha e gestão de projectos', 'Está a funcionar'),
(42, 'WeTransfer', 'https://wetransfer.com', 'A cloud-based file transfer service.', 'Computação em nuvem e armazenamento de dados', 'Computação em nuvem e armazenamento de dados', 'Está a funcionar'),
(43, 'Dropbox Paper', 'https://www.dropbox.com/paper', 'A collaborative document-editing service developed by Dropbox.', 'Colaboração em linha e gestão de projectos', 'Apresentações e documentos', 'Está a funcionar'),
(45, 'Confluence', 'https://www.atlassian.com/software/confluence', 'A collaboration tool used to help teams collaborate and share knowledge efficiently.', 'Colaboração em linha e gestão de projectos', 'Colaboração em linha e gestão de projectos', 'Está a funcionar'),
(46, 'Lucidchart', 'https://www.lucidchart.com', 'An intelligent diagramming application that brings teams together to make better decisions and build the future.', 'Colaboração em linha e gestão de projectos', 'Design gráfico e edição de imagens', 'Está a funcionar'),
(47, 'ZoomInfo', 'https://www.zoominfo.com', 'A subscription-based software as a service (SaaS) company that sells access to its database of information about business people and companies.', 'Redes sociais e plataformas de ligação em rede', 'Redes sociais e plataformas de ligação em rede', 'Está a funcionar'),
(49, 'WordPress', 'https://wordpress.org', 'A free and open-source content management system (CMS) written in PHP and paired with a MySQL or MariaDB database.', 'Educação e formação em linha', 'Apresentações e documentos', 'Está a funcionar'),
(50, 'Medium', 'https://medium.com', 'An online publishing platform developed by Evan Williams, and launched in August 2012.', 'Educação e formação em linha', 'Apresentações e documentos', 'Está a funcionar'),
(51, 'Squarespace', 'https://squarespace.com', 'A website building and hosting service which allows users to create and manage their own websites.', 'Educação e formação em linha', 'Apresentações e documentos', 'Está a funcionar'),
(52, 'Wix', 'https://wix.com', 'A cloud-based web development platform that allows users to create HTML5 websites and mobile sites through the use of online drag and drop tools.', 'Educação e formação em linha', 'Apresentações e documentos', 'Está a funcionar'),
(53, 'Adobe Illustrator', 'https://www.adobe.com/products/illustrator.html', 'A vector graphics editor and design program developed and marketed by Adobe Inc.', 'Design gráfico e edição de imagens', 'Design gráfico e edição de imagens', 'Está a funcionar'),
(54, 'Affinity Designer', 'https://affinity.serif.com/en-us/designer/', 'A vector graphics editor developed by Serif for macOS, iOS, and Microsoft Windows.', 'Design gráfico e edição de imagens', 'Design gráfico e edição de imagens', 'Está a funcionar'),
(55, 'Inkscape', 'https://inkscape.org', 'A free and open-source vector graphics editor used to create vector images, primarily in Scalable Vector Graphics (SVG) format.', 'Design gráfico e edição de imagens', 'Design gráfico e edição de imagens', 'Está a funcionar'),
(56, 'Krita', 'https://krita.org', 'A free and open-source raster graphics editor designed primarily for digital painting and animation purposes.', 'Design gráfico e edição de imagens', 'Design gráfico e edição de imagens', 'Está a funcionar'),
(57, 'Blender', 'https://blender.org', 'A free and open-source 3D computer graphics software toolset used for creating animated films, visual effects, art, 3D-printed models, motion graphics, and more.', 'Design gráfico e edição de imagens', 'Vídeo e montagem', 'Está a funcionar'),
(58, 'Maya', 'https://www.autodesk.com/products/maya/overview', 'A 3D computer graphics application that runs on Windows, macOS and Linux, originally developed by Alias Systems Corporation and currently owned and developed by Autodesk, Inc.', 'Design gráfico e edição de imagens', 'Vídeo e montagem', 'Está a funcionar'),
(59, 'Cinema 4D', 'https://www.maxon.net/en/cinema-4d', 'A 3D software suite developed by the German company Maxon.', 'Design gráfico e edição de imagens', 'Vídeo e montagem', 'Está a funcionar'),
(60, 'Tinkercad', 'https://www.tinkercad.com', 'A free, online 3D modeling and CAD tool designed for beginners.', 'Educação e formação em linha', 'Design gráfico e edição de imagens', 'Está a funcionar'),
(61, 'SketchUp', 'https://www.sketchup.com', 'A 3D modeling computer program for a wide range of drawing applications such as architectural, interior design, landscape architecture, civil and mechanical engineering, film, and video game design.', 'Educação e formação em linha', 'Design gráfico e edição de imagens', 'Está a funcionar'),
(62, 'Procreate', 'https://procreate.art', 'A raster graphics editor app for digital painting developed and published by Savage Interactive for iOS and iPadOS.', 'Design gráfico e edição de imagens', 'Design gráfico e edição de imagens', 'Está a funcionar'),
(63, 'ArtRage', 'https://www.artrage.com', 'A bitmap graphics editor for digital painting created by Ambient Design Ltd.', 'Design gráfico e edição de imagens', 'Design gráfico e edição de imagens', 'Está a funcionar'),
(64, 'GarageBand', 'https://www.apple.com/mac/garageband/', 'A line of digital audio workstations for macOS and iOS devices that allows users to create music or podcasts.', 'Áudio e Podcasting', 'Áudio e Podcasting', 'Está a funcionar'),
(65, 'Ableton Live', 'https://www.ableton.com/en/live/', 'A digital audio workstation for macOS and Windows developed by Ableton.', 'Áudio e Podcasting', 'Áudio e Podcasting', 'Está a funcionar'),
(66, 'FL Studio', 'https://www.image-line.com/flstudio/', 'A digital audio workstation developed by the Belgian company Image-Line.', 'Áudio e Podcasting', 'Áudio e Podcasting', 'Está a funcionar'),
(67, 'Logic Pro', 'https://www.apple.com/logic-pro/', 'A digital audio workstation and MIDI sequencer software application for the macOS platform.', 'Áudio e Podcasting', 'Áudio e Podcasting', 'Está a funcionar'),
(68, 'Pro Tools', 'https://www.avid.com/pro-tools', 'A digital audio workstation developed and released by Avid Technology for Microsoft Windows and macOS which can be used for a wide range of sound recording and sound production purposes.', 'Áudio e Podcasting', 'Áudio e Podcasting', 'Está a funcionar'),
(69, 'Reaper', 'https://www.reaper.fm', 'A digital audio production application for Windows and macOS, offering multitrack audio and MIDI recording, editing, processing, mixing, and mastering toolset.', 'Áudio e Podcasting', 'Áudio e Podcasting', 'Está a funcionar'),
(70, 'Cubase', 'https://new.steinberg.net/cubase/', 'A digital audio workstation developed by Steinberg for music and MIDI recording, arranging, and editing.', 'Áudio e Podcasting', 'Áudio e Podcasting', 'Está a funcionar'),
(71, 'Audacity', 'https://www.audacityteam.org', 'A free and open-source digital audio editor and recording application software.', 'Áudio e Podcasting', 'Áudio e Podcasting', 'Está a funcionar'),
(72, 'DaVinci Resolve', 'https://www.blackmagicdesign.com/products/davinciresolve/', 'A color correction and non-linear video editing application for macOS, Windows, and Linux, originally developed by da Vinci Systems, and now developed by Blackmagic Design.', 'Vídeo e montagem', 'Vídeo e montagem', 'Está a funcionar'),
(73, 'Final Cut Pro', 'https://www.apple.com/final-cut-pro/', 'A series of non-linear video editing software programs first developed by Macromedia Inc. and later Apple Inc.', 'Vídeo e montagem', 'Vídeo e montagem', 'Está a funcionar'),
(74, 'Adobe Premiere Pro', 'https://www.adobe.com/products/premiere.html', 'A timeline-based and non-linear video editing software application developed by Adobe Inc.', 'Vídeo e montagem', 'Vídeo e montagem', 'Está a funcionar'),
(75, 'iMovie', 'https://www.apple.com/imovie/', 'A video editing software application developed by Apple Inc. for macOS and iOS devices.', 'Vídeo e montagem', 'Vídeo e montagem', 'Está a funcionar'),
(76, 'Sony Vegas', 'https://www.vegascreativesoftware.com/us/vegas-pro/', 'A video editing software package for non-linear editing (NLE) originally published by Sonic Foundry, then by Sony Creative Software, and now by Magix.', 'Vídeo e montagem', 'Vídeo e montagem', 'Está a funcionar'),
(77, 'HitFilm Express', 'https://fxhome.com/product/hitfilm-express', 'A free video editing and visual effects software with professional-grade VFX tools and everything you need to make awesome content, films, or gaming videos.', 'Vídeo e montagem', 'Vídeo e montagem', 'Está a funcionar'),
(78, 'Camtasia', 'https://www.techsmith.com/video-editor.html', 'A software suite, created and published by TechSmith, for creating video tutorials and presentations directly via screencast, or via a direct recording plug-in to Microsoft PowerPoint.', 'Educação e formação em linha', 'Vídeo e montagem', 'Está a funcionar'),
(79, 'OBS Studio', 'https://obsproject.com', 'A free and open-source software for video recording and live streaming.', 'Educação e formação em linha', 'Vídeo e montagem', 'Está a funcionar'),
(80, 'Screencast-O-Matic', 'https://screencast-o-matic.com', 'A simple and intuitive screen recorder and video editor tool.', 'Educação e formação em linha', 'Vídeo e montagem', 'Está a funcionar'),
(82, 'Cisco Webex', 'https://www.webex.com', 'A video conferencing and online meeting software.', 'Educação e formação em linha', 'Colaboração em linha e gestão de projectos', 'Está a funcionar'),
(84, 'Google Meet', 'https://meet.google.com', 'A video-communication service developed by Google.', 'Educação e formação em linha', 'Colaboração em linha e gestão de projectos', 'Está a funcionar'),
(85, 'GoToMeeting', 'https://www.gotomeeting.com', 'A web-hosted service created and marketed by LogMeIn.', 'Educação e formação em linha', 'Colaboração em linha e gestão de projectos', 'Está a funcionar'),
(86, 'BlueJeans', 'https://www.bluejeans.com', 'A company that provides an interoperable cloud-based video conferencing service.', 'Educação e formação em linha', 'Colaboração em linha e gestão de projectos', 'Está a funcionar'),
(87, 'Whereby', 'https://whereby.com', 'A flexible work video meeting tool.', 'Educação e formação em linha', 'Colaboração em linha e gestão de projectos', 'Está a funcionar'),
(88, 'Jitsi Meet', 'https://meet.jit.si', 'A free and open-source multiplatform voice (VoIP), videoconferencing and instant messaging application.', 'Educação e formação em linha', 'Colaboração em linha e gestão de projectos', 'Está a funcionar'),
(89, 'Mural', 'https://mural.co', 'A digital workspace for visual collaboration.', 'Colaboração em linha e gestão de projectos', 'Colaboração em linha e gestão de projectos', 'Está a funcionar'),
(91, 'Stormboard', 'https://stormboard.com', 'A shared workspace for brainstorming, collaboration and innovation.', 'Colaboração em linha e gestão de projectos', 'Colaboração em linha e gestão de projectos', 'Está a funcionar'),
(92, 'Milanote', 'https://milanote.com', 'A tool for organizing your creative projects into beautiful visual boards.', 'Colaboração em linha e gestão de projectos', 'Design gráfico e edição de imagens', 'Está a funcionar'),
(93, 'Conceptboard', 'https://conceptboard.com', 'A collaborative online whiteboard used by teams worldwide.', 'Colaboração em linha e gestão de projectos', 'Design gráfico e edição de imagens', 'Está a funcionar');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `idTeacher` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `password` varchar(500) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `resetToken` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `idSchool` int DEFAULT NULL,
  `idGroup` int DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT 'utilizador',
  `СreateDate` datetime DEFAULT NULL,
  PRIMARY KEY (`idTeacher`),
  KEY `id_escola` (`idSchool`),
  KEY `id_grupo` (`idGroup`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`idTeacher`, `name`, `email`, `password`, `resetToken`, `idSchool`, `idGroup`, `role`, `СreateDate`) VALUES
(1, 'Admin', 'admin@gmail.com', '$2b$10$.xhNdktxpHmWj.fvrklWKeU0GHooYYGleQ6KP2lvdy8zfMlynWd9C', NULL, 6, 1, 'administrador', '2024-05-29 15:24:33'),
(2, 'Sofia', 'sofia@gmail.com', '$2b$10$pin6zbD.J75pW1XAgeg4JugoDWTIMmbrmoemgOY6x7NcFGnGG31RW', NULL, 2, 17, 'utilizador', '2024-05-29 15:32:28'),
(3, 'Alexander', 'alex@gmail.com', '$2b$10$sg056VRg/1vghGOgb6qmFeLgMGvz8fnR/.mi5TOSPQsEwosqs2MjO', NULL, 4, 21, 'utilizador', '2024-05-29 15:32:46'),
(4, 'Miguel', 'mig@gmail.com', '$2b$10$BVIc4qqcUnujccy7Wk8KJOc8jBOSIkatgq6/nExbV/rWljXUUouGy', NULL, 2, 14, 'utilizador', '2024-05-30 08:04:32'),
(5, 'Tony', 'tony@gmail.com', '$2b$10$9t4SofRPJD.W/k88qXuTSOV5aP0jU7hLlqai/Mn/jGKQkbVP61u6q', NULL, 2, 16, 'utilizador', '2024-06-06 19:45:01'),
(6, 'Fox Wer', 'mrzerox228@gmail.com', NULL, NULL, 5, 6, 'utilizador', '2024-06-08 11:49:34');

-- --------------------------------------------------------

--
-- Структура таблицы `years`
--

DROP TABLE IF EXISTS `years`;
CREATE TABLE IF NOT EXISTS `years` (
  `idYear` int NOT NULL AUTO_INCREMENT,
  `year` int NOT NULL,
  PRIMARY KEY (`idYear`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `years`
--

INSERT INTO `years` (`idYear`, `year`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10),
(11, 11),
(12, 12);

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `activitys`
--
ALTER TABLE `activitys`
  ADD CONSTRAINT `activitys_ibfk_10` FOREIGN KEY (`idSubject`) REFERENCES `subjects` (`idSubject`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_12` FOREIGN KEY (`idEducation`) REFERENCES `educations` (`idEducation`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_14` FOREIGN KEY (`idSubject`) REFERENCES `subjects` (`idSubject`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_16` FOREIGN KEY (`idEducation`) REFERENCES `educations` (`idEducation`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_18` FOREIGN KEY (`idSubject`) REFERENCES `subjects` (`idSubject`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_2` FOREIGN KEY (`idSubject`) REFERENCES `subjects` (`idSubject`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_20` FOREIGN KEY (`idEducation`) REFERENCES `educations` (`idEducation`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_22` FOREIGN KEY (`idSubject`) REFERENCES `subjects` (`idSubject`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_24` FOREIGN KEY (`idEducation`) REFERENCES `educations` (`idEducation`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_26` FOREIGN KEY (`idSubject`) REFERENCES `subjects` (`idSubject`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_28` FOREIGN KEY (`idEducation`) REFERENCES `educations` (`idEducation`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_30` FOREIGN KEY (`idSubject`) REFERENCES `subjects` (`idSubject`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_32` FOREIGN KEY (`idEducation`) REFERENCES `educations` (`idEducation`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_34` FOREIGN KEY (`idSubject`) REFERENCES `subjects` (`idSubject`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_36` FOREIGN KEY (`idEducation`) REFERENCES `educations` (`idEducation`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_38` FOREIGN KEY (`idSubject`) REFERENCES `subjects` (`idSubject`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_4` FOREIGN KEY (`idEducation`) REFERENCES `educations` (`idEducation`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_40` FOREIGN KEY (`idEducation`) REFERENCES `educations` (`idEducation`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_42` FOREIGN KEY (`idSubject`) REFERENCES `subjects` (`idSubject`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_44` FOREIGN KEY (`idEducation`) REFERENCES `educations` (`idEducation`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_46` FOREIGN KEY (`idSubject`) REFERENCES `subjects` (`idSubject`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_48` FOREIGN KEY (`idEducation`) REFERENCES `educations` (`idEducation`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_50` FOREIGN KEY (`idSubject`) REFERENCES `subjects` (`idSubject`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_52` FOREIGN KEY (`idEducation`) REFERENCES `educations` (`idEducation`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_54` FOREIGN KEY (`idSubject`) REFERENCES `subjects` (`idSubject`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_56` FOREIGN KEY (`idEducation`) REFERENCES `educations` (`idEducation`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_58` FOREIGN KEY (`idSubject`) REFERENCES `subjects` (`idSubject`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_6` FOREIGN KEY (`idSubject`) REFERENCES `subjects` (`idSubject`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_60` FOREIGN KEY (`idEducation`) REFERENCES `educations` (`idEducation`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_61` FOREIGN KEY (`idTeacher`) REFERENCES `users` (`idTeacher`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_62` FOREIGN KEY (`idSubject`) REFERENCES `subjects` (`idSubject`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_63` FOREIGN KEY (`idYear`) REFERENCES `years` (`idYear`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_64` FOREIGN KEY (`idEducation`) REFERENCES `educations` (`idEducation`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activitys_ibfk_8` FOREIGN KEY (`idEducation`) REFERENCES `educations` (`idEducation`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `activity_team`
--
ALTER TABLE `activity_team`
  ADD CONSTRAINT `activity_team_ibfk_33` FOREIGN KEY (`idTeam`) REFERENCES `teams` (`idTeam`) ON UPDATE CASCADE,
  ADD CONSTRAINT `activity_team_ibfk_34` FOREIGN KEY (`idTeacher`) REFERENCES `users` (`idTeacher`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `resources`
--
ALTER TABLE `resources`
  ADD CONSTRAINT `resources_ibfk_1` FOREIGN KEY (`idTeacher`) REFERENCES `users` (`idTeacher`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `teams`
--
ALTER TABLE `teams`
  ADD CONSTRAINT `teams_ibfk_1` FOREIGN KEY (`idTeacher`) REFERENCES `users` (`idTeacher`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `team_list`
--
ALTER TABLE `team_list`
  ADD CONSTRAINT `team_list_ibfk_33` FOREIGN KEY (`idTeam`) REFERENCES `teams` (`idTeam`) ON UPDATE CASCADE,
  ADD CONSTRAINT `team_list_ibfk_34` FOREIGN KEY (`idTeacher`) REFERENCES `users` (`idTeacher`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_31` FOREIGN KEY (`idSchool`) REFERENCES `schools` (`idSchool`) ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_32` FOREIGN KEY (`idGroup`) REFERENCES `groups` (`idGroup`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
