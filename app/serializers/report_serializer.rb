class ReportSerializer < ActiveModel::Serializer
  attributes :id, :message, :rating, :user, :user_report_count
end
