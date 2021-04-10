docker run --rm --network stroy-network \
    --publish 80:80 --name nginx-container \
    -d  nginx-image
