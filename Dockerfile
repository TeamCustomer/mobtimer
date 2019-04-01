FROM arm32v7/node as builder
WORKDIR /tmp
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM mariusrumpf/rpi-nginx
COPY --from=builder /tmp/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
