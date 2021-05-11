docker run --rm -p 5000:5000 \
 --network stroy-network \
 --ip 172.19.100.103 \
 --name api-container \
     -d api-image
