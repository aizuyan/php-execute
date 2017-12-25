FROM php:latest
MAINTAINER Liam Yan

# 扩充源
RUN grep '^deb ' /etc/apt/sources.list | sed 's/^deb/deb-src/g' > /etc/apt/sources.list.d/deb-src.list
RUN apt-get update -y

# 安装phpbrew，管理php版本
RUN curl -L -O https://github.com/phpbrew/phpbrew/raw/master/phpbrew \
	&& chmod +x phpbrew \
	&& mv phpbrew /usr/local/bin/phpbrew \
	&& phpbrew init
RUN /bin/bash -c "[[ -e ~/.phpbrew/bashrc ]] && source ~/.phpbrew/bashrc"


# 更新php安装必要的东西
RUN apt-get build-dep php7.0 -y

# A.B.C 
# A表示大版本； B表示功能更新； C表示小修改
# 每个功能更新下载一个版本
RUN phpbrew known --old
#RUN phpbrew --debug install 5.4.45 +neutral
#RUN phpbrew --debug install 5.6.32 +neutral
RUN phpbrew --debug install 7.2.0 +neutral


EXPOSE 8082

WORKDIR /var/www/

# 将index.php复制到容器内的/var/www目录下
ADD php-execute /var/www/

# 进入容器的时候默认执行的命令
ENTRYPOINT ["php", "-S", "0.0.0.0:8082"]

#docker run -p 8082:8082 -v /tmp/test/php-execute:/var/www -d phpexecute:beta1 php -S 0.0.0.0:8082

