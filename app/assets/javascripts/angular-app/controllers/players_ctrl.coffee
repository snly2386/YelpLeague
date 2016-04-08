(->
  app = angular.module('yelpleague')

  app.controller 'PlayersCtrl',[
    '$scope'
    'ReportsService'
    'PlayersService'
    'BookmarkService'
    'UpvoteService'
    'ReportsDataService'

    ($scope, ReportsService, PlayersService, BookmarkService, UpvoteService, ReportsDataService) ->
      playerId = $("#player-id").text()
      $scope.userId = $("#user-id").text()
      avatar = $("#avatar").text()
      username = $("#username").text()
      $scope.ratingOptions = [1, 2, 3, 4, 5]
      $scope.report = { user_id : $scope.userId, player_id: playerId, user: { avatar: avatar, username: username, id: $scope.userId } }

      ReportsService.get( {player_id: playerId }, (data) ->
        $scope.reports = data.reports
      )

      ReportsDataService.get(playerId)
        .then(
          (response) ->
            console.log response
            $scope.positiveReviewCount = response.data.positive
            $scope.negativeReviewCount = response.data.negative
          (errorResponse) ->
        )

      PlayersService.get( {id: playerId}, (data) ->
        $scope.avgRating = data.average_rating
        $scope.player = data.player
        $scope.reportedByUser = data.reported_by_user
        $scope.bookmarked = data.bookmarked
      )

      $scope.$on('editedReport', (event, data) ->
        for report in $scope.reports
          if parseInt(report.user.id) == parseInt($scope.userId)
            for k,v of report.report
              report.report[k] = data[k]
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
          if $scope.report.rating >= 3
            $scope.positiveReviewCount += 1
          else
            $scope.negativeReviewCount += 1


          $scope.report = { user_id : $scope.userId, player_id: playerId }
          $scope.reportedByUser = true
          $scope.$emit('submittedReport', 'Review Sucessfully Submitted')
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
              $scope.$emit('bookmarkNotice', 'Player Successfully Bookmarked')
            (errorResponse) ->
              $scope.errorAlert(errorResponse.data.message)
          )


      $scope.unbookmark = () ->
        BookmarkService.unbookmark(playerId)
          .then(
            (response) ->
              $scope.bookmarked = response.data
              $scope.$emit('unbookmarkNotice', 'Player Successfully Unbookmarked')
            (errorResponse) ->
              $scope.errorAlert(errorResponse.data.message)
          )

      $scope.userReview = (reportId) ->
        'userReview' if reportId == parseInt $scope.userId

      $scope.initializeShareReview = (report) ->
        $scope.sharedReport = report

      $scope.shareReview = () ->
        FB.ui(
            {
              method: 'share'
              href: "http://104.131.111.127:8080/players/#{playerId}"
              picture: "https://s3-us-west-2.amazonaws.com/ggreported/profileicon/#{$scope.player.icon}.png"
              title: "Player Review"
              description: "#{username}'s review of #{$scope.player.display_name}",
              caption: "#{$scope.sharedReport.message.substring(1, 10)}"
            },
            (response) ->
              if (response && !response.error_message)
                $scope.emit('facebookSuccess', 'Successfully posted to Facebook')
              else
                $scope.emit('facebookError', 'Error posting to Facebook')

          )

      $scope.initializeDeleteReport = (report, index) ->
        $scope.pendingDeleteReport = report
        $scope.pendingDeleteReportIndex = index

      $scope.deleteReview = () ->
        ReportsService.remove($scope.pendingDeleteReport, (data) ->
          $scope.reports.splice($scope.pendingDeleteReportIndex, 1)
          if $scope.pendingDeleteReport.rating >= 3
            $scope.positiveReviewCount -= 1
          else
            $scope.negativeReviewCount -= 1

          $('#deleteReviewModal').modal('hide')
          $scope.$emit('deleteReview', 'Review Successfully Deleted')
          $scope.reportedByUser = false
        )

  ]
)()
