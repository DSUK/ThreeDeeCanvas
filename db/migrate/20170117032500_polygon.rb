class Polygon < ActiveRecord::Migration[5.0]
  def change
    create_table :polygons do |t|
      t.belongs_to :canva
      t.float :diffuse_light, default: 0
      t.float :specular_light, default: 0
      t.float :specular_shininess, default: 0
      t.float :ambiant_light, default: 0
      t.integer :red, default: 255
      t.integer :green, default: 0
      t.integer :blue, default: 0
      t.float :translate_x, default: 0
      t.float :translate_y, default: 0
      t.float :translate_z, default: 0
      t.float :rotate_x, default: 0
      t.float :rotate_y, default: 0
      t.float :rotate_z, default: 0
      t.float :scale_x, default: 1
      t.float :scale_y, default: 1
      t.float :scale_z, default: 1
      t.integer :polygon_type, default: 0
      t.float :first_light, default: 0.5
      t.float :second_light, default: 0.5
    end
  end
end
