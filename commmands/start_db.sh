docker run --name db-container -p 27017:27017 \
    --network stroy-network \
 -v ~/Progs/ALL/stroitel_v4/DB/data/db:/data/db \
    --rm -d mongo 
   
