docker run --rm -p 5000:5000  --network stroy-network --name api-container \
     --mount type=bind,source="$(pwd)"/DB,target=/usr/app/DB \
     --mount type=bind,source="$(pwd)"/api,target=/usr/app/api \
     -d api-image
