class Canva < ApplicationRecord
  has_many :polygons, foreign_key: :canva_id
  accepts_nested_attributes_for :polygons, allow_destroy: true
  def to_s
    self.name
  end
end
