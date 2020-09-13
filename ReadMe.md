Die mobile App ist in React Native geschrieben wird mit Hilfe des Cross-Platform Mobile Development Tools "Expo" ausgeführt.

Wie starte ich die App?
Da die App mit einem Backend-Server läuft, muss an zwei Stellen (backend/db.js:6 & FitnessAppMobil/screens/Home.js: 23) die IP-Adresse des Laptops, mit dem der Server gestartet wird, als Host eingetragen werden. (Über "localhost" kann der Server auf dem Handy nicht erreicht werden!)

Es muss eine neue MYSQL-Datenbank "WebmoMobile" mit dem beigefügten SQL-File "WebmoMobile.sql" angelegt werden:
mysql>create database WebmoMobile;
mysql>use WebmoMobile;
mysql> source <path to the sqlfile>;

Außerdem muss bei mysql der User "admin" für die neue IP-Adresse freigegeben werden:
mysql>create user 'admin'@'<individuelle IP-Adresse>' identified by 'admin';
mysql>grant all on WebmoMobile.\* to 'admin'@'<individuelle IP-Adresse>';
mysql>ALTER USER 'admin'@'<individuelle IP-Adresse>' IDENTIFIED WITH mysql_native_password BY 'admin';
mysql>FLUSH PRIVILEGES;

Anschließend wird das Backend gestartet (cd backend > node index.js) und danach das Frontend(cd FitnessAppMobil > npm start)

Nun hat man die Möglichkeit auszuwählen, wie die App gestartet werden soll. Am einfachsten ist es die App "Expo" auf sein Android / IOS Gerät zu laden und mit dieser den generierten QR-Code zu scannen. Alternativ kann man einen Android emulator / IOS simulator oder ein echtes Endgerät zum Start verwenden. Es gibt die Möglichkeit die App im Browser zu starten. Hierbei werden aber nicht alle Komponenten richtig ausgeführt, z.B. der Kalendar, da diese nur für Mobilgeräte optimiert sind.

Sonstiges:
Da die App internationalisiert ist und für Englisch und Deutsch unterschiedliche Tabellen der Datenbank angesprochen werden, muss beim Bearbeiten der Kurse auf Deutsch, bzw. Englisch natürlich sichergestellt werden, dass diese Änderungen auch für die jeweils andere Sprache eingetragen wird, damit in beiden Sprachen alles synchron ist.
