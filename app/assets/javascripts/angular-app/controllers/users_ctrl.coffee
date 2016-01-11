(->
  app = angular.module('yelpleague')

  app.controller 'UsersCtrl',[
    '$scope'
    'UsersService'

    ($scope, UsersService) ->
      $scope.userId = $("#user-id").text()
      UsersService.get({id: $scope.userId}, (data)->
        $scope.user = data.user
        $scope.$broadcast('userFound', $scope.user)
      )
  ]
)()
