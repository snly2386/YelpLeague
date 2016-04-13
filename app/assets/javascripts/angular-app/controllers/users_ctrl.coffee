(->
  app = angular.module('yelpleague')

  app.controller 'UsersCtrl',[
    '$scope'
    '$rootScope'
    'UsersService'
    'ReportsByUserService'
    'AvatarService'

    ($scope, $rootScope, UsersService, ReportsByUserService, AvatarService) ->
      $scope.$emit('loaderPresent', true)
      $scope.userId = $("#user-id").text()
      $scope.providerAvatars = []
      $scope.activeTab = 'dashboard'
      UsersService.get({id: $scope.userId}, (data)->
        $scope.user = data.user
        $scope.userBookmarkCount = $scope.user.bookmarks.length
        $scope.providerNames = $.map($scope.user.providers, (val, i) ->
          val.name
        )
        $scope.$broadcast('userFound', $scope.user)
        $scope.activeAvatar = $scope.user.avatar
        $scope.providers = $scope.user.providers
        $scope.$emit('loaded', true)

        # $scope.providerAvatars.push({ name:provider.name, providerImage: provider.image, image: provider.image }) for provider in $scope.providers when $scope.providers.length
      )

      ReportsByUserService.get({id: $scope.userId}, (data) ->
        $scope.reports = data.reports
        console.log $scope.reports
        $scope.reportsCount = $scope.reports.length
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
