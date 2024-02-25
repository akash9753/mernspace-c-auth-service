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

docker pull postgres

docker volume create pgdata

docker run --rm --name mernpg-container -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -v mernpgdata:/var/lib/postgresql/data -p 5432:5432 -d postgres

            CONTAINER ID

docker stop 0e4f44b065ab

for connecting dbgate docker should run

docker exec -it mernpg-container psql -U root

npm i typeorm --save

npm install reflect-metadata --save

npm install pg --save
npx typeorm init --database postgres

npm i --save-dev cross-env

npm install bcrypt

npm i --save-dev @types/bcrypt

npm i -D @types/express-validator

npm i -D mock-jwks@v1.0.10

npm i express-jwt

npm i --save jwks-rsa

npm install cookie-parser

npm i --save-dev @types/cookie-parser
