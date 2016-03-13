class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :created_at, :avatar, :last_sign_in_at, :providers, :reports, :bookmarks, :upvotes_received, :all_upvotes, :all_downvotes
end
