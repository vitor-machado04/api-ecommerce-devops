import mysql.connector
from config import Config
import redis

def get_db_connection():
    connection = mysql.connector.connect(
        host=Config.MYSQL_HOST,
        user=Config.MYSQL_USER,
        password=Config.MYSQL_PASSWORD,
        database=Config.MYSQL_DB
    )
    return connection

def get_redis_connection():
    return redis.StrictRedis(
        host='localhost',
        port=6379,
        db=0,
    )
