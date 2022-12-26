var Docker = require('dockerode');
var docker = new Docker({socketPath: process.env.DOCKER_SOCK_PATH || '/var/run/docker.sock'});

// List all the containers
async function listContainers() {
    var containersList = [];
    await docker.listContainers({all: false})
    .then((containers) => {
        containersList = containers;
    })
    .catch((err) => {
        console.error(err);
        return;
    });
    return containersList;
}

module.exports = {listContainers};