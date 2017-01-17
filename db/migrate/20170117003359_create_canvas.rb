class CreateCanvas < ActiveRecord::Migration[5.0]
  def change
    create_table :canvas do |t|
      t.string :name
      t.timestamps
    end
  end
end
