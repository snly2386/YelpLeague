(->
  app = angular.module("yelpleague")

  app.factory "ReportsService", [
    "$http"
    "$resource"

    ($http, $resource) ->

      $resource("/players/:id/reports.json"
        { id: '@id' }
      )

  ]
)()
