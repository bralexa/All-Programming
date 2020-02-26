


export interface IFamilyMember {
    id: number;
    name: string;
    nickname: string;
    description: string;
}
export class FamilyMember
{


    public id: number;
    public name: string;
    public nickname: string;
    public description: string;
    constructor();

    constructor( obj?: IFamilyMember) ;


    constructor( obj?: any) {
        this.id = obj && obj.familyMemberId || null;
        this.name = obj && obj.name || null;
        this.nickname = obj && obj.nickname || null;
        this.description = obj && obj.description || null;

    }


}
