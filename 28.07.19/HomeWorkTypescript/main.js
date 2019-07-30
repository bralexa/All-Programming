var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Question = /** @class */ (function () {
    function Question(qText) {
        this.qText = qText;
    }
    Question.prototype.toString = function () {
        return "The question is \"" + this.qText + "\"";
    };
    Question.prototype.set = function (qText) {
    };
    Question.prototype.getCorrectAnswer = function (correctanswer) {
        return correctanswer;
    };
    Question.prototype.addCorrectAnswer = function (correctanswer) {
        return correctanswer;
    };
    return Question;
}());
var ShortAnswerQuestion = /** @class */ (function (_super) {
    __extends(ShortAnswerQuestion, _super);
    function ShortAnswerQuestion(qText, answer) {
        var _this = _super.call(this, qText) || this;
        _this.answer = answer;
        return _this;
    }
    ShortAnswerQuestion.prototype.getCorrectAnswer = function () {
        return "The correct answer is \"" + this.answer + "\"";
    };
    ShortAnswerQuestion.prototype.addCorrectAnswer = function (answer) {
        return this.answer = answer;
    };
    return ShortAnswerQuestion;
}(Question));
var MultipleChoiceQuestion = /** @class */ (function (_super) {
    __extends(MultipleChoiceQuestion, _super);
    function MultipleChoiceQuestion(qText, answer, numberOfAnswers, correctAnswerIndex) {
        var _this = _super.call(this, qText) || this;
        _this.answers = new Array();
        _this.answers[0] = answer;
        _this.numberOfAnswers = numberOfAnswers;
        _this.correctAnswerIndex = correctAnswerIndex;
        return _this;
    }
    MultipleChoiceQuestion.prototype.print = function () {
        console.log("The question is \"" + this.qText + "\"\nAnswers:\n");
        for (var i = 0; i < this.answers.length; i++) {
            console.log("answer " + (i + 1) + " is \"" + this.answers[i] + "\"");
        }
    };
    MultipleChoiceQuestion.prototype.addCorrectAnswer = function (answer) {
        if (this.answers.length < 6) {
            this.correctAnswerIndex = this.answers.length;
            this.answers[this.answers.length] = answer;
            return '';
        }
        else {
            return;
        }
    };
    MultipleChoiceQuestion.prototype.addAnswer = function (answer) {
        if (this.answers.length < 6) {
            this.answers[this.answers.length] = answer;
            return '';
        }
        else {
            return;
        }
    };
    MultipleChoiceQuestion.prototype.getCorrectAnswer = function () {
        return "The correct answer is \"" + this.answers[this.correctAnswerIndex] + "\"";
    };
    return MultipleChoiceQuestion;
}(Question));
var question2 = new MultipleChoiceQuestion("Where is the sun rise?", "East", 4, 0);
question2.print();
console.log(question2.getCorrectAnswer());
question2.addCorrectAnswer("West");
question2.print();
console.log(question2.getCorrectAnswer());
question2.addAnswer("North");
question2.print();
console.log(question2.getCorrectAnswer());
question2.addCorrectAnswer("south");
question2.print();
console.log(question2.getCorrectAnswer());
question2.addCorrectAnswer("West");
question2.print();
console.log(question2.getCorrectAnswer());
question2.addCorrectAnswer("North");
question2.print();
console.log(question2.getCorrectAnswer());
question2.addCorrectAnswer("south");
question2.print();
console.log(question2.getCorrectAnswer());
