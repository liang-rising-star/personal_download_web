FROM nginx:alpine

# 1. 把本地所有文件打包进镜像的 /app 备用
COPY . /app

# 2. 关键修正：配置 Nginx 精准找文件
# root = /web (挂载目录)
# index = html/index.html (你的入口文件位置)
RUN echo "server { \
    listen 80; \
    server_name _; \
    root /web; \
    index html/index.html; \
    # 解决静态文件路径问题，确保 css、js 能被正确加载
    location / { \
        try_files \$uri \$uri/ /html/index.html; \
    } \
}" > /etc/nginx/conf.d/default.conf

# 3. 启动脚本：自动释放默认文件到 /web，然后启动 Nginx
CMD ["sh", "-c", "\
mkdir -p /web; \
# 只复制你需要用户修改的目录，精准释放
cp -r /app/image /web/ 2>/dev/null || true; \
cp -r /app/js /web/ 2>/dev/null || true; \
cp -r /app/resources /web/ 2>/dev/null || true; \
cp -r /app/css /web/ 2>/dev/null || true; \
cp -r /app/html /web/ 2>/dev/null || true; \
# 启动 Nginx
nginx -g 'daemon off;' \
"]
