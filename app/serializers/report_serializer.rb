class ReportSerializer < ActiveModel::Serializer
  attributes :id, :message, :rating, :user, :user_report_count, :created_at, :player, :player_name

  def player_name
    self.player.display_name
  end
end
