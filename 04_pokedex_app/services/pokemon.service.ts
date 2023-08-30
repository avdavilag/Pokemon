import { Injectable } from '@angular/core';
import { Http } from '@capacitor-community/http';
import { error } from 'console';
import { Pokemon } from 'src/app/models/pokemon';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private _nextUrl!: string;


  
constructor() {
  this.nextUrl='https://pokeapi.co/api/v2/pokemon/?offset=08limit=20';
 }

public get nextUrl(): string {
  return this._nextUrl;
}
public set nextUrl(value: string) {
  this._nextUrl = value;
}

getPokemons(){
  const url =this.nextUrl;
  if(url){

    const options={
    url:url,
    headers:{},
    params:{}
    }
    return Http.get(options).then(async (response)=>{
      let prokemons:Pokemon [] = []
      console.log(response);

      if(response.data){
        const result=response.data.results;
        this._nextUrl=response.data.next;

        for (let index = 0; index < result.length; index++) {
          const pokemon = result[index];
          const urlPokemon=pokemon.url;
          const options={
            url:urlPokemon,
            headers:{},
            params:{}
          };
          await Http.get(options).then(pok => {
            const pokData=pok.data;
             console.log(pokData);
             const pokObj= new Pokemon();
             pokObj.id=pokData.order;
             pokObj.name=pokData.name;
             pokObj.type=pokData.types[0].type.name;
             if(pokData.types[1]){
             pokObj.type2=pokData.types[1].type.name;
            }
            pokObj.sprite=pokData.sprites.front_default;
            pokObj.weigth=pokData.weigth;
            pokObj.heigth=pokData.heigth;
            pokObj.status=pokData.status;
            pokObj.abilities=pokData.abilities;
            prokemons.push(pokObj);

          });         
        }
       return prokemons;

      }

    }).catch(error=>console.error(error));

  }
  return null;
}


}
