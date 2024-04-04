# cài đặt môi trường cho container chứa dự án(trong dự án này chúng ta dùng môi trường nodejs để code)
FROM 20.11.1-alpine3.19

#thư mục làm việc(nơi lưu trữ src code) trong container nếu chưa có nó sẽ tạo mới
#Định nghĩa thư mục làm việc mặc định cho các câu lệnh CMD, RUN, ENTRYPOINT và COPY trong Dockerfile.
WORKDIR /urs/src/app

COPY package*.json ./

RUN npm install
RUN npm i -g @nestjs/cli

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]



