const defaultPayload = {
    sku: 'AWDT0001-S',
    name: 'Cotten T-Shirt',
    size: 'small',
    price: 10.99,
    stockLevel: 10,
};

const missingKeysPayload = {
    sku: 'AWDT0001-S',
    name: 'Cotten T-Shirt',
    size: 'small',
    stockLevel: 10,
};

const validationResponses = [
    'is not allowed',
    'is required',
    'must be a string',
    'must be an array',
];

export { defaultPayload, missingKeysPayload, validationResponses };
