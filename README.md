# blog-example-react
React web client app with node js backend connecting to mongoDB

## To set up mongoDB locally on Windows 10

 - First install the mongo db client for windows:
   https://docs.mongodb.com/guides/server/install/

 - Once installed the mongo shell exe should be located in: 
   C:\Program Files\MongoDB\Server\4.2\bin

 - Then set up the  environment variables on windows 10. Type in search env then open Enviornment Variables.

 - In the User variables for {userId}, select path, then 'Edit'.

 - Then 'New', add the path to the mongoDB exe, C:\Program Files\MongoDB\Server\4.2\bin, then ok, ok

 - Open up command prompt as admin then type: net start mongoDB

 - Open up a new command prompt ass admin then type: mongo
   this will open up the mongo shell.

 - Then type use blog or (then name of your db), now you can start inserting some data.
 
 
