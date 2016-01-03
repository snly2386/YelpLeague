class ReportSerializer < ActiveModel::Serializer
  attributes :id, :message, :rating, :user, :user_report_count, :created_at
end
