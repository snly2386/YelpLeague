(->
  app = angular.module('yelpleague')

  app.controller 'MainCtrl',[
    '$scope'

    ($scope) ->
      $scope.noticeMsg = $('#notice').text()
      $scope.avatar = $('#avatar').text() || '/assets/default-avatar.jpg'

      $scope.noticeAlert = (msg) ->
        notification = new NotificationFx(
          message: "<div class='ns-thumb'><img src=#{$scope.avatar} /></div><div class='ns-content ns-notice'><p>#{msg}</p></div>"
          layout: 'other'
          effect: 'thumbslider'
          type: 'notice'
          ttl: 6000
          onClose: ->
            true
        )
        #show the notification
        notification.show()

      $scope.$on('updated-avatar', (event, data) ->
        $scope.avatar = data
        $scope.noticeAlert("Updated profile photo")
      )

      $scope.$on('editedReport', (event, data) ->
        console.log 'hi'
        $scope.noticeAlert("Successfully Edited Review")
      )

      angular.element(document).ready( ()->
          console.log $scope.noticeMsg
          $scope.noticeAlert($scope.noticeMsg) if $scope.noticeMsg
      )
  ]
)()
