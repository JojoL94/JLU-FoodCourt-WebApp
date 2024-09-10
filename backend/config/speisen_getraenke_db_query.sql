/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `administrator` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `allergentype` (
  `EnumType` varchar(255) NOT NULL,
  PRIMARY KEY (`EnumType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `beverage` (
  `Description` varchar(255) NOT NULL,
  `BeverageTypeEnumType` varchar(255) NOT NULL,
  `DrinksMenuTitle` varchar(255) NOT NULL,
  `Price` float NOT NULL,
  `Available` tinyint(1) NOT NULL,
  PRIMARY KEY (`Description`),
  KEY `FKBeverage22596` (`DrinksMenuTitle`),
  KEY `has` (`BeverageTypeEnumType`),
  CONSTRAINT `FKBeverage22596` FOREIGN KEY (`DrinksMenuTitle`) REFERENCES `drinksmenu` (`Title`),
  CONSTRAINT `has` FOREIGN KEY (`BeverageTypeEnumType`) REFERENCES `beveragetype` (`EnumType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `beveragetype` (
  `EnumType` varchar(255) NOT NULL,
  PRIMARY KEY (`EnumType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `dish` (
  `Description` varchar(255) NOT NULL,
  `DishTypeEnumType` varchar(255) NOT NULL,
  `MenuTitle` varchar(255) NOT NULL,
  `Price` float NOT NULL,
  `Available` tinyint(1) NOT NULL,
  `Image` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`Description`),
  KEY `FKDish75186` (`MenuTitle`),
  KEY `has4` (`DishTypeEnumType`),
  CONSTRAINT `FKDish75186` FOREIGN KEY (`MenuTitle`) REFERENCES `menu` (`Title`),
  CONSTRAINT `has4` FOREIGN KEY (`DishTypeEnumType`) REFERENCES `dishtype` (`EnumType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `dish_allergentype` (
  `DishDescription` varchar(255) NOT NULL,
  `AllergenTypeEnumType` varchar(255) NOT NULL,
  PRIMARY KEY (`DishDescription`,`AllergenTypeEnumType`),
  KEY `has3` (`AllergenTypeEnumType`),
  CONSTRAINT `has2` FOREIGN KEY (`DishDescription`) REFERENCES `dish` (`Description`),
  CONSTRAINT `has3` FOREIGN KEY (`AllergenTypeEnumType`) REFERENCES `allergentype` (`EnumType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `dishtype` (
  `EnumType` varchar(255) NOT NULL,
  PRIMARY KEY (`EnumType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `drinksmenu` (
  `Title` varchar(255) NOT NULL,
  `RestaurantOwnerFoodStand` varchar(255) NOT NULL,
  PRIMARY KEY (`Title`),
  KEY `manages3` (`RestaurantOwnerFoodStand`),
  CONSTRAINT `manages3` FOREIGN KEY (`RestaurantOwnerFoodStand`) REFERENCES `restaurantowner` (`FoodStand`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `event` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `Description` varchar(255) NOT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

CREATE TABLE `menu` (
  `Title` varchar(255) NOT NULL,
  `RestaurantOwnerFoodStand` varchar(255) NOT NULL,
  PRIMARY KEY (`Title`),
  KEY `manages2` (`RestaurantOwnerFoodStand`),
  CONSTRAINT `manages2` FOREIGN KEY (`RestaurantOwnerFoodStand`) REFERENCES `restaurantowner` (`FoodStand`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `restaurantowner` (
  `FoodStand` varchar(255) NOT NULL,
  `Firstname` varchar(255) NOT NULL,
  `Lastname` varchar(255) NOT NULL,
  PRIMARY KEY (`FoodStand`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `administrator` (`username`, `password`, `refresh_token`) VALUES
('admin', '$2b$10$.fR67CNf5AtT/8luTNMEpeTbpb/6yPopD/rMkSeOkBjv4wkxTQARC', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjU1OTc4MzA2LCJleHAiOjE2NTYwNjQ3MDZ9.96yD0fhyw3BuL_6WL_XRq1ZpvSGG5JQY7Ab60cpB_SY');
INSERT INTO `administrator` (`username`, `password`, `refresh_token`) VALUES
('gpermant', '$2b$10$cwgi.1pgOBPk/hc5PnLkH.916NGxS4UtiUL9KGlcngfmDrOdLL1ie', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdwZXJtYW50IiwiaWF0IjoxNjUzMDMxMTM2LCJleHAiOjE2NTMxMTc1MzZ9.EJ-dFw70c1nzH1mYzjLMIAqBGMzYWi9J48jtDUWA2TA');


INSERT INTO `allergentype` (`EnumType`) VALUES
('Ei');
INSERT INTO `allergentype` (`EnumType`) VALUES
('Erdnüsse');
INSERT INTO `allergentype` (`EnumType`) VALUES
('Fisch');
INSERT INTO `allergentype` (`EnumType`) VALUES
('Gluten'),
('Krebstiere'),
('Lupine'),
('Milch'),
('Schalenfrüchte'),
('Sellerie'),
('Senf'),
('Sesamsamen'),
('Soja'),
('Weichtiere');

INSERT INTO `beverage` (`Description`, `BeverageTypeEnumType`, `DrinksMenuTitle`, `Price`, `Available`) VALUES
(' Orangina 0,25l', 'Nicht Alkoholisch', 'Ausschank', 3, 1);
INSERT INTO `beverage` (`Description`, `BeverageTypeEnumType`, `DrinksMenuTitle`, `Price`, `Available`) VALUES
('Apfel-Kirschsaft-Schorle 0,3l', 'Nicht Alkoholisch', 'Ausschank', 3, 1);
INSERT INTO `beverage` (`Description`, `BeverageTypeEnumType`, `DrinksMenuTitle`, `Price`, `Available`) VALUES
('Apfel-Kirschsaft-Schorle 0,5l', 'Nicht Alkoholisch', 'Ausschank', 4, 1);
INSERT INTO `beverage` (`Description`, `BeverageTypeEnumType`, `DrinksMenuTitle`, `Price`, `Available`) VALUES
('Apfelsaft-Schorle 0,3l', 'Nicht Alkoholisch', 'Ausschank', 3, 1),
('Apfelsaft-Schorle 0,5l', 'Nicht Alkoholisch', 'Ausschank', 4, 1),
('Cappucino', 'Nicht Alkoholisch', 'Eiscafe', 2.5, 1),
('Cluss Kellerpils 0,33l', 'Alkoholisch', 'Ausschank', 3.2, 1),
('Coca Cola 0,3l', 'Nicht Alkoholisch', 'Ausschank', 3.2, 1),
('Coca Cola 0,5l', 'Nicht Alkoholisch', 'Ausschank', 4, 1),
('Cola light 0,33l', 'Nicht Alkoholisch', 'Ausschank', 3.3, 1),
('Eiskaffee/Eisschokolade', 'Nicht Alkoholisch', 'Eiscafe', 3.8, 1),
('Eistee Blueberry 0,33l', 'Nicht Alkoholisch', 'Ausschank', 3.3, 1),
('Eistee Pfirsich 0,33l', 'Nicht Alkoholisch', 'Ausschank', 3.3, 1),
('Eistee Zitrone 0,33l', 'Nicht Alkoholisch', 'Ausschank', 3.3, 1),
('Espresso', 'Nicht Alkoholisch', 'Eiscafe', 2.5, 1),
('Export 0,3l', 'Alkoholisch', 'Ausschank', 3.2, 1),
('Export 0,5l', 'Alkoholisch', 'Ausschank', 4.3, 1),
('Export 1,0l', 'Alkoholisch', 'Ausschank', 8, 1),
('Faust Bayrisch Hell 0,3l', 'Alkoholisch', 'Ausschank', 3.2, 1),
('Faust Bayrisch Hell 0,5l', 'Alkoholisch', 'Ausschank', 4.3, 1),
('Faust Bayrisch Hell 1,0l', 'Alkoholisch', 'Ausschank', 8, 1),
('Hefe Dunkel 0,5l', 'Alkoholisch', 'Ausschank', 4, 1),
('Hefe Dunkel 1,0l', 'Alkoholisch', 'Ausschank', 7.5, 1),
('Hefeweizen alkoholfrei 0,3l', 'Nicht Alkoholisch', 'Ausschank', 3.2, 1),
('Hefeweizen alkoholfrei 0,5l', 'Nicht Alkoholisch', 'Ausschank', 4.3, 1),
('Hefeweizen alkoholfrei 1,0l', 'Nicht Alkoholisch', 'Ausschank', 8, 1),
('Hefeweizen aus Bayern 0,3l', 'Alkoholisch', 'Ausschank', 3.2, 1),
('Hefeweizen aus Bayern 0,5l', 'Alkoholisch', 'Ausschank', 4.3, 1),
('Hefeweizen aus Bayern 1,0l', 'Alkoholisch', 'Ausschank', 8, 1),
('Hefeweizen aus der Region 0,3l', 'Alkoholisch', 'Ausschank', 3.2, 1),
('Hefeweizen aus der Region 0,5l', 'Alkoholisch', 'Ausschank', 4.3, 1),
('Hefeweizen aus der Region 1,0l', 'Alkoholisch', 'Ausschank', 8, 1),
('Heiße Schokolade', 'Nicht Alkoholisch', 'Eiscafe', 2.5, 1),
('Kaffee', 'Nicht Alkoholisch', 'Eiscafe', 2.2, 1),
('Kellerpils naturtrüb 0,3l', 'Alkoholisch', 'Ausschank', 3.2, 1),
('Kellerpils naturtrüb 0,5l', 'Alkoholisch', 'Ausschank', 4.3, 1),
('Kellerpils naturtrüb 1,0l', 'Alkoholisch', 'Ausschank', 8, 1),
('Kristallweizen 0,3l', 'Alkoholisch', 'Ausschank', 3.2, 1),
('Kristallweizen 0,5l', 'Alkoholisch', 'Ausschank', 4.3, 1),
('Kristallweizen 1,0l', 'Alkoholisch', 'Ausschank', 8, 1),
('Latte Macciato', 'Nicht Alkoholisch', 'Eiscafe', 2.9, 1),
('Likör oder Schnaps 2cl', 'Alkoholisch', 'Ausschank', 3, 1),
('Meisterpils 0,3l', 'Alkoholisch', 'Ausschank', 3.2, 1),
('Meisterpils 0,5l', 'Alkoholisch', 'Ausschank', 4.3, 1),
('Meisterpils 1,0l', 'Alkoholisch', 'Ausschank', 8, 1),
('Milchkaffee', 'Nicht Alkoholisch', 'Eiscafe', 2.7, 1),
('Milchshake', 'Nicht Alkoholisch', 'Eiscafe', 2.7, 1),
('Orangenlimonade 0,3l', 'Nicht Alkoholisch', 'Ausschank', 3.2, 1),
('Orangenlimonade 0,5l', 'Nicht Alkoholisch', 'Ausschank', 4, 1),
('Pils alkoholfrei 0,33l', 'Nicht Alkoholisch', 'Ausschank', 3, 1),
('Pils alkoholfrei 0,5l', 'Nicht Alkoholisch', 'Ausschank', 4, 1),
('Pils alkoholfrei 1,0l', 'Nicht Alkoholisch', 'Ausschank', 7.5, 1),
('Radler / Russ alkoholfrei 0,3l', 'Nicht Alkoholisch', 'Ausschank', 3.2, 1),
('Radler / Russ alkoholfrei 0,5l', 'Nicht Alkoholisch', 'Ausschank', 4.3, 1),
('Radler / Russ alkoholfrei 1,0l', 'Nicht Alkoholisch', 'Ausschank', 8, 1),
('Radler, Russ, Diesel, Cola-Weizen 0,3l', 'Alkoholisch', 'Ausschank', 3.2, 1),
('Radler, Russ, Diesel, Cola-Weizen 0,5l', 'Alkoholisch', 'Ausschank', 4.3, 1),
('Radler, Russ, Diesel, Cola-Weizen 1,0l', 'Alkoholisch', 'Ausschank', 8, 1),
('Rhabarber-Schorle 0,33l', 'Nicht Alkoholisch', 'Ausschank', 3.3, 1),
('Riesling, Weißherbst, Trollinger QbA. 0,25l', 'Alkoholisch', 'Ausschank', 3.5, 1),
('Riesling, Weißherbst, Trollinger QbA. 0,5l', 'Alkoholisch', 'Ausschank', 6.5, 1),
('Saft pur 0,3l', 'Nicht Alkoholisch', 'Ausschank', 3.5, 1),
('Saft pur 0,5l', 'Nicht Alkoholisch', 'Ausschank', 4.5, 1),
('Schwarzer Johanisbeersaft-Schorle 0,3l', 'Nicht Alkoholisch', 'Ausschank', 3, 1),
('Schwarzer Johanisbeersaft-Schorle 0,5l', 'Nicht Alkoholisch', 'Ausschank', 4, 1),
('Spezi 0,3l', 'Nicht Alkoholisch', 'Ausschank', 3.2, 1);
INSERT INTO `beverage` (`Description`, `BeverageTypeEnumType`, `DrinksMenuTitle`, `Price`, `Available`) VALUES
('Spezi 0,5l', 'Nicht Alkoholisch', 'Ausschank', 4, 1),
('Tafelwasser 0,3l', 'Nicht Alkoholisch', 'Ausschank', 2.2, 1),
('Tafelwasser 0,5l', 'Nicht Alkoholisch', 'Ausschank', 3, 1),
('Tee', 'Nicht Alkoholisch', 'Eiscafe', 2, 1),
('Teinacher Gourmet medium 0,75l', 'Nicht Alkoholisch', 'Ausschank', 4.9, 1),
('Teinacher Gourmet naturell 0,5l', 'Nicht Alkoholisch', 'Ausschank', 2.5, 1),
('Teinacher Limonaden 0,33l', 'Nicht Alkoholisch', 'Ausschank', 3.3, 1),
('Weinschorle 0,25l', 'Alkoholisch', 'Ausschank', 3.3, 1),
('Weinschorle 0,5l', 'Alkoholisch', 'Ausschank', 6, 1),
('Zitronenlimonade 0,3l', 'Nicht Alkoholisch', 'Ausschank', 3.2, 1),
('Zitronenlimonade 0,5l', 'Nicht Alkoholisch', 'Ausschank', 4, 1);

INSERT INTO `beveragetype` (`EnumType`) VALUES
('Alkoholisch');
INSERT INTO `beveragetype` (`EnumType`) VALUES
('Nicht Alkoholisch');


INSERT INTO `dish` (`Description`, `DishTypeEnumType`, `MenuTitle`, `Price`, `Available`, `Image`) VALUES
('Classic Burger', 'Standard', 'Ranger', 8, 1, 'hKorsq0VY1aIIq9hDSSH.jpeg');
INSERT INTO `dish` (`Description`, `DishTypeEnumType`, `MenuTitle`, `Price`, `Available`, `Image`) VALUES
('Gebratene Garnelen in Chilli-Knoblauch-Basilikum Soße', 'Standard', 'Siam Grill', 10.9, 1, NULL);
INSERT INTO `dish` (`Description`, `DishTypeEnumType`, `MenuTitle`, `Price`, `Available`, `Image`) VALUES
('Gebratene Garnelen mit Gemüse in Sojasoße', 'Standard', 'Siam Grill', 10.9, 1, NULL);
INSERT INTO `dish` (`Description`, `DishTypeEnumType`, `MenuTitle`, `Price`, `Available`, `Image`) VALUES
('Gebratene Garnelen mit Gemüse in süßsauer Soße', 'Standard', 'Siam Grill', 10.9, 1, NULL),
('Gebratenes Hähnchenfleisch mit Gemüse in Erdnusssoße', 'Standard', 'Siam Grill', 7.5, 1, NULL),
('Gebratenes Hähnchenfleisch mit Gemüse in Sojasauce', 'Standard', 'Siam Grill', 7.5, 1, NULL),
('Gebratenes Putenfleisch mit Gemüse in Sojasoße', 'Standard', 'Siam Grill', 7.5, 1, NULL),
('Gebratenes Putenfleisch mit Gemüse in süßsauer Soße', 'Standard', 'Siam Grill', 7.5, 1, NULL),
('Gebratenes/Knuspriges Hähnchenfleisch mit Gemüse in süßsauer Soße', 'Standard', 'Siam Grill', 7.5, 1, NULL),
('Hausgemachter Wurstsalat', 'Standard', 'Ranger', 7.2, 1, NULL),
('Hot Burger', 'Standard', 'Ranger', 8.6, 1, NULL),
('Italian Burger', 'Standard', 'Ranger', 8.5, 1, NULL),
('Knoblauchbrot', 'Vegan', 'Villa la Grotta', 4.8, 1, 'n67YpKdI13nUdRWEiF1u.jpeg'),
('Knoblauchbrot Bambini', 'Vegetarisch', 'Villa la Grotta', 2.5, 1, NULL),
('Kokoscurry mit Garnelen und Bambussprossen (scharf)', 'Standard', 'Siam Grill', 10.9, 1, NULL),
('Kokoscurry mit Garnelen, Kartoffeln und Cashewkernen (mild)', 'Standard', 'Siam Grill', 10.9, 1, NULL),
('Kokoscurry mit Hähnchenfleisch , Kartoffeln und Cashewkernen (mild)', 'Standard', 'Siam Grill', 7.5, 1, NULL),
('Kokoscurry mit Hähnchenfleisch und Bambussprossen (scharf)', 'Standard', 'Siam Grill', 7.5, 1, NULL),
('Kokoscurry mit Putenfleisch und Bambussprossen (scharf)', 'Standard', 'Siam Grill', 7.5, 1, NULL),
('Kokoscurry mit Putenfleisch, Kartoffeln und Cashewkernen (mild)', 'Standard', 'Siam Grill', 7.5, 1, NULL),
('Mexicosalat', 'Standard', 'Ranger', 8.5, 1, NULL),
('Ofenkartoffel mit Kräuterquark und Salat', 'Vegetarisch', 'Ranger', 6.9, 1, NULL),
('Ofenkartoffel mit Kräuterquark, Salat und Putenbruststreifen', 'Standard', 'Ranger', 8.5, 1, NULL),
('Panini Brötchen', 'Vegan', 'Villa la Grotta', 3.8, 1, NULL),
('Panini Brötchen Bambini', 'Vegetarisch', 'Villa la Grotta', 2, 1, NULL),
('Pizza Champignons', 'Vegetarisch', 'Villa la Grotta', 8.5, 1, NULL),
('Pizza Champignons Bambini', 'Vegetarisch', 'Villa la Grotta', 4.5, 1, NULL),
('Pizza Diavola', 'Vegetarisch', 'Villa la Grotta', 9.5, 1, NULL),
('Pizza Diavola Bambini', 'Vegetarisch', 'Villa la Grotta', 5, 1, NULL),
('Pizza Hawaii', 'Standard', 'Villa la Grotta', 9, 1, NULL),
('Pizza Hawaii Bambini', 'Standard', 'Villa la Grotta', 4.8, 1, NULL),
('Pizza La Grotta', 'Standard', 'Villa la Grotta', 9.5, 1, NULL),
('Pizza Margherita', 'Vegetarisch', 'Villa la Grotta', 6.5, 1, NULL),
('Pizza Margherita Bambini', 'Vegetarisch', 'Villa la Grotta', 3.8, 1, NULL),
('Pizza Salami', 'Standard', 'Villa la Grotta', 8.5, 1, NULL),
('Pizza Salami Bambini', 'Standard', 'Villa la Grotta', 4.5, 1, NULL),
('Pizza Salami und Champignons', 'Standard', 'Villa la Grotta', 9, 1, NULL),
('Pizza Salami und Champignons Bambini', 'Standard', 'Villa la Grotta', 4.8, 1, NULL),
('Pizza Salami und Schinken', 'Standard', 'Villa la Grotta', 9, 1, NULL),
('Pizza Salami und Schinken Bambini', 'Standard', 'Villa la Grotta', 4.8, 1, NULL),
('Pizza Schinken', 'Standard', 'Villa la Grotta', 8.5, 1, NULL),
('Pizza Schinken Bambini', 'Standard', 'Villa la Grotta', 4.5, 1, NULL),
('Pizza Schinken und Champignons', 'Standard', 'Villa la Grotta', 9, 1, NULL),
('Pizza Schinken und Champignons Bambini', 'Standard', 'Villa la Grotta', 4.8, 1, NULL),
('Pizza Spinagi', 'Vegetarisch', 'Villa la Grotta', 9.5, 1, NULL),
('Pizza Tedesco', 'Standard', 'Villa la Grotta', 9.5, 1, NULL),
('Pizza Tedesco Bambini', 'Standard', 'Villa la Grotta', 5, 1, NULL),
('Pizza Tonno', 'Standard', 'Villa la Grotta', 9.5, 1, NULL),
('Pizza Tonno Bambini', 'Standard', 'Villa la Grotta', 5, 1, NULL),
('Pizzabrot', 'Vegan', 'Villa la Grotta', 4.3, 1, NULL),
('Pizzabrot Bambini', 'Vegan', 'Villa la Grotta', 2.3, 1, NULL),
('Portion Pommes', 'Vegan', 'Ranger', 3.5, 1, NULL),
('Putensteak mit Ofenkartoffel und Salat', 'Standard', 'Ranger', 9.9, 1, NULL),
('Rangersalat', 'Standard', 'Ranger', 8.5, 1, NULL),
('Saisonsalat', 'Vegan', 'Ranger', 5.9, 1, NULL),
('Schnitzel mit Pommes und Salat', 'Standard', 'Ranger', 9.9, 1, NULL),
('Schwabensalat', 'Standard', 'Ranger', 8.3, 1, NULL),
('Schweinesteak mit Pommes und Salat', 'Standard', 'Ranger', 9.3, 1, NULL),
('Sommersalat', 'Standard', 'Ranger', 8.5, 1, NULL),
('Spaghetti Bolognese ', 'Standard', 'Villa la Grotta', 8.5, 1, NULL),
('Vegi Burger', 'Vegetarisch', 'Ranger', 8, 1, NULL),
('Western Burger', 'Standard', 'Ranger', 9.4, 1, NULL),
('Western Curry', 'Standard', 'Ranger', 6.9, 1, NULL),
('XXL Deluxe Burger', 'Standard', 'Ranger', 12.3, 1, NULL),
('XXL Ranger Burger', 'Standard', 'Ranger', 10.3, 1, NULL),
('XXXXL Curry', 'Standard', 'Ranger', 16.9, 1, NULL);

INSERT INTO `dish_allergentype` (`DishDescription`, `AllergenTypeEnumType`) VALUES
('Classic Burger', 'Gluten');
INSERT INTO `dish_allergentype` (`DishDescription`, `AllergenTypeEnumType`) VALUES
('Gebratene Garnelen in Chilli-Knoblauch-Basilikum Soße', 'Krebstiere');
INSERT INTO `dish_allergentype` (`DishDescription`, `AllergenTypeEnumType`) VALUES
('Gebratene Garnelen mit Gemüse in Sojasoße', 'Erdnüsse');
INSERT INTO `dish_allergentype` (`DishDescription`, `AllergenTypeEnumType`) VALUES
('Gebratene Garnelen mit Gemüse in Sojasoße', 'Krebstiere'),
('Gebratene Garnelen mit Gemüse in süßsauer Soße', 'Krebstiere'),
('Gebratenes Hähnchenfleisch mit Gemüse in Erdnusssoße', 'Erdnüsse'),
('Gebratenes Hähnchenfleisch mit Gemüse in Erdnusssoße', 'Sesamsamen'),
('Gebratenes Hähnchenfleisch mit Gemüse in Sojasauce', 'Erdnüsse'),
('Gebratenes Putenfleisch mit Gemüse in Sojasoße', 'Erdnüsse'),
('Hot Burger', 'Gluten'),
('Italian Burger', 'Gluten'),
('Italian Burger', 'Milch'),
('Knoblauchbrot', 'Gluten'),
('Knoblauchbrot Bambini', 'Gluten'),
('Kokoscurry mit Garnelen und Bambussprossen (scharf)', 'Krebstiere'),
('Kokoscurry mit Garnelen und Bambussprossen (scharf)', 'Sesamsamen'),
('Kokoscurry mit Garnelen, Kartoffeln und Cashewkernen (mild)', 'Erdnüsse'),
('Kokoscurry mit Garnelen, Kartoffeln und Cashewkernen (mild)', 'Krebstiere'),
('Kokoscurry mit Garnelen, Kartoffeln und Cashewkernen (mild)', 'Sesamsamen'),
('Kokoscurry mit Hähnchenfleisch , Kartoffeln und Cashewkernen (mild)', 'Erdnüsse'),
('Kokoscurry mit Hähnchenfleisch und Bambussprossen (scharf)', 'Sesamsamen'),
('Kokoscurry mit Putenfleisch, Kartoffeln und Cashewkernen (mild)', 'Erdnüsse'),
('Kokoscurry mit Putenfleisch, Kartoffeln und Cashewkernen (mild)', 'Sesamsamen'),
('Ofenkartoffel mit Kräuterquark und Salat', 'Milch'),
('Ofenkartoffel mit Kräuterquark, Salat und Putenbruststreifen', 'Milch'),
('Panini Brötchen', 'Gluten'),
('Panini Brötchen Bambini', 'Gluten'),
('Pizza Champignons', 'Gluten'),
('Pizza Champignons', 'Milch'),
('Pizza Champignons Bambini', 'Gluten'),
('Pizza Champignons Bambini', 'Milch'),
('Pizza Diavola', 'Gluten'),
('Pizza Diavola', 'Milch'),
('Pizza Diavola Bambini', 'Gluten'),
('Pizza Diavola Bambini', 'Milch'),
('Pizza Hawaii', 'Gluten'),
('Pizza Hawaii', 'Milch'),
('Pizza Hawaii Bambini', 'Gluten'),
('Pizza Hawaii Bambini', 'Milch'),
('Pizza La Grotta', 'Gluten'),
('Pizza La Grotta', 'Milch'),
('Pizza Margherita', 'Gluten'),
('Pizza Margherita', 'Milch'),
('Pizza Margherita Bambini', 'Gluten'),
('Pizza Margherita Bambini', 'Milch'),
('Pizza Salami', 'Gluten'),
('Pizza Salami', 'Milch'),
('Pizza Salami Bambini', 'Gluten'),
('Pizza Salami Bambini', 'Milch'),
('Pizza Salami und Champignons', 'Gluten'),
('Pizza Salami und Champignons', 'Milch'),
('Pizza Salami und Champignons Bambini', 'Gluten'),
('Pizza Salami und Champignons Bambini', 'Milch'),
('Pizza Salami und Schinken', 'Gluten'),
('Pizza Salami und Schinken', 'Milch'),
('Pizza Salami und Schinken Bambini', 'Gluten'),
('Pizza Salami und Schinken Bambini', 'Milch'),
('Pizza Schinken', 'Gluten'),
('Pizza Schinken', 'Milch'),
('Pizza Schinken Bambini', 'Gluten'),
('Pizza Schinken Bambini', 'Milch'),
('Pizza Schinken und Champignons', 'Gluten'),
('Pizza Schinken und Champignons', 'Milch'),
('Pizza Schinken und Champignons Bambini', 'Gluten'),
('Pizza Schinken und Champignons Bambini', 'Milch'),
('Pizza Spinagi', 'Gluten'),
('Pizza Spinagi', 'Milch'),
('Pizza Tedesco', 'Gluten'),
('Pizza Tedesco', 'Milch'),
('Pizza Tedesco Bambini', 'Gluten'),
('Pizza Tedesco Bambini', 'Milch'),
('Pizza Tonno', 'Fisch'),
('Pizza Tonno', 'Gluten'),
('Pizza Tonno', 'Milch'),
('Pizza Tonno Bambini', 'Fisch'),
('Pizza Tonno Bambini', 'Gluten'),
('Pizza Tonno Bambini', 'Milch'),
('Pizzabrot', 'Gluten'),
('Rangersalat', 'Milch'),
('Schnitzel mit Pommes und Salat', 'Gluten'),
('Spaghetti Bolognese ', 'Gluten'),
('Spaghetti Bolognese ', 'Lupine'),
('Spaghetti Bolognese ', 'Sellerie'),
('Vegi Burger', 'Gluten'),
('Western Burger', 'Gluten'),
('XXL Deluxe Burger', 'Ei'),
('XXL Deluxe Burger', 'Gluten'),
('XXL Ranger Burger', 'Gluten'),
('XXXXL Curry', 'Senf');

INSERT INTO `dishtype` (`EnumType`) VALUES
('Standard');
INSERT INTO `dishtype` (`EnumType`) VALUES
('Vegan');
INSERT INTO `dishtype` (`EnumType`) VALUES
('Vegetarisch');

INSERT INTO `drinksmenu` (`Title`, `RestaurantOwnerFoodStand`) VALUES
('Ausschank', 'Ausschank');
INSERT INTO `drinksmenu` (`Title`, `RestaurantOwnerFoodStand`) VALUES
('Eiscafe', 'Eiscafe');


INSERT INTO `event` (`ID`, `Description`, `StartDate`, `EndDate`) VALUES
(1, 'Neujahrsfest', '2022-12-31', '2022-12-01');
INSERT INTO `event` (`ID`, `Description`, `StartDate`, `EndDate`) VALUES
(14, 'Sommerfest', '2022-06-23', '2022-05-19');
INSERT INTO `event` (`ID`, `Description`, `StartDate`, `EndDate`) VALUES
(18, 'Winterdorf', '2022-12-19', '2022-12-31');

INSERT INTO `menu` (`Title`, `RestaurantOwnerFoodStand`) VALUES
('Eiscafe', 'Eiscafe');
INSERT INTO `menu` (`Title`, `RestaurantOwnerFoodStand`) VALUES
('Pizzeria', 'Pizzeria');
INSERT INTO `menu` (`Title`, `RestaurantOwnerFoodStand`) VALUES
('Ranger', 'Ranger');
INSERT INTO `menu` (`Title`, `RestaurantOwnerFoodStand`) VALUES
('Siam Grill', 'Siam Grill'),
('Villa la Grotta', 'Villa la Grotta');

INSERT INTO `restaurantowner` (`FoodStand`, `Firstname`, `Lastname`) VALUES
('Ausschank', 'Sophia', 'Esels');
INSERT INTO `restaurantowner` (`FoodStand`, `Firstname`, `Lastname`) VALUES
('Eiscafe', 'Max', 'Mustermann');
INSERT INTO `restaurantowner` (`FoodStand`, `Firstname`, `Lastname`) VALUES
('Pizzeria', 'Csilla', 'Horvath');
INSERT INTO `restaurantowner` (`FoodStand`, `Firstname`, `Lastname`) VALUES
('Ranger', 'Nitzan ', 'Zinger'),
('Siam Grill', 'Johannes', 'Luetzenhoff'),
('Villa la Grotta', 'Pascal', 'Brostean');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;