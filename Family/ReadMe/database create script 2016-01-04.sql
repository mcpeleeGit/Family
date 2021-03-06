USE [master]
GO
/****** Object:  Database [Family]    Script Date: 2016-01-04 오후 11:19:30 ******/
CREATE DATABASE [Family]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Family', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.LEE\MSSQL\DATA\Family.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'Family_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.LEE\MSSQL\DATA\Family_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [Family] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Family].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Family] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Family] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Family] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Family] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Family] SET ARITHABORT OFF 
GO
ALTER DATABASE [Family] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Family] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Family] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Family] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Family] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Family] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Family] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Family] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Family] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Family] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Family] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Family] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Family] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Family] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Family] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Family] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Family] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Family] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Family] SET  MULTI_USER 
GO
ALTER DATABASE [Family] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Family] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Family] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Family] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [Family] SET DELAYED_DURABILITY = DISABLED 
GO
USE [Family]
GO
/****** Object:  User [family]    Script Date: 2016-01-04 오후 11:19:31 ******/
CREATE USER [family] FOR LOGIN [lee-PC\lee] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [fam]    Script Date: 2016-01-04 오후 11:19:31 ******/
CREATE USER [fam] FOR LOGIN [family] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [family]
GO
/****** Object:  Table [dbo].[Account]    Script Date: 2016-01-04 오후 11:19:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Account](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[price] [int] NOT NULL,
	[contents] [varchar](500) NULL,
	[regDate] [datetime] NOT NULL,
	[procDate] [datetime] NOT NULL,
	[state] [varchar](50) NOT NULL,
	[caseCode] [varchar](50) NOT NULL,
	[inOutCode] [varchar](50) NOT NULL,
	[cardBankCode] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Account] PRIMARY KEY NONCLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Code]    Script Date: 2016-01-04 오후 11:19:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Code](
	[code] [varchar](50) NOT NULL,
	[codeType] [varchar](50) NULL,
	[codeName] [nvarchar](500) NOT NULL,
	[regDate] [datetime] NOT NULL,
	[state] [varchar](50) NOT NULL,
	[id] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_Code] PRIMARY KEY NONCLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[CodeType]    Script Date: 2016-01-04 오후 11:19:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CodeType](
	[codeType] [varchar](50) NOT NULL,
	[codeTypeName] [nvarchar](500) NOT NULL,
	[regDate] [datetime] NOT NULL,
	[state] [varchar](50) NOT NULL,
	[id] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_CodeType] PRIMARY KEY NONCLUSTERED 
(
	[codeType] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[RequestSearch]    Script Date: 2016-01-04 오후 11:19:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[RequestSearch](
	[id] [int] NOT NULL,
	[query] [nvarchar](max) NULL,
	[writeDate] [datetime] NULL,
	[state] [varchar](50) NULL,
	[queryName] [nvarchar](500) NULL,
 CONSTRAINT [PK_RequestSearch] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
ALTER TABLE [dbo].[Account]  WITH CHECK ADD  CONSTRAINT [FK_Code_TO_Account] FOREIGN KEY([caseCode])
REFERENCES [dbo].[Code] ([code])
GO
ALTER TABLE [dbo].[Account] CHECK CONSTRAINT [FK_Code_TO_Account]
GO
ALTER TABLE [dbo].[Account]  WITH CHECK ADD  CONSTRAINT [FK_Code_TO_Account2] FOREIGN KEY([inOutCode])
REFERENCES [dbo].[Code] ([code])
GO
ALTER TABLE [dbo].[Account] CHECK CONSTRAINT [FK_Code_TO_Account2]
GO
ALTER TABLE [dbo].[Account]  WITH CHECK ADD  CONSTRAINT [FK_Code_TO_Account3] FOREIGN KEY([cardBankCode])
REFERENCES [dbo].[Code] ([code])
GO
ALTER TABLE [dbo].[Account] CHECK CONSTRAINT [FK_Code_TO_Account3]
GO
ALTER TABLE [dbo].[Code]  WITH CHECK ADD  CONSTRAINT [FK_CodeType_TO_Code] FOREIGN KEY([codeType])
REFERENCES [dbo].[CodeType] ([codeType])
GO
ALTER TABLE [dbo].[Code] CHECK CONSTRAINT [FK_CodeType_TO_Code]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'null' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Account'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'null' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Code'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'null' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CodeType'
GO
USE [master]
GO
ALTER DATABASE [Family] SET  READ_WRITE 
GO
