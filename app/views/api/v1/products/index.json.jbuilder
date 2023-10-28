json.array! @products do |product|
    json.id product.id
    json.title product.title
    json.description product.description
    json.price product.price
    json.category product.category
    json.created_at product.created_at
end