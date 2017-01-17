class Polygon < ApplicationRecord
  belongs_to :canva, optional: true #HACK optional parameter fixes nested attribute bug
end
