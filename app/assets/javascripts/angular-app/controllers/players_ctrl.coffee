(->
  app = angular.module('yelpleague')

  app.controller 'PlayersCtrl',[
    '$scope'
    'ReportsService'
    'PlayersService'
    'BookmarkService'
    'UpvoteService'

    ($scope, ReportsService, PlayersService, BookmarkService, UpvoteService) ->
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
        $scope.bookmarked = data.bookmarked
        console.log data
      )

      $scope.$on('editedReport', (event, data) ->
        for report in $scope.reports
          if report.user.id == parseInt($scope.userId)
            for k,v of report.report
              report.report[k] = data[k]
      )

      $scope.upvoteReview = (review, index) ->
        UpvoteService.upvote(review.report.id)
          .then(
            (response) ->
              for report in $scope.reports
                if report.report.id == review.report.id
                  report.upvoted_by_user = response.data
                  report.total_upvotes += 1
                  report.total_downvotes -= 1 if report.voted_by_user
                  report.downvoted_by_user = false
            (errorResponse) ->
              $scope.$emit('upvoteError', errorResponse.data.message)
          )



      $scope.downvoteReview = (review, index) ->
        UpvoteService.downvote(review.report.id)
          .then(
            (response) ->
              for report in $scope.reports
                if report.report.id == review.report.id
                  report.downvoted_by_user = response.data
                  report.total_downvotes += 1
                  report.total_upvotes -= 1 if report.voted_by_user
                  report.upvoted_by_user = false
            (errorResponse) ->
              $scope.$emit('upvoteError', errorResponse.data.message)
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
          $scope.reports.unshift({
            report: data.report
            downvoted_by_user: false
            total_downvotes: 0
            total_upvotes: 0
            upvoted_by_user: false
            user: $scope.report.user
            vote_difference: 0
            voted_by_user: false
          })
          $scope.report = { user_id : $scope.userId, player_id: playerId }
        )

      $scope.upvoteTemplate = (report) ->
        voteDifference = report.total_upvotes - report.total_downvotes
        if voteDifference > 1 || voteDifference < -1
          "#{voteDifference} points"
        else if voteDifference == 1 || voteDifference == -1
          "#{voteDifference} point"

      $scope.bookmark = () ->
        BookmarkService.bookmark(playerId)
          .then(
            (response) ->
              $scope.bookmarked = response.data
            (errorResponse) ->
              $scope.errorAlert(errorResponse.data.message)
          )


      $scope.unbookmark = () ->
        BookmarkService.unbookmark(playerId)
          .then(
            (response) ->
              $scope.bookmarked = response.data
            (errorResponse) ->
              $scope.errorAlert(errorResponse.data.message)
          )
  ]
)()
