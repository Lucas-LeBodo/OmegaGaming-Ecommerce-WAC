OMEGA GAMING | IT E-COMMERCES
===
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

## To begin

**What is this project?**

This project was carried out as part of the “Web@cademy” training.
We had to create a website **e-commerce** specializing in information material.

**How to start the project?**

first of all please download this project, once done, go to the ``/server`` folder and perform the ``composer install`` command.

then go to the ``/imizon`` folder and perform the ``npm install`` command, once this is done using the command.

once the installations are finished, we will perform the migrations.
go back to the ``/server`` folder, and perform the following commands:

``php bin / console make: migration``
``php bin / console shema``
``php bin / console migrate``

once this is done we can finally launch the project, in the ``/server`` folder use the ``symfony start`` command, then in the ``/imizon`` folder carry out the ``npm start`` command

First, please create an `.env` file in the **server** folder, with the information entered in the [``.template.env``](./server/.env) file :
```
DATABASE_URL="mysql://mysql_user:mysql_password@127.0.0.1/imizon"                      # Default value : "mysql://root:root@127.0.0.1/imizon"   
```
once this is done go to the link to test the project
[**``http://localhost:3000/``**](http://localhost:3000/``).


 !!! Please Check that all libraries / dependencies are installed !!!

## Made with

* __Code editor :__
    * [VScode](https://code.visualstudio.com/)
* __FrameWorks :__
    * [symfony](https://symfony.com/)
    * [Node](https://nodejs.org/en/)
    * [React](https://reactjs.org/)
  
## Authors

* **Jeremy Babin** _alias_ [@J-Babin](https://github.com/J-Babin)
* **Damien Legrand** _alias_ [@Nokomi6](https://github.com/Nokomi6)
* **Lucas Le Bodo** _alias_ [@Lucas](https://github.com/Lucas-LeBodo)
