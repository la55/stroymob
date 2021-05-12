if [ -z ${DB_USER} ] || [ -z ${DB_PASS} ] || 
then
    echo "Variables did not set"
else
{
    docker run --name db-container -p 27017:27017 \
        --network stroy-network \
        --ip 172.19.100.104 \
        -v db-catalog:/data/db \
        -e MONGO_INITDB_ROOT_USERNAME=${DB_USER} \
        -e MONGO_INITDB_ROOT_PASSWORD=${DB_PASS} \
        --rm -d mongo --auth
}
fi
