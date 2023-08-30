export class Pokemon {
      
        id!: number;
        name!:string;
        type!: string;
        type2!: string;
        sprite!: string;
        heigth!:number;
        weigth!:number;
        abilities!:any[];
        status!:any[];

        hasHiddenAbility(){
            return this.abilities.find(ab=> ab.is_hidden);
           }
        
        getHiddenAbility(){
            const ability=this.abilities.find(ab=>ab.is_hidden);
            return ability.ability.name;
        }
    
        getAbilities(){
            const abilities= this.abilities.filter(ab=>!ab.is_hidden);
            return abilities;
        }
getStat(nameStat:number){
    const statFound=this.status.find(s => s.stat.name === nameStat);
    return statFound.base_stat;
}

getHeightToMetres(){
    return this.heigth /10;
}


getweigthToKg(){
    return this.weigth / 10;
}


}
