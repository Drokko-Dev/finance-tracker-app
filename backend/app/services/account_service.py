from app.repositories import account_repository as repository

def create_account(db, data):
    return repository.create(db, data)