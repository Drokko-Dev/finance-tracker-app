from app.repositories import user_repository as repository

def create_user(db, data):
    return repository.create(db, data)