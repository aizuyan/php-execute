# php-execute
php在线执行


#### 安装
首先安装docker，直接去官网下载安装就可以。
```shell
git clone git@github.com:aizuyan/php-execute.git
cd php-execute
cd php-execute

# 安装必要的类库
npm install

# 编译less文件
gulp makeCss

# 打包
webpack
```
上面几部，需要的资源准备ok了，然后构建一个新的镜像

`docker build --rm -t phpexecute:latest .`这个命令表示从当前目录的Dockerfile创建一个新的镜像，名称为`phpexecute`，标签为`latest`，`--rm`表示成功之后删除所有中间容器，`-t`表示镜像名称。

`docker run -p 8082:8082 -d phpexecute:latest`
其中`-p`是端口映射，将本地端口映射到容器的端口`hostPort:containerPort`，`-d`表示容器在后台运行

运行下面命令，可以看见进行，表示安装成功了。
```shell
➜  ww git:(master) docker ps
CONTAINER ID        IMAGE               COMMAND                 CREATED                  STATUS              PORTS                    NAMES
730fa7d81768        phpexecute:latest   "php -S 0.0.0.0:8082"   Less than a second ago   Up 2 seconds        0.0.0.0:8082->8082/tcp   happy_kilby
```

在宿主机上输入`http://localhost:8082/index.html`可以看到效果了：
