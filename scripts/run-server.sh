function start_docker_machine() {
  local readonly MACHINE_NAME='xixi'
  local readonly MACHINE_HOST='xixi.io'
  local readonly status=$(docker-machine status $MACHINE_NAME)
  local host_entry=$(cat /etc/hosts | grep "$MACHINE_HOST") host_ip

  if [ "$status" == 'Stopped' ]; then
    docker-machine start $MACHINE_NAME
  elif [ "$status" != 'Running' ]; then
    docker-machine create --driver virtualbox $MACHINE_NAME
  fi
  eval $(docker-machine env $MACHINE_NAME)

  # Update /etc/hosts
  host_ip=$(docker-machine ip $MACHINE_NAME)
  [ -n "$host_entry" ] && [ $host_ip != $(echo $host_entry | awk '{print $1}') ] && sudo sh -c "sed -i '' -e '/$MACHINE_HOST/ d' /etc/hosts" && host_entry=''

  if [ -z "$host_entry" ]; then
    host_entry="\n$host_ip $MACHINE_HOST"
    sudo -k sh -c "echo '$host_entry' >> /etc/hosts"
  fi
}



# Make sure `$MACHINE_HOME` docker machine is running and added to /etc/hosts
start_docker_machine

# Run clear docker
. "$(dirname $0)/clear-docker.sh"

# Run `docker-compose up` in root directory of the project
( cd $(dirname $0) && cd .. && docker-compose up )

