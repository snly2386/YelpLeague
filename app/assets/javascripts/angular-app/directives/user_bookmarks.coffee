app = angular.module('yelpleague')
app.directive 'userBookmarks', [ () ->
    scope: false
    link: (scope, element, attrs) ->
      scope.$on('userFound', (event, data)->
        scope.user = data
      )
    templateUrl: 'bookmarks.html'
 ]