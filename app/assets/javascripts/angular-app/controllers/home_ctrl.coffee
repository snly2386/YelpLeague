(->
  app = angular.module('yelpleague')

  app.controller 'HomeCtrl',[
    '$scope'
    'PlayersService'
    'BookmarkService'

    ($scope, PlayersService, BookmarkService) ->
      $scope.$emit('loaderPresent', true)
      
      PlayersService.get((data)->
        console.log data
        $scope.players = data.players
        $scope.$emit('loaded', true)
      )

      $scope.bookmarkPlayer = (playerId, index) ->
        BookmarkService.bookmark(playerId)
          .then(
            (response) ->
              $scope.players[index].bookmarked = response.data
              $scope.$emit('bookmarkNotice', 'Player Successfully Bookmarked')
            (errorResponse) ->
              $scope.errorAlert(errorResponse.data.message)
          )


      $scope.unbookmarkPlayer = (playerId, index) ->
        BookmarkService.unbookmark(playerId)
          .then(
            (response) ->
              $scope.players[index].bookmarked = response.data
              $scope.$emit('unbookmarkNotice', 'Player Successfully Unbookmarked')
            (errorResponse) ->
              $scope.errorAlert(errorResponse.data.message)
          )

      $scope.errorAlert = (msg) ->
        notification = new NotificationFx(
          message: '<div class="ns-thumb"><img src="https://s3-us-west-2.amazonaws.com/ggreported/default.png"/></div><div class="ns-content ns-error"><p><a href="/users/sign_in">Sign In</a> to bookmark summoners. </p></div>'
          layout: 'other'
          effect: 'thumbslider'
          type: 'notice'
          ttl: 6000
          onClose: ->
            true
        )
        #show the notification
        notification.show()
  ]
)()
