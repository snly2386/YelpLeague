(->
  app = angular.module('yelpleague')

  app.controller 'HomeCtrl',[
    '$scope'
    'PlayersService'
    'BookmarkService'

    ($scope, PlayersService, BookmarkService) ->
      PlayersService.get((data)->
        console.log data
        $scope.players = data.players
      )

      $scope.bookmarkPlayer = (playerId, index) ->
        BookmarkService.bookmark(playerId)
          .then((response) ->
            $scope.players[index].bookmarked = response.data
          )

      $scope.unbookmarkPlayer = (playerId, index) ->
        console.log 'hi'
        BookmarkService.unbookmark(playerId)
          .then((response) ->
            $scope.players[index].bookmarked = response.data
          )

  ]
)()
