(->
  app = angular.module("yelpleague")

  app.factory "ReportsByUserService", [
    "$http"
    "$resource"

    ($http, $resource) ->

      $resource("/users/:id/reports.json"
        { id: '@id' }
      )

  ]
)()
