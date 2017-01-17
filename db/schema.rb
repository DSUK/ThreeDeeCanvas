# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170117032500) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "canvas", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "polygons", force: :cascade do |t|
    t.integer "canva_id"
    t.float   "diffuse_light"
    t.float   "specular_light"
    t.float   "specular_shininess"
    t.float   "ambiant_light"
    t.float   "red"
    t.float   "green"
    t.float   "blue"
    t.float   "transform_matrix",   default: [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0], array: true
    t.float   "normal_matrix",      default: [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0], array: true
    t.integer "ploygon_type"
    t.index ["canva_id"], name: "index_polygons_on_canva_id", using: :btree
  end

end
