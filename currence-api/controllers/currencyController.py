from db import get_db_connection
from flask import jsonify

def verify_currency(currency):
    if not currency:
        return jsonify({"message": "Moeda não informada", "avaiable": False}), 400

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
        return jsonify({"message": "Moeda disponível para transação", "avaiable": True}), 200
    else:
        return jsonify({"message": "Moeda não disponível para transação", "avaiable": False}), 400
