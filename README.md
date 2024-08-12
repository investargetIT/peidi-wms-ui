# 基础操作
1. 环境变量，修改`.env`值
```
cp .env.example .env
```
2. 构建镜像
```
./build.sh
```
3. 运行容器
```
./run.sh
```
4. 访问 http://localhost:5173/

# 打包
```
docker run peidi-wms-ui pnpm run build
```

# 安装依赖
1. 进入容器
```
docker exec -it peidi-wms-ui /bin/bash
```
2. 安装依赖
```
pnpm add packageName
```
3. `package.json` 和 `pnpm-lock.yaml` 会自动更新，下次运行需要重新构建镜像
```
./build.sh
```
