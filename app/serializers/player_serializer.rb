class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :name, :display_name, :region, :icon, :level, :average_rating
end
