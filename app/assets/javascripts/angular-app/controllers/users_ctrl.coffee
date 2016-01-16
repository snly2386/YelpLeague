(->
  app = angular.module('yelpleague')

  app.controller 'UsersCtrl',[
    '$scope'
    '$rootScope'
    'UsersService'
    'ReportsByUserService'
    'AvatarService'

    ($scope, $rootScope, UsersService, ReportsByUserService, AvatarService) ->
      $scope.userId = $("#user-id").text()
      $scope.providerAvatars = []
      $scope.activeTab = 'dashboard'
      UsersService.get({id: $scope.userId}, (data)->
        $scope.user = data.user
        $scope.$broadcast('userFound', $scope.user)
        $scope.activeAvatar = $scope.user.avatar
        $scope.providers = $scope.user.providers
        $scope.providerAvatars.push({ name:provider.name, providerImage: provider.image, image: provider.image }) for provider in $scope.providers when $scope.providers.length
      )

      ReportsByUserService.get({id: $scope.userId}, (data) ->
        $scope.reports = data.reports
      )

      $scope.$on('userFound', ()->
        AvatarService.get_all()
          .then(
            (response) ->
              $scope.avatars = response.data.avatars
          )
      )
  ]
)()
