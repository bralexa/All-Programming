class Question {

    constructor(public qText: string) {
        this.qText = qText;
    }
    public toString() {
        return `The question is "` + this.qText + `"`;
    }
    set(qText: string) {
        this.qText = qText;
    }

    public addCorrectAnswer(correctanswer: string) {
        return correctanswer;
    }
}

class ShortAnswerQuestion extends Question {
    answer: string;

    constructor(qText: string, answer: string) {
        super(qText);
        this.answer = answer;

    }
    public getCorrectAnswer() {
        return `The correct answer is "` + this.answer + `"`;
    }
    public addCorrectAnswer(answer: string) {
        return this.answer = answer;
    }
}

class MultipleChoiceQuestion extends Question {
    answers: Array<String>;
    numberOfAnswers: number;
    correctAnswerIndex: number;
    constructor(qText: string, answer: string, numberOfAnswers: number, correctAnswerIndex: number) {
        super(qText);
        this.answers = new Array();
        this.answers[0] = answer;
        this.numberOfAnswers = numberOfAnswers;
        this.correctAnswerIndex = correctAnswerIndex;

    }
    public print() {
        console.log(`The question is "` + this.qText + `"\nAnswers:\n`);
        for (let i = 0; i < this.answers.length; i++) {
            console.log(`answer ` + (i + 1) + ` is "` + this.answers[i] + `"`);
        }
    }

    public addCorrectAnswer(answer: string):string {
        if (this.answers.length < 6) {
            this.correctAnswerIndex = this.answers.length;
            this.answers.push(answer);
        } else {
            return;
        }

    }

    public addAnswer(answer: String) {
        if (this.answers.length < 6) {
            this.numberOfAnswers = this.answers.length;
            this.answers.push(answer);
        } else {
            return;
        }

    }

    public getCorrectAnswer() {
        return `The correct answer is "` + this.answers[this.correctAnswerIndex] + `"`;
    }
}

class QuestionsCatalog {
    questions: Array<MultipleChoiceQuestion> = new Array(20);
    counter: number;
    private short = 1;
    private multiple = 2;
    private both = 3;
    constructor() {
    }

    addQuestion(question) {
        for (let i = 0; i < 20; i++) {
            if (this.questions[i]) {
            }
            else {
                this.questions[i] = question;
                return;
            }
        }
    }
    public generatedQuestionnaire = Array<MultipleChoiceQuestion>();
    generateQuestionnaire(num:number, type:number) {

        var counter: number = 0;
        var tempGeneratedQuestionnaire = Array<MultipleChoiceQuestion>();

        switch (type) {
            case 1: {
                for (let i = 0; i < 20; i++) {
                    if (typeof this.questions[i] !== 'undefined' && this.questions[i].numberOfAnswers == 1) {
                        tempGeneratedQuestionnaire.push(this.questions[i]);
                    } else {
                        counter++;
                    }
                }

                if (num < tempGeneratedQuestionnaire.length) {
                    counter = num;
                } else {
                    counter = tempGeneratedQuestionnaire.length;
                }
                for (let i = 0; i < counter; i++) {
                    var rand = tempGeneratedQuestionnaire.indexOf(tempGeneratedQuestionnaire[Math.floor(Math.random() * tempGeneratedQuestionnaire.length)]);
                    var item = tempGeneratedQuestionnaire.splice(rand, 1);
                    this.generatedQuestionnaire.push(item[0]);
                }
                break;
            }
            case 2: {
                for (let i = 0; i < 20; i++) {
                    if (typeof this.questions[i] !== 'undefined' && this.questions[i].numberOfAnswers > 1) {
                        tempGeneratedQuestionnaire.push(this.questions[i]);
                    }
                }

                if (num < tempGeneratedQuestionnaire.length) {
                    counter = num;
                } else {
                    counter = tempGeneratedQuestionnaire.length;
                }
                for (let i = 0; i < counter; i++) {
                    var rand = tempGeneratedQuestionnaire.indexOf(tempGeneratedQuestionnaire[Math.floor(Math.random() * tempGeneratedQuestionnaire.length)]);
                    var item = tempGeneratedQuestionnaire.splice(rand, 1);
                    this.generatedQuestionnaire.push(item[0]);
                }
                break;
            }
            case 3: {
                for (let i = 0; i < 20; i++) {
                    if (typeof this.questions[i] !== 'undefined') {
                        tempGeneratedQuestionnaire.push(this.questions[i]);
                    } else {
                        counter++;
                    }
                }

                if (num < tempGeneratedQuestionnaire.length) {
                    counter = num;
                } else {
                    counter = tempGeneratedQuestionnaire.length;
                }
                for (let i = 0; i < counter; i++) {
                    var rand = tempGeneratedQuestionnaire.indexOf(tempGeneratedQuestionnaire[Math.floor(Math.random() * tempGeneratedQuestionnaire.length)]);
                    var item = tempGeneratedQuestionnaire.splice(rand, 1);
                    this.generatedQuestionnaire.push(item[0]);

                }
                break;
            }
            default: {
                
                break;
            }
        }
    }

}



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






cat.generateQuestionnaire(4, 2);
console.log(cat.generatedQuestionnaire);

