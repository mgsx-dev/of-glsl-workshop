
This project is a code base for a workshop around OpenFrameworks and GLSL. Preview available here : http://www.mgsx.net/of-glsl-workshop/

Setup instructions are based on Ubuntu 14.04 and Eclipse Mars but may be adapted for other OS and IDE.


# Documentation

* OpenFrameworks : http://openframeworks.cc/documentation/
* GLSL 1.20 (full reference) : https://www.opengl.org/registry/doc/GLSLangSpec.Full.1.20.8.pdf (basic built-in function from page 55 to 62)

# OpenFrameworks setup

## Linux (ubuntu)

First [Download](http://openframeworks.cc/download/) last OF version (0.9.0) and extract it.

Following is based on extracted root directory (make sure this folder extracted on executable partition like user home).

Setup steps are documented here : http://openframeworks.cc/setup/linux-install/

You may encouter missing dependencies (see troubleshooting section below)

# IDE Setup & use

## Eclipse

### Setup

Following instructions are based on official documentation : http://www.openframeworks.cc/setup/linux-eclipse/

Before install openframeworks eclipse plugin, you need Java 8. It's a known limitation for now due to this issue : https://github.com/openframeworks/eclipsePlugin/issues/1

Once plugin installed : configure OF path in preferences.

note after installing java 8 on linux you may need to update alternative `sudo update-alternatives --config java` then choose java 8 and test it's OK running `java -version`

### Create project

From File / New Project select OpenFrameworks project.

### Import projects

From File / Import choose import existing project into workspace.

## No IDE (Command Line)

### Setup

Follow instruction on OF website : http://www.openframeworks.cc

To build a project : from project folder type `make`

To run a project : from project folder type `make run`

# Workshop setup

Clone this repository in your OF installation **apps/** folder (or download sources if tou're not familiar with GIT). 

Build all projects and run them (import them in your favorite IDE if you want), you exptected to see :

* *workshop-1* : an orange screen
* *workshop-2* : white and black screen (you will see something different if you move the mouse)
* *workshop-3* : a wonderfull monkey !
* *workshop-4* : a black screen (left click and move your mouse to see an orange plane)

# How to use applications

Each applications have several shaders in folder named with a letter, you can switch to shader by typing the corresponding key.

Some special key run special command : 

* **F5** : reload current shader (and 3D model for workshop 3)
* **F2** : enable / disable depth test (workshop 3 only : usefull for alpha shaders)
* **F3** : switch between solid / wireframe rendering (workshop 4 only)

# Troubleshooting

## Missing libboost dependency on ubuntu

You may encounter missing library (libboost 1.55-dev).
To fix it, install manually before install dependencies : 

```
sudo add-apt-repository ppa:boost-latest/ppa
sudo apt-get update
sudo apt-get install libboost1.55-all-dev
```

## Missing audio dependencies on ubuntu

You may encounter missing audio library library :

```
The following packages have unmet dependencies:
 librtaudio-dev : Depends: libjack-dev
                  Depends: librtaudio4 (= 4.0.12~ds0-1ubuntu1) but it is not going to be installed
```

To fix it, install manually before install dependencies : https://github.com/openframeworks/openFrameworks/issues/4546

