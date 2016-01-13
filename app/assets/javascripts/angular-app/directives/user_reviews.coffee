app = angular.module('yelpleague')
app.directive 'userReviews', [ () ->
    scope: false
    link: (scope, element, attrs) ->
      scope.$on('userFound', (event, data)->
        scope.user = data
      )
    templateUrl: 'reviews.html'
 ]