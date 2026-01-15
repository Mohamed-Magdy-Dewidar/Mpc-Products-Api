FROM node:18-alpine

WORKDIR /app

# 👇 ADD THIS LINE to install OpenSSL
RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm install

COPY . .

# This will now generate the correct "linux-musl-openssl-3.0.x" engine
RUN npx prisma generate

RUN npm run build

# Expose the API port
EXPOSE 3000

# 👇 CHANGE THIS LINE
# This runs "prisma db push" (create tables) AND THEN "npm run start" (start app + seed)
CMD ["sh", "-c", "npx prisma db push && npm run start"]