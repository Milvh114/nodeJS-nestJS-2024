echo "**** Start migration $1 $2 ****"
MIGRATION_TIMESTAMP=$(date +%Y%m%d%H%M%S)
 
if [ $1 == "generate" ]; then
    npm run typeorm migration:generate ./libs/database-typeorm/src/migrations/$2 -- -d ./libs/database-typeorm/src/data-source.ts --pretty --timestamp $MIGRATION_TIMESTAMP
    # npm run typeorm migration:generate ./libs/database-typeorm/src/migrations/migrations -- -d ./libs/database-typeorm/src/data-source.ts --pretty
fi
 
if [ $1 == "create" ]; then
    npm run typeorm migration:create ./libs/database-type-orm/src/migrations/$2
fi
 
if [ $1 == "run" ]; then
    npm run typeorm migration:run -- -d ./libs/database-typeorm/src/data-source.ts
fi
 
if [ $1 == "revert" ]; then
    npm run typeorm migration:revert -- -d ./libs/database-type-orm/src/data-source.ts
fi