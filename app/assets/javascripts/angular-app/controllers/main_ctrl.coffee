(->
  app = angular.module('yelpleague')

  app.controller 'MainCtrl',[
    '$scope'

    ($scope) ->
      $scope.noticeAlert = (msg) ->
        $('.ns-box').hide()
        notification = new NotificationFx(
          message: "<div class='ns-thumb'><img src=#{$scope.avatar} /></div><div class='ns-content ns-notice'><p>#{msg}</p></div>"
          layout: 'other'
          effect: 'thumbslider'
          type: 'notice'
          ttl: 10000
          onClose: ->
            true
        )
        #show the notification
        notification.show()

      $scope.errorAlert = (msg) ->
        $('.ns-box').hide()
        notification = new NotificationFx(
          message: "<div class='ns-thumb'><img src='https://s3-us-west-2.amazonaws.com/ggreported/default.png'/></div><div class='ns-content ns-error'><p>#{msg}</p></div>"
          layout: 'other'
          effect: 'thumbslider'
          type: 'notice'
          ttl: 10000
          onClose: ->
            true
        )
        notification.show()

      $scope.$on('loaderPresent', (event, data) ->
        $scope.loaderPresent = true
      )

      $scope.$on('loaded', (event, data) ->
        $scope.loaded = true
      )

      $scope.$on('upvoteError', (event, data) ->
        $scope.errorAlert("<a href='/users/sign_in'>#{data}</a>")
      )

      $scope.$on('updated-avatar', (event, data) ->
        $scope.avatar = data
        $scope.noticeAlert("Updated profile photo")
      )

      $scope.$on('editedReport', (event, data) ->
        $scope.noticeAlert("Successfully Edited Review")
      )

      $scope.$on('submittedReport', (event, data) ->
        $scope.noticeAlert(data)
      )

      $scope.$on('updateReviewError', (event, data) ->
        $scope.errorAlert(data)
      )

      $scope.$on("updateReviewNotice", (event, data) ->
        $scope.noticeAlert(data)
      )

      $scope.$on("reviewDeletedNotice", (event, data) ->
        $scope.noticeAlert(data)
      )

      $scope.$on("bookmarkNotice", (event, data) ->
        $scope.noticeAlert(data)
      )

      $scope.$on("unbookmarkNotice", (event, data) ->
        $scope.noticeAlert(data)
      )

      $scope.$on("deleteReview", (event, data) ->
        $scope.noticeAlert(data)
      )

      $scope.$on("facebookSuccess", (event, data) ->
        $scope.noticeAlert(data)
      )

      $scope.$on("facebookError", (event, data) ->
        $scope.errorAlert(data)
      )

      $scope.noticeMsg = $('#notice').text()
      $scope.avatar = $('#avatar').text() || 'https://s3-us-west-2.amazonaws.com/ggreported/default.png'
      $scope.alert = $('#alert').text()

      angular.element(document).ready( ()->
        $scope.noticeAlert($scope.noticeMsg) if $scope.noticeMsg
        $scope.errorAlert($scope.alert) if $scope.alert
      )
  ]
)()
