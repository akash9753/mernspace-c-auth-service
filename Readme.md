npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint

npm install --save-dev eslint-config-prettier

npm install husky -D

npx husky init

echo "npm run lint" > .husky/pre-commit

npm install --save-dev lint-staged

npm i --save-dev supertest

docker build -t auth-service:dev -f docker/dev/Dockerfile .

docker run --rm -it -v "%cd%":/usr/src/app -v /usr/src/app/node_modules --env-file "%cd%"/.env.dev -p 5501:5501 -e NODE_ENV=development auth-service:dev

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

npm i rsa-pem-to-jwk

npm run migration:generate -- src/migration/migration -d src/config/data-source.ts

npm run migration:run -- -d src/config/data-source.ts

npm run migration:generate -- src/migration/rename_tables -d src/config/data-source.ts

npm run migration:create src/migration/cascade_delete

npm run build

set NODE_ENV=dev node src/server.js

docker build -t mernstack_test_prod_image -f docker/prod/DockerFile .

docker image ls

TEST_DB_PASSWORD=Array4242@#$%

token soanrcloud 7ef4e07dba478a931f3af743f1c71bb358c572e0

dockerhub token or password dckr_pat_F4OWnJSwBZc5IW4U4e4Jeis9tus

asie he
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

npm i rsa-pem-to-jwk

npm run migration:generate -- src/migration/migration -d src/config/data-source.ts

npm run migration:run -- -d src/config/data-source.ts

npm run migration:generate -- src/migration/rename_tables -d src/config/data-source.ts

npm run migration:create src/migration/cascade_delete

npm run build

set NODE_ENV=dev node src/server.js

docker build -t mernstack_test_prod_image -f docker/prod/DockerFile .

docker image ls

TEST_DB_PASSWORD=Array4242@#$%

token soanrcloud 7ef4e07dba478a931f3af743f1c71bb358c572e0

dockerhub token or password dckr_pat_F4OWnJSwBZc5IW4U4e4Jeis9tus

asie heee
