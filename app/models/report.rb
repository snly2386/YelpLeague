class Report < ActiveRecord::Base
  belongs_to :user
  belongs_to :player
  validates_presence_of :message, :rating, :user_id, :player_id
  acts_as_votable
  scope :by_player_id, -> (playerId){ where("player_id = ?", playerId) }


  def user_report_count
    user.report_count
  end

  def get_all_upvotes
    get_upvotes
  end

  def get_all_downvotes
    get_downvotes
  end

  def get_vote_difference
    get_upvotes.count - get_downvotes.count
  end

  def upvote_by_user(user)
    liked_by(user)
  end

  def downvote_by_user(user)
    downvote_from(user)
  end

  def upvoted_by_user(user)
    user.voted_up_on?(self)
  end

  def voted_by_user(user)
    user.voted_for?(self)
  end

  def downvoted_by_user(user)
    user.voted_down_on?(self)
  end

  def player_name
    player.display_name
  end

  def self.with_upvote_data(playerId, user)
    by_player_id(playerId).reduce([]) do |arr, report|
      if user
        arr << {
          upvoted_by_user: report.upvoted_by_user(user),
          downvoted_by_user: report.downvoted_by_user(user),
          voted_by_user: report.voted_by_user(user),
          report: report,
          total_downvotes: report.get_all_downvotes.count,
          total_upvotes: report.get_all_upvotes.count,
          vote_difference: report.get_vote_difference,
          user: report.user,
          player: report.player,
          user_report_count: report.user_report_count
        }
      else
        arr << {
          report: report,
          total_downvotes: report.get_all_downvotes.count,
          total_upvotes: report.get_all_upvotes.count,
          vote_difference: report.get_vote_difference,
          user: report.user,
          player: report.player,
          user_report_count: report.user_report_count
        }
      end
    end
  end
end
