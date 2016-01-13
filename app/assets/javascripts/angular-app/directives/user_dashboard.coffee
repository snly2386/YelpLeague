app = angular.module('yelpleague')
app.directive 'userDashboard', [ () ->
    scope: false
    link: (scope, element, attrs) ->
      scope.$on('userFound', (event, data)->
        scope.user = data
      )

      scope.setAvatar = () ->
        console.log 'avatar set'

    templateUrl: 'dashboard.html'
 ]