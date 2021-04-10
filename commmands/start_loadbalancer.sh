docker run --rm --network stroy-network \
   --link nextjs-container:nextjs \
   --link api-container:api-container \
    --publish 80:80 --name nginx-container \
    -d  nginx-image
