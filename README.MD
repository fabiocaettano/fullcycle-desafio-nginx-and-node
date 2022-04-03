1. Criar a pasta mysql:
``` bash
mkdir mysql
```

2. Docker Compose:
Configurar a network que sera utilizada pelos containers node e mysql.
``` yaml
version: '3'

networks:
  node-network:
    driver: bridge 
```

3. Configuração do services db:

``` yaml
services:
  db:
    image: mysql:5.7
    command: --inondb-use-native-aio=0
    container_name: db
    restart: always
    tty: true
    volumes:
      - ./mysql:/var/lib/mysql
    environment:
      - MYSQL_DATABASE=nodedb
      - MYSQL_ROOT_PASSWORD=root
    networks:
      - node-network
```

4. Criar o container do banco de dados:
``` bash
$ docker-compose up -d
```

5. Acessar a base de dados:
``` bash
$ docker exec -it db bash
$ mysql -u root
```
6. No mysql:
``` bash 
mysql> GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root';
mysql> show databases;
mysql> create database nodedb;
mysql> use nodedb;
mysql> create table people (id int not null auto_increment, name varchar(255), primary key(id));
mysql> desc people;
```

7. Criar a pasta node
``` bash
mkdir node
cd node
```

7. Criar o arquivo package.json dentro da pasta node.
``` bash
$ npm init
```

8. Instalar a dependência do mysql, executar o comando dentro da pasta node:
``` bash
$ npm install mysql --save
```

