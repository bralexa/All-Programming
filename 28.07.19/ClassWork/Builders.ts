class StringBuilder {
    private strs: string[];
    private counter: number;
    constructor() {
        this.strs = [];
        this.counter = 0;
    }

    appendDocumentTitle(str: string) {
        this.strs.push(str);
    }

    appendDocumentSubTitle(str: string) {
        this.strs.push(++this.counter + ': ' +str);
    }

    appendParagraph(str: string) {
        this.strs.push(str);
    }

    build(): string {
        return this.strs.join('\n');
    }

    
}



const sb = new StringBuilder();
sb.appendDocumentTitle('doc name');
for (let i=0; i < 10; i++) {
    if( i== 5) {
        continue;
    }
    sb.appendDocumentSubTitle('sub title '+ i);
    sb.appendParagraph('paragraph ' + i);
}

console.log(sb.build());


// q=London
// units=metric | imperial
// lang=zh_cn
// mode=xml | html
// key gipj4w8tj98tgu49w8gj89w4g 