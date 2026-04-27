# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Install build dependencies (sometimes needed for native modules)
RUN apk add --no-cache python3 make g++

COPY package*.json ./
# Using install instead of ci for better resilience in Cloud Build
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# Inject the API Key into the built JS at runtime
CMD ["sh", "-c", "find /usr/share/nginx/html -name '*.js' | xargs sed -i \"s|GEMINI_API_KEY_PLACEHOLDER|$VITE_GEMINI_API_KEY|g\" && nginx -g 'daemon off;'"]
