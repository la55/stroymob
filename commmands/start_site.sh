docker run --rm -p 3000:3000 --network stroy-network \
     --ip 172.19.100.101 \
     --name site-container -d nextjs-image
