(->
  app = angular.module('yelpleague')

  app.controller 'UserProfileCtrl',[
    '$scope'
    'ReportsByUserService'

    ($scope, ReportsByUserService) ->
      userId = $('#user-id').text()

      ReportsByUserService.get({id: userId}, (data) ->
        $scope.reports = data.reports
        console.log $scope.reports
      )
  ]
)()
