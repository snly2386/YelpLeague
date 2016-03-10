(->
  app = angular.module('yelpleague')

  app.controller 'MainCtrl',[
    '$scope'

    ($scope) ->
      $scope.noticeMsg = $('#notice').text()
      $scope.avatar = $('#avatar').text() || '/assets/default_avatar.jpg'

      $scope.noticeAlert = (msg) ->
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
        notification = new NotificationFx(
          message: "<div class='ns-thumb'><img src='/assets/teemo.png'/></div><div class='ns-content ns-error'><p>#{msg}</p></div>"
          layout: 'other'
          effect: 'thumbslider'
          type: 'notice'
          ttl: 10000
          onClose: ->
            true
        )
        notification.show()

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

      angular.element(document).ready( ()->
          console.log $scope.noticeMsg
          $scope.noticeAlert($scope.noticeMsg) if $scope.noticeMsg
      )
  ]
)()
