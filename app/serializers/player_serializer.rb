class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :name, :display_name, :region
end
