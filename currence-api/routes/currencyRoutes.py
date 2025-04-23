from flask import Blueprint, request
from controllers.currencyController import verify_currency

currency_bp = Blueprint('currency', __name__, url_prefix='/currency')

@currency_bp.route('/verify', methods=['GET'])
def verify():
    currency = request.args.get('currency')

    return verify_currency(currency)
