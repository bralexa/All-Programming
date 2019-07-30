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
    public addCorrectAnswer(answer:string) {
        return this.answer = answer;
    }
}

class MultipleChoiceQuestion extends Question {
    answers:Array<String>;
    numberOfAnswers: number;
    correctAnswerIndex: number;
    constructor(qText: string, answer:string, numberOfAnswers: number, correctAnswerIndex: number) {
        super(qText);
        this.answers = new Array();
        this.answers[0] = answer;
        this.numberOfAnswers = numberOfAnswers;
        this.correctAnswerIndex = correctAnswerIndex;
        
    }
    public print(){
        console.log(`The question is "` + this.qText + `"\nAnswers:\n`);
        for (let i = 0; i < this.answers.length; i++){
         console.log(`answer ` + (i+1) + ` is "` + this.answers[i] + `"`);
        }
    }

    public addCorrectAnswer(answer: string) {
        if (this.answers.length < 6){
            this.correctAnswerIndex = this.answers.length;
            this.answers[this.answers.length]= answer;
            return'';     
        }else{
            return;
        }

    }

    public addAnswer(answer:String) {
        if (this.answers.length < 6){
            this.answers[this.answers.length]= answer;
            return this.answers;     
        }else{
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
    constructor(){
    }

    addQuestion(question){
        for (let i=0; i<20; i++){
            if (this.questions[i]){
            }
            else{
                this.questions[i] = question;
                return;
            }        
        }
    }
    
}
var cat = new QuestionsCatalog();
var q1 = new MultipleChoiceQuestion("bubu","nunu",1,0);
cat.addQuestion(q1);
var q2 = new MultipleChoiceQuestion("kuku4","aku4",6,0);
q2.addAnswer("aku44");
q2.addAnswer("aku444");
cat.addQuestion(q2);



console.log(cat.questions);
console.log(cat.questions[1].getCorrectAnswer());
console.log(cat.questions[0].getCorrectAnswer());
cat.questions[1].print();
cat.questions[0].print();

