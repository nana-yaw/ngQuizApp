(function() {
    angular
        .module("turtleFacts")
        .controller("resultsCtrl", ResultsController);

        ResultsController.$inject = ['quizMetrics', 'DataService']

        function ResultsController(quizMetrics, DataService) {
            var vm = this;

            vm.quizMetrics = quizMetrics;
            vm.dataService = DataService;
            vm.getAnswerClass = getAnswerClass;
            vm.setActiveQuestion = setActiveQuestion;
            vm.calculatePerc = calculatePerc;
            vm.reset = reset;
            vm.activeQuestion = 0;

            function reset() {
                quizMetrics.changeState("results", false);
                quizMetrics.numCorrect = 0;

                for (let index = 0; index < DataService.quizQuestions.length; index++) {
                    
                    let data = DataService.quizQuestions[index];

                    data.selected = null;
                    data.correct = null;
                    
                }
            }

            function calculatePerc() {
                let answer = quizMetrics.numCorrect / DataService.quizQuestions.length * 100;
                // console.log("Score Percentage: ", answer);
                return answer;
            }

            function setActiveQuestion(index) {
                vm.activeQuestion = index;
            }

            function getAnswerClass(index) {
                if (index === quizMetrics.correctAnswers[vm.activeQuestion]) {
                    return "bg-success";
                }else if (index === DataService.quizQuestions[vm.activeQuestion].selected) {
                    return "bg-danger";
                }
            }
        }
})();