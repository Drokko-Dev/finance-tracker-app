# app/models/__init__.py
from app.db.session import Base  # Importamos la Base común
from .user import User
from .account import Account
from .category import Category
from .transaction import Transaction
from .transaction_debt import TransactionDebt
from .cycle import Cycle
from .friend import Friend
from .tag import Tag
from .transaction_tag import TransactionTag

# Esto es opcional, pero ayuda a saber qué estás exportando
__all__ = [
    "Base", "User", "Account", "Category", "Transaction", 
    "TransactionDebt", "Cycle", "Friend", "Tag", "TransactionTag"
]