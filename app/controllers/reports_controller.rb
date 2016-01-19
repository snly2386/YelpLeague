class ReportsController < ApplicationController
  before_action :get_report, only: [:upvote, :downvote]
  respond_to :json, only:[:upvote, :downvote]
  def index
    @reports = Report.with_upvote_data(params[:player_id], current_user)
    respond_to do |format|
      format.json { render json: @reports }
    end
  end

  def by_user
    @reports = Report.where(user_id: params[:user_id])
    respond_to do |format|
      format.json { render json: @reports }
    end
  end

  def create
    @report = Report.new(report_params)

    respond_to do |format|
      if @report.save
        format.json { render json: @report, notice: 'Report Successfully Created'}
      else
        format.json { render json: @report.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @report = Report.find(params[:id])

    respond_to do |format|
      if @report.update(report_params)
        format.json { render json: @report, notice: 'Report has been updated'}
      else
        format.json { render json: @report.errors, status: :unprocessable_entity}
      end
    end
  end

  def upvote
    if current_user
      @report.upvote_by_user(current_user)
      render json: true
    else
      render json: { message: 'You must sign in to upvote' }, status: 401
    end
  end

  def downvote
    if current_user
      @report.downvote_by_user(current_user)
      render json: true
    else
      render json: { message: 'You must sign in to downvote' }, status: 401
    end
  end

  def get_report
    @report = Report.find(params[:report_id])
  end

  private

  def report_params
    params.require(:report).permit(:message, :rating, :user_id, :player_id)
  end
end
