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
        this.generatedQuestionnaire = Array();
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
    QuestionsCatalog.prototype.generateQuestionnaire = function (num, type) {
        var counter = 0;
        var tempGeneratedQuestionnaire = Array();
        switch (type) {
            case 1: {
                for (var i = 0; i < 20; i++) {
                    if (typeof this.questions[i] !== 'undefined' && this.questions[i].numberOfAnswers == 1) {
                        tempGeneratedQuestionnaire.push(this.questions[i]);
                    }
                    else {
                        counter++;
                    }
                }
                if (num < tempGeneratedQuestionnaire.length) {
                    counter = num;
                }
                else {
                    counter = tempGeneratedQuestionnaire.length;
                }
                for (var i = 0; i < counter; i++) {
                    var rand = tempGeneratedQuestionnaire.indexOf(tempGeneratedQuestionnaire[Math.floor(Math.random() * tempGeneratedQuestionnaire.length)]);
                    for (var j = 0; j < this.generatedQuestionnaire.length; j++) {
                        if (this.generatedQuestionnaire[j].qText == tempGeneratedQuestionnaire[rand].qText) {
                            break;
                        }
                        else { }
                    }
                    this.generatedQuestionnaire.push(tempGeneratedQuestionnaire[rand]);
                }
                break;
            }
            case 2: {
                for (var i = 0; i < 20; i++) {
                    if (typeof this.questions[i] !== 'undefined' && this.questions[i].numberOfAnswers > 1) {
                        tempGeneratedQuestionnaire.push(this.questions[i]);
                    }
                }
                console.log(tempGeneratedQuestionnaire);
                if (num < tempGeneratedQuestionnaire.length) {
                    counter = num;
                }
                else {
                    counter = tempGeneratedQuestionnaire.length;
                }
                for (var i = 0; i < counter; i++) {
                    var rand = tempGeneratedQuestionnaire.indexOf(tempGeneratedQuestionnaire[Math.floor(Math.random() * tempGeneratedQuestionnaire.length)]);
                    for (var j = 0; j < this.generatedQuestionnaire.length; j++) {
                        console.log(this.generatedQuestionnaire[j]);
                        console.log(tempGeneratedQuestionnaire[rand]);
                        if (this.generatedQuestionnaire[j].qText == tempGeneratedQuestionnaire[rand].qText) {
                            break;
                        }
                        else { }
                    }
                    this.generatedQuestionnaire.push(tempGeneratedQuestionnaire[rand]);
                }
                break;
            }
            case 3: {
                for (var i = 0; i < 20; i++) {
                    if (typeof this.questions[i] !== 'undefined') {
                        tempGeneratedQuestionnaire.push(this.questions[i]);
                    }
                    else {
                        counter++;
                    }
                }
                if (num < tempGeneratedQuestionnaire.length) {
                    counter = num;
                }
                else {
                    counter = tempGeneratedQuestionnaire.length;
                }
                for (var i = 0; i < counter; i++) {
                    var rand = tempGeneratedQuestionnaire.indexOf(tempGeneratedQuestionnaire[Math.floor(Math.random() * tempGeneratedQuestionnaire.length)]);
                    for (var j = 0; j < this.generatedQuestionnaire.length; j++) {
                        if (this.generatedQuestionnaire[j].qText === tempGeneratedQuestionnaire[rand].qText) {
                            break;
                        }
                    }
                    this.generatedQuestionnaire.push(tempGeneratedQuestionnaire[rand]);
                }
                break;
            }
            default: {
                //statements; 
                break;
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
var q1 = new MultipleChoiceQuestion("bubu2", "nunu2", 1, 0);
cat.addQuestion(q1);
q1.addAnswer("aku44");
q1.addAnswer("aku444");
var q1 = new MultipleChoiceQuestion("bubu3", "nunu3", 1, 0);
cat.addQuestion(q1);
var q1 = new MultipleChoiceQuestion("bubu4", "nunu4", 1, 0);
cat.addQuestion(q1);
var q1 = new MultipleChoiceQuestion("bubu5", "nunu5", 1, 0);
cat.addQuestion(q1);
var q1 = new MultipleChoiceQuestion("bubu6", "nunu6", 1, 0);
cat.addQuestion(q1);
console.log(cat.questions);
cat.generateQuestionnaire(7, 2);
console.log(cat.generatedQuestionnaire);
