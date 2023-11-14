docker build -t auth-service:dev -f docker/development/Dockerfile .

docker run --rm -it -v "%cd%":/usr/src/app -v /usr/src/app/node_modules --env-file "%cd%"/.env -p 5501:5501 -e NODE_ENV=development auth-service:dev

https://gitfront.io/r/codersgyan/4QKc2vz4SuTU/mernspace-c-auth-service/
