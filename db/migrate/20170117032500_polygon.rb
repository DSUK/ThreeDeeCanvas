class Polygon < ActiveRecord::Migration[5.0]
  def change
    create_table :polygons do |t|
      t.belongs_to :canvas
      t.float :diffuse_light
      t.float :specular_light
      t.float :specular_shininess
      t.float :ambiant_light
      t.float :red
      t.float :green
      t.float :blue
      t.float :transform_matrix, array: true, default: [ 1, 0 ,0 ,0,
                                                         0, 1, 0, 0,
                                                         0, 0, 1, 0,
                                                         0, 0, 0, 1 ]

      t.float :normal_matrix, array: true, default: [ 1, 0 ,0 ,0,
                                                      0, 1, 0, 0,
                                                      0, 0, 1, 0,
                                                      0, 0, 0, 1 ]
    end
  end
end
