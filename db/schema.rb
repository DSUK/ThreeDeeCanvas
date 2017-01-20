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
    t.float   "diffuse_light",      default: 0.0
    t.float   "specular_light",     default: 0.0
    t.float   "specular_shininess", default: 0.0
    t.float   "ambiant_light",      default: 0.0
    t.integer "red",                default: 255
    t.integer "green",              default: 0
    t.integer "blue",               default: 0
    t.float   "translate_x",        default: 0.0
    t.float   "translate_y",        default: 0.0
    t.float   "translate_z",        default: 0.0
    t.float   "rotate_x",           default: 0.0
    t.float   "rotate_y",           default: 0.0
    t.float   "rotate_z",           default: 0.0
    t.float   "scale_x",            default: 1.0
    t.float   "scale_y",            default: 1.0
    t.float   "scale_z",            default: 1.0
    t.integer "polygon_type",       default: 0
    t.float   "first_light",        default: 0.5
    t.float   "second_light",       default: 0.5
    t.index ["canva_id"], name: "index_polygons_on_canva_id", using: :btree
  end

end
