docker run --rm --network stroy-network \
    --ip 172.19.100.100 \
    --publish 80:80 --name nginx-container \
    -d  nginx-image
