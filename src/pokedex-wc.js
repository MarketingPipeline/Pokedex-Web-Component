class Pokedex extends HTMLElement {
  constructor() {
    super();

    this.pokemonDetails = null;

    this.name = this.getAttribute("name");
    this.endpoint = `https://pokeapi.co/api/v2/pokemon/${this.name.toLowerCase()}`;
    this.getDetails = this.getDetails.bind(this);

    this.innerHTML = this.style +  `<div class="pokedex-wrapper">
     
        <img src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/08/s_2A9C470D38F43091CCD122E63014ED4503CAA7508FAF0C6806AE473C2B94B83E_1627522653545_loadinfo.gif?resize=200%2C200&ssl=1" alt="pokemon"  class="pokemon_image">
        <img src="https://github.com/manualdodev/pokedex/blob/main/images/pokedex.png?raw=true" alt="pokedex" class="pokedex">

        <h1 class="pokemon_data">
            <span class="pokemon_name">Loading</span> <br>
             
        </h1>

   

                
    </div>
    </div>`;
      this.pokemon_image = this.querySelector('.pokemon_image')
    this.pokemon_name = this.querySelector('.pokemon_name')
    
        
  }

  async connectedCallback() {
    let pokemon = await this.getDetails();
    this.pokemonDetails = pokemon;
    this.initShadowDom();
  }

  initShadowDom() {
    let shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = this.template;
  }

  get style() {
    return `
      <style>
       
.pokedex-wrapper{
   display: inline-block;
   margin-top: 5%;
   position: relative;

}

.pokedex{
   width: 100%;
   padding: 15px;
   max-width: 700px;
}

.pokemon_image{
   position: absolute;
   bottom: 51%;
   left: 35.0%;
   height: 18%;
   transform: translate(3%, 1%);
}

.pokemon_data{
   position: absolute;
   color: rgba(35, 37, 36, 0.856);
   top: 54%;
   right: 27%;
   font-size: 130%;
   
}

.pokemon_name{
   color: black;
   

   text-transform: capitalize;
}

.form{
   position: absolute;
   color: black;
   width: 30%;
   top: 65%;
   left: 13.3%;
   
}
.input_search{
   width: 100%;
   padding: 5%;
   outline: none;
   border: 2px solid black;
   border-radius: 5px;
   font-weight: 6px;
   box-shadow: -2px 2px 0 rgb(122, 120, 120);
   background-color: rgb(168, 167, 167);
   color: antiquewhite;
       
}

.buttons{
   position: absolute;
   right: 40%;
   bottom: 9.3%;
   display: flex;
   gap: 10px;
}

.botao{
   width: 50%;
   padding: 0.9%;
   outline: none;
   border: 2px solid black;
   border-radius: 5px;
   font-weight: 6px;
   color: rgb(219, 210, 210);
   background-color: rgb(15, 14, 14);
   box-shadow: -2px 2px 0 rgb(122, 120, 120);
}
.botao:active{
   background-color: red;
   box-shadow: inset -2px 2px 0 rgb(122, 120, 120);
   font-size: 0.8rem;
}

.info{
   position: absolute;
   background-color: rgb(19, 248, 19);
   width: 35%;
   height: 48.9%;
   right: 7%;
   top: 36%;
   text-align: center;
   font-family: Arial;
   color: azure;
   border: 1px solid white;
   
}
      </style>
    `;
  }

  get template() {
    let pokemon = this.pokemonDetails;

    if (!pokemon.name) {
      return this.style + this.cardError(pokemon);
    } else {
      return this.style + this.cardTemplate(pokemon);
    }
  }

  async getDetails() {
    return await fetch(this.endpoint, { mode: "cors" }).then(res => res.json());
  }

  cardError({ message }) {
    return `<div class="Card Card--error">Error: ${message}</div>`;
  }

  cardTemplate({name, id, owner, full_name, description }) {
    
    this.pokemon_image.src = `https://raw.githubusercontent.com/sashafirsov/pokeapi-sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`
    this.pokemon_name.innerText = name
 return this.innerHTML
   
  }
}

window.customElements.define("poke-dex", Pokedex);
