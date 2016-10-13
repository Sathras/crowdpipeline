# Crowd Simulation Pipeline

A Crowd Simulation Research Project by
- Brian Ricks, Ph.D.
- Alexander Fuchsberger, MA. MS.
- Mubbasir Kapadia, Ph.D.
- Sasan Azizan, MS.
- David Beavers
- Jon Hale

## Introduction

This repository is a collection and starting point for the crowd simulation research project.
In time all these components will be put into their own repositories.
The node.js plattform is already extracted.

## External components
Plattform - https://github.com/Sathras/crowdsim

## Instructions
To clone this repository and allow pulling / pushing
1. Ensure you have been granted contributor status in https://github.com/Sathras/crowdpipeline
2. go to an empty folder where you want to have the entire pipeline integrated
```
git config --global user.name "Your Name Here"
git config --global user.email "your_email@example.com"
git init
git remote add origin git@github.com:Sathras/crowdpipeline.git
```

Everytime you start working
```git pull```

Never work in master branch always work in your own branch
e.g. plattform, steersuite+

To create a new branch and switch to it:
```git checkout -b branchname```

To switch to an existing branch
```git checkout branchname```

To upload/commit file changes to the branch
```
git add .
git commit -m "Description of what you did"
git push
```

Thats all we can merge code from branches into master via
the github website.

Thanks!