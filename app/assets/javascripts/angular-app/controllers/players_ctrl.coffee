(->
  app = angular.module('yelpleague')

  app.controller 'PlayersCtrl',[
    '$scope'
    'ReportsService'
    'PlayersService'
    'BookmarkService'

    ($scope, ReportsService, PlayersService, BookmarkService) ->
      playerId = $("#player-id").text()
      $scope.userId = $("#user-id").text()
      avatar = $("#avatar").text()
      username = $("#username").text()
      $scope.ratingOptions = [1, 2, 3, 4, 5]
      $scope.report = { user_id : $scope.userId, player_id: playerId, user: { avatar: avatar, username: username } }

      ReportsService.get( {player_id: playerId }, (data) ->
        $scope.reports = data.reports
        console.log $scope.reports
      )

      PlayersService.get( {id: playerId}, (data) ->
        $scope.avgRating = data.average_rating
        $scope.player = data.player
        $scope.reportedByUser = data.reported_by_user
        console.log data
      )

      $scope.$on('editedReport', (event, data) ->
        for report in $scope.reports
          if report.user.id == parseInt($scope.userId)
            for k,v of report
              report[k] = data[k]
      )

      $scope.initializeUpdateReport = (report, index) ->
        $scope.oldReport = report
        $scope.updateReport = angular.copy(report)
        $scope.updateReportIndex = index
        $scope.updateReport.id = report.id

      $scope.editReport = () ->
        ReportsService.update(angular.extend({player_id: playerId , id: $scope.updateReport.id}, $scope.updateReport),
          (data) ->
            $('#editReviewModal').modal('hide')
            $scope.$broadcast('editedReport', $scope.updateReport)
            $scope.$emit('editedReport', $scope.updateReport)
        )

      $scope.myReview = (review) ->
        return review if review.user.id == parseInt($scope.userId)

      $scope.submitReport = () ->
        report = new ReportsService($scope.report)
        report.$save({player_id: playerId}, (data)->
          $scope.reports.unshift($scope.report)
          $scope.report = { user_id : $scope.userId, player_id: playerId }
        )
  ]
)()
