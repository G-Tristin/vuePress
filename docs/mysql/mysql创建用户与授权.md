# mysql创建用户与授权
mysql数据库并不是单单的只有一个用户，他可以创建多个用户以及为当前用户授权。

## 创建用户
- 命令: CREATE USER 'username'@'host' IDENTIFIED BY 'password';
- 说明:
    - username 创建的用户名
    - host 指定该用户在哪个主机上可以登录，如果是本地则使用localhost，如果想让用户可以从任意远程主机登录，则可以使用通配符`%`。
    - password 该用户的登录密码，密码可以为空，如果密码为空则该用户可以不适用密码登录服务器

## 授权
命令:GRANT privileges ON databasename.tablename TO 'username'@'host'

- 说明:
    - privileges 用户的操作权限，若SELECT,INSERT,UPDATE等，如果要授权所有的权限则可以使用ALL 
    - databasename 数据库名
    - tablename 表名，如果要授权用户对所有数据库和表的相应操作权限限制则可用`*`表示，如`*.*`。

- eg:
`GRANT ALL ON *.* TO 'username'@'host'`
上面这段代码的含义是 给host主机登录下的当前用户授予所有数据库的所有表的所有权限。其中2个`*`分别代表所有数据库和所有表格。