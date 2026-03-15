from app.repositories import transaction_repository as repository

def get_transactions(db):
    return repository.get_all(db)

def create_transaction(db, data):
    return repository.create(db, data)