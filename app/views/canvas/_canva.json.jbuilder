json.extract! canva, :id, :created_at, :updated_at, :name, :polygons
json.url canva_url(canva, format: :json)
