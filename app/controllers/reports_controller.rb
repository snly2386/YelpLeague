class ReportsController < ApplicationController
  def index
    @reports = Report.where(player_id: params[:player_id])
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

  private

  def report_params
    params.require(:report).permit(:message, :rating, :user_id, :player_id)
  end
end
