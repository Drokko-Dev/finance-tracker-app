## Drop table

DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS users CASCADE;

## ⚙️ User:

{
"email": "test1@test.com",
"name": "Usuario 1",
"password_hash": "123456"
}

## ⚙️ Transaction:

{
"user_id": 1,
"account_id":1,
"category_id": 1,
"type":"income",
"amount":1000,
"description":"Ingreso mensual"
}

## ⚙️ Account:

{
"user_id": "1",
"name": "Tarjeta Credito",
"type": "credit",
"bank": "Banco Chile"
}

## ⚙️ Categories:

docker exec -it -e PYTHONPATH=/app finanzas-backend python seeds/seed_categories.py
