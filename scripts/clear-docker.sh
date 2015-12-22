#!/bin/bash

# clear existed containers or all containers with '-f' argument specified
docker_containers=$([ "$1" == "-f" ] && echo `docker ps -aq` || echo `docker ps -aq -f status=exited`)
[ -n "$docker_containers" ] && docker rm -f $docker_containers

# remove all <none> images to free space
docker_images=$(docker images | grep '<none>' | awk '{print $3}')
[ -n "$docker_images" ] && docker rmi $docker_images


