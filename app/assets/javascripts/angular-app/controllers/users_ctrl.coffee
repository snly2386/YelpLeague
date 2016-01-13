(->
  app = angular.module('yelpleague')

  app.controller 'UsersCtrl',[
    '$scope'
    'UsersService'
    'ReportsByUserService'
    'AvatarService'

    ($scope, UsersService, ReportsByUserService, AvatarService) ->
      $scope.userId = $("#user-id").text()
      $scope.providerAvatars = []
      $scope.activeTab = 'dashboard'
      UsersService.get({id: $scope.userId}, (data)->
        $scope.user = data.user
        $scope.$broadcast('userFound', $scope.user)
        $scope.providerAvatars.push('hi')
      )

      ReportsByUserService.get({id: $scope.userId}, (data) ->
        $scope.reports = data.reports
      )


      AvatarService.get_all()
        .then(
          (response) ->
            $scope.avatars = response.data.avatars
        )
  ]
)()
