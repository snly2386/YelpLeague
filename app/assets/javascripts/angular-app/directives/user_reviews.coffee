app = angular.module('yelpleague')
app.directive 'userReviews', ['ReportsService', (ReportsService) ->
    scope: false
    link: (scope, element, attrs) ->
      scope.$on('userFound', (event, data)->
        scope.user = data
      )

      scope.setEditedReview = (review) ->
        scope.editedReview = review

      scope.setDeletedReview = (report, review) ->
        scope.deletedReviewObject = report
        scope.deletedReviewPlayer = report.player.display_name
        scope.deletedReview = review

      scope.deleteReview = () ->
        ReportsService.remove(scope.deletedReview, (data)->
          scope.$emit('reviewDeletedNotice', 'Review Successfully Deleted')
          index = scope.reports.indexOf(scope.deletedReviewObject)
          scope.reports.splice(index, 1)
          $('#delete-review-modal').modal('hide')
        )

      scope.updateReview = () ->
        if scope.editReviewForm.$valid
          ReportsService.update(scope.editedReview, (data)->
            $('#edit-review-modal').modal('hide')
            scope.$emit('updateReviewNotice', "Review Successfully Updated")
          )
        else
          scope.$emit('updateReviewError', 'Please fill in all required fields')

    templateUrl: 'reviews.html'
 ]
