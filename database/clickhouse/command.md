# clickhouse常用命令

- clickhouse-client
  - `--host, -h` -– 服务端的host名称, 默认是`localhost`。您可以选择使用host名称或者IPv4或IPv6地址。
  - `--port` – 连接的端口，默认值：9000。注意HTTP接口以及TCP原生接口使用的是不同端口。
  - `--user, -u` – 用户名。 默认值：`default`。
  - `--password` – 密码。 默认值：空字符串。
  - `--query, -q` – 使用非交互模式查询。
  - `--database, -d` – 默认当前操作的数据库. 默认值：服务端默认的配置（默认是`default`）。
  - `--multiline, -m` – 如果指定，允许多行语句查询（Enter仅代表换行，不代表查询语句完结）。
  - `--multiquery, -n` – 如果指定, 允许处理用`;`号分隔的多个查询，只在非交互模式下生效。
  - `--format, -f` – 使用指定的默认格式输出结果。
  - `--vertical, -E` – 如果指定，默认情况下使用垂直格式输出结果。这与`–format=Vertical`相同。在这种格式中，每个值都在单独的行上打印，这种方式对显示宽表很有帮助。
  - `--time, -t` – 如果指定，非交互模式下会打印查询执行的时间到`stderr`中。
  - `--stacktrace` – 如果指定，如果出现异常，会打印堆栈跟踪信息。
  - `--config-file` – 配置文件的名称。
  - `--secure` – 如果指定，将通过安全连接连接到服务器。
  - `--history_file` — 存放命令历史的文件的路径。
  - `--param_<name>` — 查询参数配置[查询参数](https://clickhouse.com/docs/zh/interfaces/cli/#cli-queries-with-parameters).



- 连接数据库

  ```shell
  clickhouse-client -h 192.168.1.88 -p 9100 -u default -p d123456
  ```

  

- 执行sql

  ```shell
  clickhouse-client -h 192.168.1.88 -p 9100 -u default -p d123456 --query="select * from database.table"
  ```

  

- 将csv导入到table

  ```shell
  clickhouse-client -h 192.168.1.88 -p 9100 -u default -p d123456 --query="INSERT INTO database.table FORMAT CSV" < /table.csv
  ```

  