(function () {
    
    angular
    .module("turtleFacts")
    .factory("quizMetrics", QuizMetrics)

    QuizMetrics.$inject = ['DataService'];

    function QuizMetrics(DataService) {
        
        var quizObj = {
            quizActive: false,
            resultsActive: false,
            changeState: changeState,
            correctAnswers: [],
            markQuiz: markQuiz,
            numCorrect: 0
        }

        return quizObj;

        function changeState(metric, state) {
            if (metric === "quiz") {
                quizObj.quizActive = state
            }else if (metric === "results") {
                quizObj.resultsActive = state;
            }else{
                return false;
            }
        }

        function markQuiz() {
            quizObj.correctAnswers = DataService.correctAnswers;
            for (let index = 0; index < DataService.quizQuestions.length; index++) {
                if (DataService.quizQuestions[index].selected === DataService.correctAnswers[index]) {
                    DataService.quizQuestions[index].correct = true;
                    quizObj.numCorrect++;
                }else {
                    DataService.quizQuestions[index].correct = false;
                }
                
            }
        }

    }

})();