(->
  app = angular.module('yelpleague')

  app.controller 'PlayersCtrl',[
    '$scope'
    'ReportsService'
    'PlayersService'
    'BookmarkService'

    ($scope, ReportsService, PlayersService, BookmarkService) ->
      $scope.updateReport = {}
      playerId = $("#player-id").text()
      userId = $("#user-id").text()
      $scope.ratingOptions = [1, 2, 3, 4, 5]
      $scope.report = { user_id : userId, player_id: playerId }

      ReportsService.get( {player_id: playerId }, (data) ->
        $scope.reports = data.reports
        console.log $scope.reports
      )

      PlayersService.get( {id: playerId}, (data) ->
        console.log data
      )
      $scope.initializeUpdateReport = (report, index) ->
        $scope.updateReportIndex = index
        $scope.updateReport.id = report.id

      $scope.editReport = () ->
        ReportsService.update(angular.extend({player_id: playerId , id: $scope.updateReport.id}, $scope.updateReport), (data) ->
          $('#myModal').modal('hide')
          $scope.reports[$scope.updateReportIndex] = $scope.updateReport
          $scope.updateReport = {}
        )

      $scope.submitReport = () ->
        report = new ReportsService($scope.report)
        report.$save({player_id: playerId}, (data)->
          $scope.reports.unshift($scope.report)
          $scope.report = { user_id : userId, player_id: playerId }
        )
  ]
)()
