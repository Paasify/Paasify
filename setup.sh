#!/usr/bin/env bash

# Created by: github.com/AmreshSinha

# Variables
NODE_VERSION="16.15.1"
YARN_VERSION="1.22.19"
DOCKER_VERSION="20.10.18"
DOCKER_COMPOSE_VERSION="2.11.2"
PACK_VERSION="v0.27.0"

# Bash check
[ ! -n "$BASH_VERSION" ] && echo "You can only run this script with bash, not sh / dash." && exit 1

# Check system (should be Linux x86_64)
if [ "$(uname -s)" != "Linux" ]; then
    echo "This script is only for Linux x86_64"
    exit 1
fi

if [ "$(uname -m)" != "x86_64" ]; then
    echo "This script is only for Linux x86_64"
    exit 1
fi

# Check if root (should be a normal user with root priveleges)
if [ "$(id -u)" == "0" ]; then
    echo "Don't run this script as root. Use a normal user with sudo priveleges."
    exit 1
fi

# Check if sudo is installed
if ! [ -x "$(command -v sudo)" ]; then
    echo "sudo is not installed. Please install it and run this script again."
    exit 1
fi

# Check if docker and compose plugin is installed.
if ! [ -x "$(command -v docker)" ]; then
    echo -e "docker is not installed. Please install it and run this script again.
    https://docs.docker.com/engine/install/\n"
    exit 1
fi

if ! [ -x "$(command -v docker compose)" ]; then
    echo -e "docker-compose is not installed. Please install it and run this script again.
    https://docs.docker.com/compose/install/\n"
    exit 1
fi

# Welcome screen
PAASIFY_STABLE=${get_latest_release "Paasify/Paasify"}
echo -e "Paasify installer $PAASIFY_STABLE
(source code: https://github.com/Paasify/Paasify/blob/main/setup.sh)\n"
while true; do
    read -p "Do you want to install Paasify? " yn
    case $yn in
        [Yy]* ) make install; break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

# Check if docker is installed. If not, install it.
if ! [ -x "$(command -v docker)" ]; then
    while true; do
        read -p "Docker Engine not found, should I install it automatically? [Yy/Nn] " yn
        case $yn in
        [Yy]*)
            echo "Installing Docker."
            sh -c "$(curl --silent -fsSL https://get.docker.com)"
            restartDocker
            break
            ;;
        [Nn]*)
            echo "Please install docker manually and update it to the latest, but at least to $DOCKER_VERSION"
            exit 0
            ;;
        *) echo "Please answer Y or N." ;;
        esac
    done
fi


# Check if pack is installed. If not, install it.
if [ -x "$(command -v pack)" ]; then
    echo "pack is already installed. Please uninstall it and run this script again."
    exit 1
else
    (curl -sSL "https://github.com/buildpacks/pack/releases/download/${PACK_VERSION}/pack-v0.27.0-linux.tgz" | sudo tar -C /usr/local/bin/ --no-same-owner -xzv pack)\
    && echo "pack installed successfully."\
    || echo "pack installation failed."
fi

# Check if Paasify folder exists, if not create one
if [ ! -d "~/paasify" ]; then
    mkdir "~/paasify"
fi

# Get latest stable release of paasify
curl -sSL "https://github.com/Paasify/Paasify/archive/refs/tags/${PAASIFY_STABLE}.tar.gz" | tar -C "/tmp/" --no-same-owner -xzv | cp -r "/tmp/paasify-${PAASIFY_STABLE//v}/" "~/paasify/"\ |
    echo "Latest stable version downloaded and extracted."\

# Function for checking the latest version of paasify
# https://gist.github.com/lukechilds/a83e1d7127b78fef38c2914c4ececc3c
get_latest_release() {
  curl --silent "https://api.github.com/repos/$1/releases/latest" | # Get latest release from GitHub api
    grep '"tag_name":' |                                            # Get tag line
    sed -E 's/.*"([^"]+)".*/\1/'                                    # Pluck JSON value
}

# Check nodejs and yarn
if [ -x "$(command -v node)" ]; then
    echo "nodejs is already installed. Please uninstall it and run this script again."
    exit 1
elif [ -x "$(command -v nvm)" ]; then
    echo "Using existing installation of nvm" && \
    echo "Installing nodejs $NODE_VERSION" && \
    nvm install $NODE_VERSION && \
    nvm use $NODE_VERSION && \
    echo "Installing yarn $YARN_VERSION" && \
    npm install -g yarn@$YARN_VERSION && \
    echo "nodejs and yarn installed successfully."\
    || echo "nodejs and yarn installation failed."
else
    echo "Installing nodejs and yarn..."
    (curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash)\
    && nvm install ${NODE_VERSION}\
    && nvm use ${NODE_VERSION}\
    && echo "nodejs v${NODE_VERSION} installed successfully."\
    && npm install --global yarn@${YARN_VERSION}\
    && echo "yarn v${YARN_VERSION} installed successfully."\
    || echo "nodejs installation failed."
fi

# Install pm2 globally
if [ -x "$(command -v pm2)" ]; then
    echo "pm2 is already installed. Please uninstall it and run this script again."
    exit 1
else
    echo "Installing pm2..."
    (yarn global add pm2)\
    && echo "pm2 installed successfully."\
    || echo "pm2 installation failed."
fi

# Install Traefik
if [ -x "$(command -v traefik)" ]; then
    echo "Traefik is already installed. Please uninstall it and run this script again."
    exit 1
else
    echo "Installing Traefik..." && \
    echo "Create a Wildcard DNS record for your domain (Ex: * example.com 192.168.1.1)" && \
    # read -p "Enter the wildcard domain/subdomain: " DOMAIN && \
    while true; do
        read -p "Enter the wildcard domain/subdomain: " DOMAIN
        case $DOMAIN in
            [Yy]* ) make install; break;;
            [Nn]* ) exit;;
            * ) echo "Please answer yes or no.";;
        esac
    done
    cd ~/traefik && \
    mkdir -p data/configurations && \
    # touch data/traefik.yml && \
    # touch data/acme.json && \
    # touch data/configurations/dynamic.yml && \
    # chmod 600 data/acme.json && \
    echo -e "version: '3.7'

services:
  traefik:
    image: traefik:v2.7
    container_name: traefik
    restart: always
    security_opt:
      - no-new-privileges:true
    ports:
      - 80:80
      - 443:443
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./data/traefik.yml:/traefik.yml:ro
      - ./data/acme.json:/acme.json
      - ./data/configurations:/configurations
    networks:
      - proxy
    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=proxy"
      - "traefik.http.routers.traefik-secure.entrypoints=websecure"
      - "traefik.http.routers.traefik-secure.rule=Host(`${TRAEFIK_DOMAIN}`)"
      - "traefik.http.routers.traefik-secure.middlewares=user-auth@file"
      - "traefik.http.routers.traefik-secure.service=api@internal"

networks:
  proxy:
    external: true
" > docker-compose.yml

# Editing traefik configuration file
echo -e "api:
  dashboard: true

entryPoints:
  web:
    address: :80
    http:
      redirections:
        entryPoint:
          to: websecure

  websecure:
    address: :443
    http:
      middlewares:
        - secureHeaders@file
        - nofloc@file
      tls:
        certResolver: letsencrypt

pilot:
  dashboard: false

providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    exposedByDefault: false
  file:
    filename: /configurations/dynamic.yml

certificatesResolvers:
  letsencrypt:
    acme:
      email: admin@yourdomain
      storage: acme.json
      keyType: EC384
      httpChallenge:
        entryPoint: web

  buypass:
    acme:
      email: admin@yourdomain
      storage: acme.json
      caServer: https://api.buypass.com/acme/directory
      keyType: EC256
      httpChallenge:
        entryPoint: web
"

# Run paasify with pm2
echo "Starting Paasify..."
(cd ~/paasify && yarn build && pm2 start yarn --name "paasify-next-js" -- start)\
    && echo "Paasify started successfully."\
    || echo "Paasify failed to start."
echo "Paasify is running on http://localhost:3000"
