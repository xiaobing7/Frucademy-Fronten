# 鲜果学院

## 后端说明
> 使用 **Python 3** (理论上 **Python 2**可以正常运行，但是未测试)

### 后端-使用的第三方库
* **Flask**
    - [GitHub](https://github.com/pallets/flask)
    - [PyPi](https://pypi.python.org/pypi/Flask)
    - [Doc](http://flask.pocoo.org/docs/)
    - [Doc-v0.10](http://docs.jinkan.org/docs/flask/)(中文)
    - [Doc-v0.11](http://python.usyiyi.cn/translate/flask_011_ch/index.html)(中文)
* **Jinja2**
    - [GitHub](http://github.com/mitsuhiko/jinja2)
    - [PyPi](https://pypi.python.org/pypi/Jinja2)
    - [Doc](http://jinja.pocoo.org/docs/)
    - [Doc](http://python.usyiyi.cn/translate/jinja2_29/index.html)(中文)
* **SQLAlchemy**
    - [Bitbucket](https://bitbucket.org/zzzeek/sqlalchemy)
    - [PyPi](https://pypi.python.org/pypi/SQLAlchemy)
    - [Doc](http://docs.sqlalchemy.org/)
* **Flask-SQLALchemy**
    - [GitHub](https://github.com/mitsuhiko/flask-sqlalchemy)
    - [PyPi](https://pypi.python.org/pypi/Flask-SQLAlchemy)
    - [Doc](http://flask-sqlalchemy.pocoo.org/)
    - [Doc](http://docs.jinkan.org/docs/flask-sqlalchemy/index.html)(中文)
* **wechatpy**
    - [GitHub](https://github.com/messense/wechatpy)
    - [PyPi](https://pypi.python.org/pypi/wechatpy)
    - [中文 Doc](http://wechatpy.readthedocs.org/zh_CN/master/)
* **Flask-Migrate**
    - [GitHub](http://github.com/miguelgrinberg/flask-migrate/)
    - [PyPi](https://pypi.python.org/pypi/Flask-Migrate)
    - [Doc](http://flask-migrate.readthedocs.io/en/latest/)

### 数据库迁移
1. 初始化迁移配置
    ```shell
    python manage.py db init
    ```
2. 生成迁移文件
    ```shell
    python manage.py db migrate
    ```
3. 执行迁移操作(更改到数据库)
    ```shell
    python manage.py db upgrade
    ```
4. 查看帮助
    ```shell
    python manage.py db --help
    ```

### 安装依赖包
```shell
pip install -r requirements.txt
```

### 开发运行
```shell
python ./run.py
# 或者
python manage.py runserver --host 0.0.0.0 --port 5555
```

### 部署(Linux)
```shell
# Ubuntu
apt-get install gcc python3-dev libev-dev
# CentOS
yum install gcc python3-devel libev-devel

pip install bjoern

python ./deploy.py
```
>所使用的 WSGI容器 bjoern 依赖 libev, 因为 libev 不支持 Windows 平台, 故暂不考虑 Windows 平台部署(Windows 平台部署需要使用其他的 WSGI 容器)

# 前端说明

### 前端-使用的第三方库
* **Swiper**
    - [GitHub](https://github.com/nolimits4web/Swiper)
    - [Doc](http://idangero.us/swiper/)
* **Frozen UI**
    - [GitHub](https://github.com/frozenui/frozenui)
    - [Doc](http://frozenui.github.io/)
* **Zepto**
    - [GitHub](https://github.com/madrobby/zepto)
    - [Doc-com](http://zeptojs.com) 或 [Doc-cn](http://www.zeptojs.cn)
    - [Doc](http://zeptojs.bootcss.com)(中文)

## (关键)目录、文件说明
```
├── backend                     # 后端文件目录
│   ├── app_env.py              # 应用环境变量配置获取
│   ├── apps                    # 子应用目录
│   |   ├── ...                 # 各子应用
│   │   └── __init__.py         # 子应用公共文件(和包入口)
│   ├── core                    # 站点核心(独立于具体业务)文件目录
│   ├── startup.py              # 站点启动入口文件
│   └── utils.py                # 工具库
├── config                      # 配置文件目录
│   ├── cdn.json                # cdn列表
│   └── database.json           # 数据库配置文件
├── deploy.py                   # 部署-启动文件
├── frontend                    # 文件目录
│   ├── static                  # 静态文件目录
│   |   ├── ...                 # 自定义静态文件
|   │   ├── favicon.ico         # 站点图标
|   │   ├── robots.txt          # 搜索引擎配置文件
│   |   └── _libs               # 第三方库
│   └── templates               # 模板目录
│       ├── ...                 # 各子应用模板
│       ├── base-layout.html    # 基础父模板
│       └── index.html          # 站点首页模板
├── README.md                   # 项目说明
├── requirements.txt            # 依赖包清单文件
├── run.py                      # 开发运行-启动文件
└── site.version                # 站点版本文件
```