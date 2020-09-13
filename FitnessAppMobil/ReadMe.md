Die mobile App wird mit Hilfe von "Expo" ausgeführt.

Wie starte ich die App?
Da die App mit einem Backend-Server läuft, muss an zwei Stellen (backend/db.js:6 & FitnessAppMobil/screens/Home.js: 23) die IP-Adresse des Laptops als Host eingetragen werden.

Es muss eine neue MYSQL-Datenbank "WebmoMobile" mit dem beigefügten SQL-File "WebmoMobile.sql" angelegt werden.

Außerdem muss bei mysql der User "admin" für die neue IP-Adresse freigegeben werden:
mysql>create user 'admin'@'<individuelle IP-Adresse>' identified by 'admin';
mysql>grant all on WebmoMobile.\* to 'admin'@'<individuelle IP-Adresse>';
mysql>ALTER USER 'admin'@'<individuelle IP-Adresse>' IDENTIFIED WITH mysql_native_password BY 'admin';
mysql>FLUSH PRIVILEGES;

Anschließend wird das Backend gestartet (cd backend > node index.js) und danach das Frontend(cd FitnessAppMobil > npm start)

Nun hat man die Möglichkeit auszuwählen, wie die App gestartet werden soll. Am einfachsten ist es die App "Expo" auf sein Android / IOS Gerät zu laden und mit dieser den generierten QR-Code zu scannen. Alternativ kann man einen Android emulator / IOS simulator oder ein echtes Endgerät zum Start verwenden. Es gibt die Möglichkeit die App im Browser zu starten. Hierbei werden aber nicht alle Komponenten richtig ausgeführt, z.B. der Kalendar, da diese nur für mobile Geräte optimiert sind.
