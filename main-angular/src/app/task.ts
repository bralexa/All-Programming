
import { FamilyMember } from './family-member';


export interface ITask {
    id: number;
    description: string;
    date: Date;
    fMember: FamilyMember;
}
export class Task
{
    public id: number;
    public description: string;
    public date: Date;
    public fMember: FamilyMember;
    public fMemberId: number;
    constructor();

    constructor( obj?: ITask) ;


    constructor( obj?: any) {
        this.id = obj && obj.taskId || null;
        this.description = obj && obj.description || null;
        if (obj && obj.date)
        {
            this.date = new Date(obj.date);
        }
        this.fMember = new FamilyMember();
        this.fMember.nickname = obj && obj.nickname || null;
    }


}
