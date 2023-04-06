# files-mongodb
mongodb gridfs文件迁移工具，用于将服务器上的文件批量迁移进mongodb gridfs

## 启动服务
```
node index.js
```

## 配置说明
``` javascript
config.js 
// mongodb连接地址
DB_URL: 'mongodb://172.30.240.90:27016/portal',
// 待上传文件目录
DIR_FILES: path.resolve(__dirname, '../files'),
// 日志输入路径
LOG_FILENAME: 'all-the-logs.log',
```

