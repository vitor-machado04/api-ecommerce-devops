from db import get_db_connection, get_redis_connection
from flask import jsonify

cache = get_redis_connection()

def verify_currency(currency):
    if not currency:
        return jsonify({"message": "Moeda não informada", "avaiable": False}), 400

    cached_result = cache.get(currency)
    if cached_result:
        if cached_result.decode('utf-8') == 'available':
            return jsonify({"message": "Moeda disponível para transação", "avaiable": True}), 200
        else:
            return jsonify({"message": "Moeda não disponível para transação", "avaiable": False}), 400

    db = get_db_connection()
    cursor = db.cursor()

    query = "SELECT disponivel FROM currencies WHERE moeda = %s"
    cursor.execute(query, (currency,))
    result = cursor.fetchone()

    cursor.close()
    db.close()  

    if result is None:
        return jsonify({"message": "Moeda não encontrada", "avaiable": False}), 404
    elif result[0] == 1:
        cache.setex(currency, 300, "available")
        return jsonify({"message": "Moeda disponível para transação", "avaiable": True}), 200
    else:
        cache.setex(currency, 300, "unavailable")
        return jsonify({"message": "Moeda não disponível para transação", "avaiable": False}), 400
