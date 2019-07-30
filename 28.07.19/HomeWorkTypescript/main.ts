class Question {

    constructor(public qText: string) {
    }
    public toString() {
        return `The question is "` + this.qText + `"`;
    }
    set(qText: string) {

    }
    public getCorrectAnswer(correctanswer: string) {
        return correctanswer;
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
    private answers:Array<String>;
    private numberOfAnswers: number;
    private correctAnswerIndex: number;
    constructor(qText: string, answer: string, numberOfAnswers: number, correctAnswerIndex: number) {
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

    addCorrectAnswer(answer: string) {
        if (this.answers.length < 6){
            this.correctAnswerIndex = this.answers.length;
            this.answers[this.answers.length]= answer;
            return'';     
        }else{
            return;
        }

    }

    addAnswer(answer: string) {
        if (this.answers.length < 6){
            this.answers[this.answers.length]= answer;
            return'';     
        }else{
            return;
        }

    }
    
    getCorrectAnswer() {
        return `The correct answer is "` + this.answers[this.correctAnswerIndex] + `"`;
    }
}
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
console.log(question2.getCorrectAnswer());question2.addCorrectAnswer("West");
question2.print();
console.log(question2.getCorrectAnswer());
question2.addCorrectAnswer("North");
question2.print();
console.log(question2.getCorrectAnswer());
question2.addCorrectAnswer("south");
question2.print();
console.log(question2.getCorrectAnswer());



