export DB_USER=vik 
export DB_PASS=777 
export DB_NAME=stroy 

if [ -z ${DB_USER} ] || [ -z ${DB_PASS} ] || [ -z ${DB_NAME} ]
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
        -e MONGO_INITDB_DATABASE=${DB_NAME} \
        --rm -d mongo --auth
}
fi
