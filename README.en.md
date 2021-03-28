# Init Projects Backend (Node.js), Frontend (React) and Mobile (React Native) using Docker and Docker Compose.

Read this in other languages: [English](README.en.md), [Portuguese](README.md).

This project was based on the `Ecoleta` Project by: rocket: [Rocketseact] (https://github.com/rocketseat-education/nlw-01-omnistack): wave :, project **Show**. Very happily it matches the project of my monograph, which deals with how to use technology, such as Apps, IoT, Big Data to improve the recycling process in Brazil.

<p align="center">
  <img src="img/ecoletaproject.png" alt="Project Ecoleta Docker" width="50%" height="50%">
</p>

Project Developed with the following technologies, made from scratch, with some differences from the initial project:

- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org)
- [React Native](https://facebook.github.io/react-native/)
- [Expo](https://expo.io/)
- [NPM (Gerenciador de Pacotes)](https://www.npmjs.com/)
- [Typescript]()

Additional for those who are learning Docker.

- [Docker](https://www.docker.com/) - **New Feature** (Run the entire project using Docker, installing only `Docker` on your machine)
- [SQL Server using Docker](https://hub.docker.com/_/microsoft-mssql-server/) - **New Feature** (SQL Server in seconds with just a few commands)


The objective of the project is to create an environment **Node.js backend connecting with SQL Server database, Web with React, and mobile with React Native**. In order to avoid having to create the complete environment on your machine, such as installing platforms, frameworks and others, we will only use [Docker](https://www.docker.com/) and [Docker-compose](https://docs.docker.com/compose), assuming you already have it installed on your machine.

This project works for both Linux, Mac and Windows, although for Windows, if you have any problems with the installation, like BIOS configuration, you can consult the link:

* https://docs.docker.com/docker-for-windows/troubleshoot/#virtualization

Docker allows us to create compact images of various types of systems with specific functions, see a little more in this other Github article / project [Docker-Sql-Server] (https://github.com/lexvieira/Docker-Sql-Server ) that explains more about docker and shows in practice how to upload and restore a SQL Server database using docker. Available in English and Portuguese. 

Feel free to test and contribute.

Our project will be created using the following technologies:

* [Docker] (https://www.docker.com/) - Create container and run projects without having to create the entire environment on your machine.
* [Docker-compose] (https://docs.docker.com/compose) - Raise the entire environment with just the `docker-compose up` command.
* [Node.js] (https://nodejs.org/en/) - Backend of our application, responsible for the business part
* [React] (https://reactjs.org) - Frontend, responsible for the interaction with the user.
* [React Native] (https://facebook.github.io/react-native/) - Mobile app developed for multiplatform, Android and IOS.
* [Expo] (https://expo.io/), responsible for compiling the mobile project.
* [SQL Server] (https://hub.docker.com/_/microsoft-mssql-server/) Microsoft relational database.
* [NPM (Package Manager)] (https://www.npmjs.com/) to install the packages in our 3 applications.

## `Now, hands on.`  

## [Summary](#summary)

1. [Create Dockerfile to run the Backend, Frontend and Mobile projects.](#createdockerfile) `Create Docker File`
2. [Backend Project using Docker](#initiatebackendproject).
   
    2.1 [Init backend project with NPM](#createbackendwithdocker) 

    2.2. [Create docker-compose.yml and add backend configuration](#createdockercomposebackend). 

    2.3. [Configure Docker with SQL Server](#createdockerwithsqlserver).

    2.4. [Add SQL Server to Docker Compose](#createdockercomposesql). 
  
3. [Start FrontEnd with React using Dockerfile](#initiatefrontendproject)
   
    3.1. [Adding Frontend configuration in the docker-compose.yml.](#createdockercomposefrontend). 

4. [Start Mobile Project with Expo](#initiatemobileproject), 
    
    4.1. [Adding Mobile configuration to docker-compose.yml and Run all projects together](#createdockercomposemobile).     

5. [Connect Project Backend (server) with SQL Server and return Data to Frontend (web)](#connectallprojects)


<br><br>

---
## 1 - <a id="createdockerfile">Create Dockerfile and Build the Image for initiate the Backend, FrontEnd and Mobile</a> 
[Comeback](#summary)

Create a file at the root folder of your project with the name `Dockerfile` and insert the below code.

* Note: The Dockerfile will be used at the beginning to run both 3 projects, because is easy to run the commands and both projects use **Node.js** and **NPM** at the same version, however at the end only the last project will use the image buit using the Dockerfile that need to use the **expo-cli**. For both, Backend and Frontend we will use the **docker-compose** to run our project.

```
FROM node:12.20.2

WORKDIR /opt/ui

RUN apt-get update 

RUN npm install -g expo-cli

ENV PATH="$(npm global bin):$PATH"

USER 1000

CMD ["node", "-v"]
```

Run the command below to build the project's docker image. Image name must be lowercase [DockerFile](https://docs.docker.com/engine/reference/builder/ .

```
➜  NLW1_Ecoleta_Docker_SQLServer git:(master) ✗ docker build -t nlw1ecoleta:v01 .
```

Output

```
Sending build context to Docker daemon  10.75kB
Step 1/7 : FROM node:12.20.2
 ---> af3e1e2da75b
Step 2/7 : WORKDIR /opt/ui
 ---> Using cache
 ---> d139b0c48358
Step 3/7 : RUN apt-get update
 ---> Using cache
 ---> fe2d5cd6fc01
Step 4/7 : RUN npm install -g expo-cli
 ---> Using cache
 ---> a95f322dcf24
Step 5/7 : ENV PATH="$(npm global bin):$PATH"
 ---> Using cache
 ---> 6547d56efeda
Step 6/7 : USER 1000
 ---> Using cache
 ---> be5fba657587
Step 7/7 : CMD ["node", "-v"]
 ---> Using cache
 ---> 9a595b4dbf07
Successfully built 9a595b4dbf07
Successfully tagged nlw1ecoleta:v01
```

Create 3 folders for the aplications backend (server), web (web), mobile (mobile). It is important to create the folders before run the docker commands for that the folders don't stay with root permissions, not allowing to create new files inside them.

```
➜  NLW1_Ecoleta_Docker_SQLServer mkdir server & mkdir web & mkdir mobile 
[1]  - 173992 done       mkdir server
[2]  + 173993 done       mkdir web    
[3]  + 173994 done       mkdir mobile                                                                                         
➜  NLW1_Ecoleta_Docker_SQLServer ls
Dockerfile  mobile/  README.md  server/  web/
```

To create / start each of the ** backend, web and mobile ** projects, we will run some commands for each type of project, being:

* **backend** - Start backend project
```
  npm init -y 
```
* **frontend** - Iniciar projeto frontend com React
```
   npx create-react-app web --template typescript --use-npm
```
* **mobile** - Iniciar projeto mobile com React Native and Expo
```
   expo init mobile --npm 
```

Basicamente com esses 3 comandos você pode iniciar um projeto Backend, Frontend e Mobile com Node.js, React e React Native

Não se preocupe, vamos passar por cada um dos ambientes detalhadamente rodando os comandos dentro de um **docker container** :)

---
# 2 - <a id="initiatebackendproject"> Backend Project using Docker</a> 
[Come Back](#summary).

In this case let's use the **docker run** to create a temporary container to run our commands

```
  docker run -ti -v "$(pwd)":/opt/ui nlw1ecoleta:v01 /bin/bash
  node@70184f946a9a:/opt/ui$
```
* **docker run** - Creates a temporary container, executes the command in it and stops the container when it is done.
* **-ti** - Interative mode, allowing to run text commands in the terminal.
* **-v "$(pwd)":/opt/ui** - Create a volume divided in 2 parts. Before :(colon), your local folder. After :, folder inside the container. $(pwd), returns your local directory (work directory).
* **nlw1ecoleta:v01** - Image name (always lowercase) and tag, after :(colon). [Tags](https://docs.docker.com/engine/reference/commandline/tag/) can indicate versions, like :v01 or *:latest, :v01.test*. 
* **/bin/bash** -  **shell** - Most common **shell** used as default shell for user login of the linux system. The shell's name is an acronym for **Bourne-again shell**.

## 2.1 - <a id="createbackendwithdocker">Starting backend project with NPM init</a> 
[Comeback](#summary)

* **npm vs yarn** (https://stackoverflow.com/questions/62806728/how-to-tell-if-a-project-uses-yarn)

How does one know if a project uses Yarn or NPM? Both contain a package.json file, although Yarn dependencies contain a file in the folder called yarn.lock. 

Both use package.json with the same JSON format, but NPM 5 generates a package-lock.json file, whereas Yarn generates a yarn.lock file.

If you have not yet accessed your docker container, access it with the following command in your **project's root folder**:

```
  docker run -ti -v "$(pwd)":/opt/ui nlw1ecoleta:v01 /bin/bash
  node@70184f946a9a:/opt/ui$
```

* `npm init -y` - Create project with default options

```
node@70184f946a9a:/opt/ui$ ls
Dockerfile  README.md  mobile  server  web

node@70184f946a9a:/opt/ui$ cd server
node@70184f946a9a:/opt/ui/server$ ls

node@70184f946a9a:/opt/ui/server$ npm init -y
Wrote to /opt/ui/server/package.json:

{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

Para conseguirmos rodar nosso ** backend ** com precisaremos instalar mais alguns pacotes (packages). Não se preocupe, para cada pacote instalado teremos uma pequena explicação.

Now that you have started your project you can exit the terminal by typing **exit**.

```Shell
node@70184f946a9a:/opt/ui$ exit
➜  NLW1_Ecoleta_Docker_SQLServer git:(master) ✗
```

Access the **server folder** within your project. Access the **server folder** within your project. There are other ways to execute the commands directly from the root folder, but in this one we will run the commands inside the folder of each project, **Backend (server), Web and Mobile**. Access the **server folder** within your project. Access the **server folder** within your project. There are other ways to execute the commands directly from the root folder, but in this one we will run the commands inside the folder of each project, **Backend (server), Web and Mobile**.

```
  ➜  NLW1_Ecoleta_Docker_SQLServer git:(master) ✗ cd server
  ➜  server git:(master) ✗ ls
```

Now we can run our server with only one command, beyond this, we can run other commands and add new packages of the same way, only adding the command necessary as the last **parameter** of the command.

No exemplo abaixo já estariamos rodando o nosso servidor, adicionando a porta de entrada e saída, o volume e o comando **npm run dev** para rodar o servidor. 

```
➜  docker run -ti -p 81:3333 -v "$(pwd)/server":/opt/ui nlw1ecoleta:v01 npm run dev 
```

In this case, the container is started, execute the commands and after **stops the container**. See more at: [Docker Exec Command With Examples](https://devconnected.com/docker-exec-command-with-examples/#:~:text=The%20difference%20between%20%E2%80%9Cdocker%20run,container%20when%20it%20is%20done)

Vamos simplificar os comandos usando docker, uma vez que os comandos começarão ficarão um pouco grandes, quando começarmos a adicionar, volume, portas, envio de variaveis etc.

For example, if we are going to add the package to work with the Sql Server Database, you need to use `npm install mssql`.

```
docker run -ti -v $(pwd)/server:/opt/ui nlw1ecoleta:v01 npm install mssql
```

OK, the command is executed, but it is a little big, sometimes we can forget some parameter and so on, but it is very easy to solve this with the **Alias (short name for a command)**

Embora você possa sempre repetir esses comandos sempre que precisar :stuck_out_tongue_winking_eye:.

### Using Alias, see more in [Github Semana Omnistack 10 #Alias Bonus](https://github.com/lexvieira/semana-omnistack-10/tree/run_on_docker#alias-bonus target="_blank").

Execute the command in your terminal or add into your file **.bashrc | .zshrc** depending on your type of terminal.

```
alias dockerNlw1server='docker run -ti -v "$(pwd)":/opt/ui nlw1ecoleta:v01'
```

* Notes: 
  * The alias command is ** temporary **, it means that you will have to run the command again when you log in to your machine again, or the best option is to add the command to one of the files **. Bashrc | .zshrc **.
  
  * The command added to the alias must be enclosed in (') quotation marks or (") double quotation marks.

  * We did not include the ports to access our container in ** Alias ** because we will use ** docker-compose ** to do this.

In this case you have reduced the name of your command to just the alias **dockerNlw1server** and now when you need to execute a command just type the name of the **alias** and the command in front. We can also use another name as **dockerNlw1**, since we will use it in Web and Mobile projects, but in this case our alias will be **dockerNlw1server**.
Example:

```
cd server
➜  server git:(master) ✗ dockerNlw1server ls                                                           
Output: node_modules  package-lock.json  package.json  src  tsconfig.json
➜  server git:(master) ✗ 
```

Now  you can **install the packages** just by typing: `➜ dockerNlw1server npm install [package name]`.

We will continue our project and already running the commands with Alias **dockerNlw1server**.

Let's Go!
In your project's root folder, access the **server** folder.

```
cd server
➜  server git:(master) ✗ 
```

We will talk a little more about packages in the other projects, but now we are going to execute just give a brief explanation about the commands and run them in practice. If you have doubts about the commands, you can check the link https://www.npmjs.com/package/express, the name of the package will always be at the end.

Commands at the terminal using the docker:

* `npm install express` - Microframework to handle with routes in Node.js.

```
dockerNlw1server npm install express
``` 

In your **/src/server.ts** file you will have to import **express**.

```Typescript
    import express from 'express';
```

* `npm install @types` - Definition Types Typescript - it means that we will install the * type definitions * of the library, bringing information from the library / package that you are installing in your project, such as types of variables, functions, parameters, returns and others. Some libraries already come with the definition of types installed and others do not. for those that do not come, just install them using the command below and after "/" just enter the name of the library, ex `npm install @ types / express -D`. See more at https://www.typescriptlang.org/docs/handbook/2/type-declarations.html

* -D option = () (-D) **DEVELOPER DEPENDENCY** - means that will be only used when you are developing the app.

`npm install @types/express -D` - Definition types express.

```
dockerNlw1server npm install @types/express -D
``` 

`npm install typescript -D` - Typescript to work with NodeJs, once node just understand Javascript.

```
dockerNlw1server npm install typescript -D
``` 

`npx tsc --init` - Creates Typescript configuration file ** tsconfig.ts **, needed to work with Typescript.

```
dockerNlw1server npx tsc --init
``` 
<img src="img/tsconfigfile.png" alt="tsconfig.ts file">

`npm install ts-node -D` - Once Node just understand Javascript, you need to install the ts-node as Developer Dependency to run your scripts.ts.

```
dockerNlw1server npm install ts-node -D
``` 

* First Route using the Express: File `/src/server.ts`
  
```TypeScript
  import express, {Response} from 'express';

  const app = express();

  app.get('/users', (request, response: Response) => {
      response.send('Server is Running');
  })

  app.listen(3333);  

  console.log('Server is Running');
```

`npx ts-node src/server.ts` - This command will run our app. **npx** has the function of execute a installed package, in this case ts-node. 

* Our output, server is running.

``` 
  dockerNlw1server npx ts-node src/server.ts
  Server is Running  
``` 

 `npm install ts-node-dev -D` - Keep observing the code and when there is a change, restart the service.
 
``` 
  dockerNlw1server npm install ts-node-dev -D
``` 

* `package.json` - Add the line to the file package.json at the root folder of your project.

```json
"scripts": { "dev": "ts-node-dev src/server.ts" } () => {
    //Add the line "dev" to the script flag inside of package.json
}
```

`npm run dev` -  Once you have added the line in the **package.json** file to run the script to run now you can run the server only with the command **npm run dev**, `dev` refers to the reference dev that you added to your package.json.

```
  dockerNlw1server npm run dev
  [INFO] 10:17:56 Restarting: /opt/ui/src/server.ts has been modified
  Server is Running   
```

* Exposing ports on Docker

At this point, if you try to access the site, the answer will be negative because when we run the Run command, we do not say which ports we were exposing to the user by adding the option **- p 81:3333**, Note that the port we are using externally it is port *81* and internally it is *3333*, so we can see this form *-p outsidecontainer: insidecontainer*, outside the container and inside the container.
See more at: https://docs.docker.com/config/containers/container-networking/.

<img src="img/servercantbereached.png" alt="This site can't be reached">

To resolve this we will exit our docker container with the command **exit** and add a new configuration for running the command **docker run**.

As I said earlier, we will use **docker-compose** to run our backend server. In the same way the other Web and Mobile projects. As I said before, we will use **docker-compose** to run our back-end server. Likewise the other Web and Mobile projects.

However, if you don't want to use the docker-compose you can also run your server by running the command below inside the **server** folder.

```
➜  NLW1_Ecoleta_Docker_SQLServer git:(master) ✗ cd server
➜  server git:(master) ✗ docker run -ti -p 81:3333 -v "$(pwd)":/opt/ui nlw1ecoleta:v01 npm run dev
Server is Running
```

The last parameter **dev** concerns the line you added in **package.json**, minutes ago: `scripts": {"dev": ....}`

* Note that you continue to inform in the **volume** of the docker container only $(pwd):/opt/ui, but for that you now need to access the **server** folder within your project folder.

At any time if you want to access the docker container to execute one or more commands you just need to execute **docker run** and add as final parameter **/bin/bash**. In this case we also add the parameter **-p 81:3333** to be able to run the web server and view the page on your machine.

```
➜  server git:(master) ✗ docker run -ti -p 81:3333 -v "$(pwd)":/opt/ui nlw1ecoleta:v01 /bin/bash 
  node@62dd1fb8db48:/opt/ui$ ls
  Output node_modules/  package.json  package-lock.json  src/  tsconfig.json

> server@1.0.0 dev /opt/ui
> ts-node-dev src/server.ts

node@62dd1fb8db48:/opt/ui$ npm run dev
[INFO] 20:25:49 ts-node-dev ver. 1.1.6 (using ts-node ver. 9.1.1, typescript ver. 4.2.3)
Server is Running
```
<img src="img/serverisrunning.png" alt="Server is running">

In this case we ran the full command because we had to add the parameter with the ** input and output port ** `-p 81: 3333` to our **docker run** command. Our Alias does not have the available port parameter because we are going to configure the docker-compose and use the port settings there. If we add it to Alias and we are using it in either case, we will receive a message that the port is already being used by another service or container.

* Example Terminal 1:
<img src="img/portallocated1.png" alt="Server Running">

* Example Terminal 2:
<img src="img/portallocated0.png" alt="Port alread allocated">

To work with the issue of ports in an easier way, we will use the docker-compose to configure our services and leave them active while we are using them, including the SQL Server service that we use with our Backend to return the data for users.

## OK, GENIAL! OK, GREAT!

Cool, web server with Docker, working 100%.

## 2.2. <a id="createdockercomposebackend">Create docker-compose.yml and add backend configuration..</a> 
[Comeback](#summary)

Create the file **docker-compose.yml** in your project's root folder. Open the file and include the following lines:

```Dockerfile
version: "3.5"
services: 
  nlw1_backend:
    container_name: nlw1_backend
    image: node:12.20.2
    ports: 
      - 81:3333
    volumes: 
      - ${PWD}/server:/opt/ui
    command: npm run dev
    working_dir: /opt/ui
    user: "1000"
```

As we mentioned earlier, the port settings are added to the docker-compose.yml which will be active while creating the code for our project.

Save the file and in the root folder of your project type:

```
➜  NLW1_Ecoleta_Docker_SQLServer git:(master) ✗ docker-compose up --build 
```

<img src="img/dockercomposebackend.png" alt="Docker Compose up">

Now your web server is running nonstop on one terminal and you can continue with the code on another terminal with ease.

In your terminal click on the <kbd> + <kbd> sign or on the option to split the terminal to open a new terminal and be able to enter new commands.

<img src="img/terminaloptions.png" alt="Terminal options">

## <a id="createdockerwithsqlserver">Configure Docker with SQL Server</a>
[Come back](#summary) 

The content with Docker SQL Server is already available on Github at <a href="https://github.com/lexvieira/Docker-Sql-Server" target="_blank"> https://github.com/lexvieira / Docker-Sql-Server </a>, including the option of **database restoring** with docker.

Here we will run the basic commands to configure the sql server database and access it with our backend application.

In another terminal, inside the project's root folder type or <kbd>Ctrl</kbd> + <kbd>C</kbd>, <kbd>Ctrl</kbd> + <kbd>V</kbd>:

```
sudo docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YOUR_PASSWORD" -p 1433:1433 --name sqlserverV2017 -v $(pwd)/data:/var/opt/mssql -d mcr.microsoft.com/mssql/server:2017-latest
```

Choose a password and add the path to the folder where you want to store the database files.
For example, if you want to add an absolute path, you can include in the option:

* `-v /home/myuser/data:/var/opt/mssql`.remembering that on the left side of ":" is the directory on your machine or file server and the address on the right side is the address inside the container. **Do not change on the right side as this is the default SQL Server folder**.
* `-v ../data:/var/opt/mssql ` - **../data:** In this case, we inform you that we want to go back one level in the folder hierarchy and add the data from the database inside the **data** folder available in that previous level. 

* In the option **name** we add a name that is easy to relate to the image, in this case **sqlserverV2017**.

## START|STOP SQL SERVER

After running the first command, you can start or stop the service whenever you want with the command: *docker start|stop*. It is still possible to create an Alias to run these commands, as explained previously.

```
docker start sqlserverV2017
docker stop sqlserverV2017
```

## 2.3 - Adicionando a configuração do SQL Server ao docker-compose.yml. 
[Come back](#summary) 

Now that we have learned how to configure the docker to upload a container with SQL Server, now we are going to upload both services simultaneously using **docker-compose.yml**.

Stop the docker-compose service that is running your backend with a <kbd>Ctrl</kbd> + <kbd>C</kbd>. 

In your file **docker-compose.yml** add the following lines:

```Dockerfile
  sqlserver:
    image: "mcr.microsoft.com/mssql/server:2017-latest"
    container_name: sqlserverV2017
    environment:
        SA_PASSWORD: "JHu@hGTWSK@9t63"
        ACCEPT_EULA: "Y"
    ports:
      - "1433:1433"      
    volumes: 
      - ${PWD}/data/sqlserver:/var/opt/mssql    
```

In **volume**, the option **${PWD}**, indicates your **current directory**

* IMPORTANT!
  
In the same way that we did in the backend, web and mobile projects, it will be necessary to create the**pasta data**, **sqlserver**, or any other outside the container. Why? 

When you create the folder inside the container, the folder will come with **root permissions**, so when you need to create a file inside the folder you will not be able to.

<img src="img/folderpermissions.png" alt="Folder Permissions Root">

You can also choose to save the data in another folder, for example, as in another project, as in the example below:

```
    volumes: 
      - ../DockerSqlserver/data/sqlserver:/var/opt/mssql
```

In this case, we were going back to a directory and saving it in the folder **DockerSqlserver**, you can use this option if you have several projects and want to make the same SQL Server container available for all projects you have using **SQL Server, MySQL** or other databases. Dice. The location of the files is indifferent for the database and the container, as long as both have permission to write to the folders.

## Going back a little to the Backend.

In the backend service, add the option **depends_on sqlserver** to the file **docker-compose.yml**, which indicates that the backend service depends on the database service, in the same way as the service **frontend** will depend on the **backend** service.

```Dockerfile
    depends_on: 
      - "sqlserver"
```

The file will look like this:

<img src="img/dockercomposebackendsqlserver.png" alt="Docker Compose SQL Server">

Run `docker-compose up --build` again:

``` 
  ➜  NLW1_Ecoleta_Docker_SQLServer git:(master) ✗ docker-compose up --build
```

<img src="img/dockercomposerunbackendeserver.png" alt="Docker compose Backend and SQL Server Running">

Show, now you have Backend and Database configured and running smoothly.

In the next steps we will make some data inclusions and connect the **backend** to the database **sql server**, but for now, we will proceed by starting **Frontend** and **Mobile**.

---
## 3 - <a id="initiatefrontendproject">Start FrontEnd with React using Dockerfile</a>
[Come Back](#summary)

We are 2 steps away from run a complete Docker project with Node.js, SQL Server, React and React Native. So, Let's Go!.

Now to create the Web and mobile project it will be simpler, we will only have to change some parameters to run our Docker related to each of the projects, web and mobile.

Starting project with Docker container.

* EASYWAY! 

Our Alias **dockerNlw1server** that after typing so much I noticed that it could just be called **dockerNlw1** or the most significant name depending on your project :D.

So let's use our **alias** here to start our React project with just one command in the root folder. If you haven't created it, just don't forget to create the folder **web**, with `mkdir web` at the root of the project, again for reasons of user permissions.

```
  dockerNlw1server npx create-react-app web --template typescript --use-npm
```

<img src="img/createprojectusingalias.png" alt="Create Web Project with Docker Alias" > 

* NOT SO HARD WAY :D 

If you are logged into any container, exit with the command **exit**

```
node@392c8d1638ba:/opt/ui$ exit
exit
```

In the root folder of the project I run the command below, this is the same command that we ran to create the **backend project**.

```
  docker run -ti -v "$(pwd)":/opt/ui nlw1ecoleta:v01 /bin/bash
  node@62dd1fb8db48:/opt/ui$ ls
  Dockerfile  README.md  mobile  server  web  
```

Note that you continue to view the same folders as when we started the project, **server, web and mobile**.

So now run the command inside the docker:

```
node@62dd1fb8db48:/opt/ui$ npx create-react-app web --template typescript --use-npm
```

* npx create-react-app - Command to create the project
* web - Installation folder
* --template typescript - Project template
* --use-npm - Using npm as a package manager

<img src="img/reactappinstall.png" alt="Install React App">

Our output is the same, either using the alias **dockerNlw1server** or the complete command, which I also **recommend** for learning.

<img src="img/reactappcreated.png" alt="Project React Created">

Exit the container with the command **exit**

```
Happy hacking!
node@392c8d1638ba:/opt/ui$ exit
exit
```

* IMPORTANT!
  
  As we are using only one **Alias** to run the commands within the projects, you just need to remember that we have to:
    * **always start the project in the project's root folder** 
  
  And after the project started with the initial configuration, we can: 
    * **execute the commands inside the project folders** ***backend, web and mobile***

### Executando Web Server React usando o Alias que acabamos de criar

Como Alias não aceita parametros no meio do comando, como por exemplo **adicionar uma porta**, então não vamos poder expor as portas do nosso projeto usando o nosso dockerNlw1server 

```
➜  cd web
dockerNlw1server npm start
```

We will receive feedback that the project is running, but in our browser we will have the famous:

<img src="img/webcantbereached.png" alt="Web Can't be Reached">

We solved this by running the command directly on our terminal:

```
➜  NLW1_Ecoleta_Docker_SQLServer git:(master) ✗ cd web 
➜  docker run -ti -v $(pwd):/opt/ui -p 80:3000 nlw1ecoleta:v01 npm start
```

**ET VOILÀ**

<img src="img/webreactserver.png" alt="Run React Web Server">

React Web app running on port **80**. You will not see **http://localhost:80** because **port 80** is the default port for any website **HTTP**, so your browser translates as **http://localhost** or just **localhost **.

<img src="img/reactwebpage.png" alt="Run React Web Server">

### 3.1. <a id="createdockercomposefrontend">Adding Frontend configuration in the docker-compose.yml.</a>
[Come Back](#summary)

Edit the **docker-compose.yml** file in your project's root folder. Add the following lines for your **Frontend**.

```Dockerfile
  nlw1_frontend:
    container_name: nlw1_frontend
    image: node:12.20.2 
    ports:
      - 80:3000
    volumes: 
      - ${PWD}/web:/opt/ui
    command: npm run start
    depends_on: 
      - "nlw1_backend"  
    working_dir: /opt/ui
    user: "1000"    
```

As we mentioned earlier, the port settings are added to the docker-compose.yml which will be active while creating the code for our project.

Save the file and in the root folder of your project type:

```
➜  NLW1_Ecoleta_Docker_SQLServer git:(master) ✗ docker-compose up --build 
```

<img src="img/dockercomposerunfrontend.png" alt="Docker Compose up">

Now your web server is running nonstop on one terminal and you can continue with the code on another terminal easily.

In your terminal click on the <kbd>+<kbd> sign or on the option to split the terminal to open a new terminal and be able to enter new commands.

<img src="img/terminaloptions.png" alt="Terminal options">

## 4. <a id="initiatemobileproject">Starting Mobile project with React Native and Typescript</a> 
[Come Back](#summary)

The last and not least project, which is our mobile app, will follow the same parameters as the previous ones with some exceptions.

Usually on your machine you need to install **expo-cli globally** with the command `npm install -g expo-cli`. in this case we won't have to do that because we have already added this step to the **Dockerfile** file.

```Dockerfile
  RUN apt-get update 

  RUN npm install -g expo-cli

  ENV PATH="$(npm global bin):$PATH"
```

Logo nesse caso a única coisa que necessitamos fazer é iniciar nosso container e criar nosso projeto **React Native** com Typescript.

Iniciando projeto com o Docker container.

And Again:

* EASYWAY! :D

Our Alias **dockerNlw1server** that after typing so much I noticed that it could just be called **dockerNlw1** or the most significant name depending on your project: D.

So let's use our alias here to start our React project with just one command in the root folder. If you haven't created it, just don't forget to create the folder **mobile**, with `mkdir mobile` at the root of the project, again for reasons of user permissions.

```
  dockerNlw1server expo init mobile --npm
```

<img src="img/createreactnative.png" alt="Install React App">

Select the blank option **Typescript** to work with it in the project.

<img src="img/createreactnative1.png" alt="Project React Native Created">

Your **React Native** project will be created in the **mobile** folder.

* NOT SO HARD WAY :D 

If you are logged into any container, exit with the command **exit**

```
node@392c8d1638ba:/opt/ui$ exit
exit
```

Again, in the project's root folder, run the command below, this is the same command we ran to create the backend and frontend project.

```
  docker run -ti -v "$(pwd)":/opt/ui nlw1ecoleta:v01 /bin/bash
  node@d468a50ba3f4:/opt/ui$ ls
  Dockerfile  README.md  mobile  server  web  
```

Note that you continue to view the same folders as when we started the project, **server, web and mobile**.

So now run the command inside the docker (we will use the option **-- npm** because we are working with the package manager **NPM** instead of **YARN**):

```
node@d468a50ba3f4:/opt/ui$ expo init mobile --npm
```

If the project takes too long to create, cancel using <kbd>Ctrl</kbd> + <kbd>C</kbd> and run the command again. If necessary, delete the contents of the folder. Maybe for reasons of slow internet or something.

Saia do container com o comando **exit**

```
node@392c8d1638ba:/opt/ui$ exit
exit
```

To run any command within the mobile project, we just need to access the folder and use the same Alias that we created for the Backend project. For example, we can add **@ react-navigation/native** with the command:

```
  ➜  mobile git:(master) ✗ dockerNlw1server npm install @react-navigation/native
```

## Running Mobile project using **docker run**

In order to run the **mobile** project on our mobile phone and load the **Expo** in our browser, we have a few more parameters, such as the **ports** and the **.env** file.

The default port for the mobile project, in the case to load the Expo in the browser, is the port **19002**.

* Creating our **.env file** to be able to pass environment variables to our Mobile container. Create an .env file in the project's root folder and add the information below.

Note that in your **.env** file you have the ip address that must be replaced with your machine's ip. On **Linux and Mac** you can use **ifconfig** to find the ip and on **Windows** you can use **ipconfig**

**.env File**
```
REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.70
EXPO_DEBUG=true
EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
``` 

``` 
cd mobile 
docker run -ti -p 19000:19000 -p 19001:19001 -p 19002:19002 -p 19006:19006 --env-file "../.env" -v "$(pwd)":/opt/ui nlw1ecoleta:v01 npm start
```

<img src="img/dockerrunexporeactnative.png" alt="Running Expo React Native">

Now your React Native web is running and you can access it using the Expo App installed on your Smartphone, if you don't have it installed, you can download it from [PlayStore] (https://play.google.com/store /apps/details?id=host.exp.exponent&hl=en_US&gl=US) or the [Apple Store] (https://apps.apple.com/us/app/expo-go/id982107779)

In your browser at the address of your local ip, on port **19002** you will be able to access the Expo emulator.

<img src="img/dockerexpoemulator.png" alt="Expo Emulator">

## React Native App working on Android with Expo Emulator

<img src="img/reactnativeapp.jpg" alt="Docker and React Native" width="300">

### 4.1. <a id="createdockercomposemobile">Adding Mobile configuration in the docker-compose.yml</a>
[Come Back](#summary)

Notes when running React Native Expo Service.
   > Using Docker Expo Developer Tools to emulate the Android or IOS mobile app, in the case of React Native. This docker will not be used in production.
  - In order to run the application on the phone and use the * Expo Developer Tools * in our browser we have to add some extra settings that could be in our *DockerFile*, but we would have greater problems to change it having to do the rebuild every time we change of IP for example.
  - To deal with this, we can use the **.env** file and add the variables that we need to access inside the container.

Edit the **docker-compose.yml** file in your project's root folder. Add the following lines for your **Mobile**. You can add it before **SQL Server** service.

```Dockerfile
  nlw1_expo:
    container_name: nlw1_expo
    build: 
      context: .
      dockerfile: Dockerfile
    env_file: .env
    ports: 
      - 19000:19000
      - 19001:19001
      - 19002:19002
      - 19006:19006
    volumes:
      - ${PWD}/mobile:/opt/ui
    command: npm run start
    depends_on: 
      - "nlw1_backend"
```


In this case the **Mobile** service depends on the **backend** service, due to the APIs we are using.

* `Dockerfile` - Note that unlike the other services that use the image parameter, we are using the build parameter and using our **Dockerfile** as the basis for our service, this is because we have added some additional settings in our Dockerfile that do not exist in the  image **node:12.20.2** that we use for the **backend** and **frontend** service.

```
    build: 
      context: .
      dockerfile: Dockerfile
```

As previously mentioned, we are adding **expo-cli** *globally* that allows us to run our **React Native** project.

```Dockerfile
  RUN apt-get update 

  RUN npm install -g expo-cli

  ENV PATH="$(npm global bin):$PATH"
```

OK, now with the 4 docker containers running and working we have to simplify things so we don't have to be running several commands to go up the 4 instances, so we have **docker-compose.yml**. A single file with our entire structure running.

### Building e rodando o docker-compose

```
  docker-compose up --build
```
OU
```
  docker-compose up --build -d
```

>--build - Build images before starting containers.
> -d, --detach - Detached mode: Run containers in the background, the termianl is released and you can use it. But if you want to stop the services you need to type:

```
docker-compose down
```

Next time, only.

```
docker-compose up
```

Of course, if you change any settings you can run ** - build ** again.

Finally.

<img src="img/dockercomposecomplete.png" alt="Docker Compose Complete" >

Of course, after creating the images using **docker-compose --build** you will need to run new commands, add new packages to your application, so you can run the commands inside the docker by accessing *bash* with *docker run*. However, now you can also access the images generated by **docker-compose**.

If you want to check if your applications are running correctly you can also run the command:

```
➜  NLW1_Ecoleta_Docker_SQLServer git:(master) ✗  docker images 
REPOSITORY                                    TAG                 IMAGE ID            CREATED             SIZE
nlw1_ecoleta_docker_sqlserver_nlw1_expo       latest              9a595b4dbf07        6 days ago          1.15GB
nlw1_ecoleta_docker_sqlserver_nlw1_backend    latest              9a595b4dbf07        6 days ago          1.15GB
sqlhtml                                       v01                 9a595b4dbf07        6 days ago          1.15GB
nlw1_ecoleta_docker_sqlserver_nlw1_frontend   latest              5cf07abc153a        6 days ago          1.16GB
<none>                                        <none>              cdc439acf93c        2 weeks ago         1.22GB
node                                          12.20.2             af3e1e2da75b        5 weeks ago         918MB
node                                          12.14.1             839a5e8f04b4        13 months ago       913MB
mcr.microsoft.com/mssql/server                2017-latest         d9b9b96627b7        20 months ago       1.36GB
mysql                                         5.7.22              6bb891430fb6        2 years ago         372MB
```

Você pode chegar que as imagens foram geradas pelo **docker-compose** são compostas por parte do nome da **pasta do seu projeto** e parte no dado a imagem no arquivo **docker-compose.yml**.  

If you want to check if your applications are running correctly you can also run the command:

```
sudo lsof -i -P -n | grep LISTEN
```

Or create an Alias for the same:

```
alias ListenPorts='sudo lsof -i -P -n | grep LISTEN'
ListenPorts
```

![ListenPorts](img/listenports.png)

See the complete dockers documentation at:
https://docs.docker.com/engine/reference/commandline/start/
https://docs.docker.com/compose/gettingstarted/

## Conectar Projeto Backend (server) com o SQL Server e retornar dados para o Frontend (web) Connect Project Backend (server) with SQL Server and return Data to Frontend (web)
[Come Back](#summary)

The project with the commands to connect to the database and return the first data on the frontend will be ready in the next few days, in the meantime you can access the complete code made from scratch. In the meantime you can see the complete project at the links below:

Complete project with App available on Github https://github.com/lexvieira/NLW1_Ecoleta_Docker_SQLServer. Based on the Rocketseat project https://github.com/rocketseat-education/nlw-01-omnistack.

# CREDITOS

Como normalmente, as vezes temos alguns problemas para configurar um ambiente, e com Docker não foi diferente, então aqui vai os creditos para os camaradas que ajudaram um pouco com esse pequeno projeto com **Docker**, **Node.js**, **React** e **React Native**. 

### Rocketseat

- [rocketseat-education-semana-omnistack-10](https://github.com/rocketseat-education/semana-omnistack-10)

- [rocketseat-education/nlw-01-omnistack](https://github.com/rocketseat-education/nlw-01-omnistack)

### Docker

- [Running Expo/React Native in Docker - Haseeb Majid - Nov 1, 2018](https://hmajid2301.medium.com/running-expo-react-native-in-docker-ff9c4f2a4388)

- [Running React Native in Docker — Part 1/2 - Pavan Welihinda - Dec 9, 2019](https://medium.com/@pavan168/pavanwelihinda-running-react-native-in-docker-a0fe0b0c776e)

- [How to Run React Native Expo Web in a Docker Container - rockyourcode - 2020-10-20](https://www.rockyourcode.com/how-to-run-react-native-expo-web-in-a-docker-container/)

- [Metro bundler with Expo dockerized app is not working](https://stackoverflow.com/questions/59638451/metro-bundler-with-expo-dockerized-app-is-not-working)

- [Securing WebSocket API prevents use of Expo DevTools](https://github.com/expo/expo-cli/issues/1081)

- [MDBootstrap Angular Project with Dockers](https://github.com/lexvieira/mdbootstrapangular)

### Alias

- [Linux and Unix alias command tutorial with examples](https://shapeshed.com/unix-alias/)
- [How to set and save an alias in Windows Command Line using doskey](https://www.youtube.com/watch?v=E_6Lklnakew)
- [Your Must-Have PowerShell Aliases for Docker](https://blog.sixeyed.com/your-must-have-powershell-aliases-for-docker/)

### Readme Format and Other Stuff ;)

- [GitHub Cheat Sheet](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.md)
- [Get started with Docker Compose](https://docs.docker.com/compose/gettingstarted/)
- [Dockerfile reference](https://docs.docker.com/engine/reference/builder/)
- [Basic writing and formatting syntax](https://docs.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax#headings)