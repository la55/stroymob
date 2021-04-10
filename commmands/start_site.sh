docker run --rm -p 3000:3000 --network stroy-network --link api-container:api-container --name site-container -d nextjs-image
