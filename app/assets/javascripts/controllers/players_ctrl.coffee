(->
  app = angular.module('yelpleague')

  app.controller 'PlayersCtrl',[
    '$scope'
    'ReportsService'
    'PlayersService'

    ($scope, ReportsService, PlayersService) ->
      playerId = $("#player-id").text()
      userId = $("#user-id").text()
      $scope.ratingOptions = [1, 2, 3, 4, 5]
      $scope.report = { user_id : userId, player_id: playerId }

      ReportsService.get( {id: playerId }, (data) ->
        $scope.reports = data.reports
      )

      # PlayersService.get( {id: playerId}, (data) ->
      #   console.log data
      # )

      $scope.submitReport = () ->
        report = new ReportsService($scope.report)
        report.$save({id: playerId}, (data)->
          $scope.reports.unshift($scope.report)
          $scope.report = { user_id : userId, player_id: playerId }
        )

  ]
)()
