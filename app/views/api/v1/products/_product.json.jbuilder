json.extract! product, :id, :title, :description, :price
json.category product.category, partial: "api/v1/categories/category", as: :category
json.seller product.seller, partial: "api/v1/users/user", as: :user
if product.images.attached?
    json.images product.images.each_with_index.map { |image, index|
      {
        url: rails_blob_path(image, only_path: true),
        index: index
      }
    }
  end
