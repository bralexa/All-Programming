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
        this.qText = qText;
    }
    Question.prototype.toString = function () {
        return "The question is \"" + this.qText + "\"";
    };
    Question.prototype.set = function (qText) {
        this.qText = qText;
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
            return this.answers;
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
var QuestionsCatalog = /** @class */ (function () {
    function QuestionsCatalog() {
        this.questions = new Array(20);
        this.short = 1;
        this.multiple = 2;
        this.both = 3;
    }
    QuestionsCatalog.prototype.addQuestion = function (question) {
        for (var i = 0; i < 20; i++) {
            if (this.questions[i]) {
            }
            else {
                this.questions[i] = question;
                return;
            }
        }
    };
    return QuestionsCatalog;
}());
var cat = new QuestionsCatalog();
var q1 = new MultipleChoiceQuestion("bubu", "nunu", 1, 0);
cat.addQuestion(q1);
var q2 = new MultipleChoiceQuestion("kuku4", "aku4", 6, 0);
q2.addAnswer("aku44");
q2.addAnswer("aku444");
cat.addQuestion(q2);
console.log(cat.questions);
console.log(cat.questions[1].getCorrectAnswer());
console.log(cat.questions[0].getCorrectAnswer());
cat.questions[1].print();
cat.questions[0].print();
