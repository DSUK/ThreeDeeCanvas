class Polygon < ApplicationRecord
  belongs_to :canva, optional: true #HACK optional parameter fixes nested attribute bug
  def hex_colour
    k = (red << 16) + (green << 8) + blue
    "\##{k.to_s(16)}"
  end
  def as_json(aa)
    {
			light: {
				diffuse: self.diffuse_light,
				specular: self.specular_light,
				shininess: self.specular_shininess,
				ambiant: self.ambiant_light
			}, _colours: {
				r: self.red,
				g: self.green,
				b: self.blue
			}, translate: {
				x: self.translate_x,
				y: self.translate_y,
				z: self.translate_z
			}, rotation: {
				x: self.rotate_x,
				y: self.rotate_y,
				z: self.rotate_z
			}, scale: {
				x: self.scale_x,
				y: self.scale_y,
				z: self.scale_z
			}, lighting: {
        first: self.first_light,
        second: self.second_light
      },
			shape_type: self.polygon_type,
      colour: self.hex_colour
    }
  end
end
