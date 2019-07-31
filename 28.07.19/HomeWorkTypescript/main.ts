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

    public addCorrectAnswer(answer: string) {
        if (this.answers.length < 6) {
            this.correctAnswerIndex = this.answers.length;
            this.answers[this.answers.length] = answer;
            return '';
        } else {
            return;
        }

    }

    public addAnswer(answer: String) {
        if (this.answers.length < 6) {
            this.answers[this.answers.length] = answer;
            return this.answers;
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
    generateQuestionnaire(num, type) {

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
                    for (let j = 0; j < this.generatedQuestionnaire.length; j++) {

                        if (this.generatedQuestionnaire[j].qText == tempGeneratedQuestionnaire[rand].qText) {
                            break;
                        }else{}
                    }
                    this.generatedQuestionnaire.push(tempGeneratedQuestionnaire[rand]);
                }
                break;
            }
            case 2: {
                for (let i = 0; i < 20; i++) {
                    if (typeof this.questions[i] !== 'undefined' && this.questions[i].numberOfAnswers > 1) {
                        tempGeneratedQuestionnaire.push(this.questions[i]);
                    }
                }
            console.log(tempGeneratedQuestionnaire);
                
                if (num < tempGeneratedQuestionnaire.length) {
                    counter = num;
                } else {
                    counter = tempGeneratedQuestionnaire.length;
                }
                for (let i = 0; i < counter; i++) {
                    var rand = tempGeneratedQuestionnaire.indexOf(tempGeneratedQuestionnaire[Math.floor(Math.random() * tempGeneratedQuestionnaire.length)]);
                    for (let j = 0; j < this.generatedQuestionnaire.length; j++) {
                        console.log(this.generatedQuestionnaire[j]);
                        console.log(tempGeneratedQuestionnaire[rand]);
                        
                        
                        if (this.generatedQuestionnaire[j].qText == tempGeneratedQuestionnaire[rand].qText) {
                            break;
                        }else{}
                    }
                    this.generatedQuestionnaire.push(tempGeneratedQuestionnaire[rand]);
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
                    for (let j = 0; j < this.generatedQuestionnaire.length; j++) {

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



console.log(cat.questions);


cat.generateQuestionnaire(7, 2);
console.log(cat.generatedQuestionnaire);
