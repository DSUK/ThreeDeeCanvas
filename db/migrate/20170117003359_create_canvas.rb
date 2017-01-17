class CreateCanvas < ActiveRecord::Migration[5.0]
  def change
    create_table :canvas do |t|

      t.timestamps
    end
  end
end
