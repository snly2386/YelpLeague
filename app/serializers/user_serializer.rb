class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :created_at, :avatar, :last_sign_in_at
end
