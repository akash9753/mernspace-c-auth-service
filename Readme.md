npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint

npm install --save-dev eslint-config-prettier

npm install husky -D

npx husky init

echo "npm run lint" > .husky/pre-commit

npm install --save-dev lint-staged

npm i --save-dev supertest

docker build -t auth-service:dev -f docker/dev/Dockerfile .

docker run --rm -it -v "%cd%":/usr/src/app -v /usr/src/app/node_modules --env-file "%cd%"/.env -p 5501:5501 -e NODE_ENV=development auth-service:dev

docker image

docker ps
