app = angular.module('yelpleague')
app.directive 'upvoteTool', ['UpvoteService', (UpvoteService) ->
    scope: false
    link: (scope, element, attrs) ->
      scope.upvoteTemplate = (report) ->
        voteDifference = report.total_upvotes - report.total_downvotes
        if voteDifference > 1 || voteDifference < -1
          "#{voteDifference} points"
        else if voteDifference == 1 || voteDifference == -1
          "#{voteDifference} point"

      scope.upvoteReview = (review, index) ->
        UpvoteService.upvote(review.report.id)
          .then(
            (response) ->
              for report in scope.reports
                if report.report.id == review.report.id
                  report.upvoted_by_user = response.data
                  report.total_upvotes += 1
                  report.total_downvotes -= 1 if report.voted_by_user
                  report.downvoted_by_user = false
            (errorResponse) ->
              scope.$emit('upvoteError', errorResponse.data.message)
          )


      scope.downvoteReview = (review, index) ->
        UpvoteService.downvote(review.report.id)
          .then(
            (response) ->
              for report in scope.reports
                if report.report.id == review.report.id
                  report.downvoted_by_user = response.data
                  report.total_downvotes += 1
                  report.total_upvotes -= 1 if report.voted_by_user
                  report.upvoted_by_user = false
            (errorResponse) ->
              scope.$emit('upvoteError', errorResponse.data.message)
          )


    templateUrl: 'upvote_tool.html'
 ]