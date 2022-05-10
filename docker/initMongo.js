db.createUser({
    user: 'shopper',
    pwd: 'shopper',
    roles: [
        {
            role: 'readWrite',
            db: 'shopper',
        },
    ],
});

db.createCollection('products');
db.createCollection('baskets');