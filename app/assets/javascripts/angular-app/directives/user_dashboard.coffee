app = angular.module('yelpleague')
app.directive 'userDashboard', [ "UsersService", (UsersService) ->
    scope: false
    link: (scope, element, attrs) ->
      scope.$on('userFound', (event, data)->
        scope.user = data
      )

      scope.setAvatar = () ->
        UsersService.update(angular.extend({id: scope.userId}, {avatar: scope.activeAvatar})
          (data) ->
            scope.user.avatar = data.user.avatar
            $("#avatar-modal").modal('hide')
            scope.$emit('updated-avatar', data.user.avatar)

        )

      scope.setActiveAvatar = (image) ->
        scope.activeAvatar = image

      $("#avatar-modal").on('hidden.bs.modal', ()->
        scope.$apply(
          ()->
            scope.activeAvatar = scope.user.avatar
        )
      )

    templateUrl: 'dashboard.html'
 ]