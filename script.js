
const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
// put the var outside of the function to use the array to search through
let superHero = [];
console.log(searchBar);
//everytime you search for a key get that input and use it to search the data
searchBar.addEventListener('keyup', (s) => {

    const stringSearch = s.target.value.toLowerCase()
    //call the filter on the array using map function 
    const filteredCharacters = superHero.filter((character) => {
        //return true if the character belongs in the filter
        return (
            //compare different param to filter search
        character.name.toLowerCase().includes(stringSearch) || 
        character.biography.fullName.toLowerCase().includes(stringSearch)
        )
    });
    displayCharacters(filteredCharacters)
});



const loadCharacters = async () => {
    try {
        const res = await fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json');
        superHero = await res.json();
        displayCharacters(superHero);
        //error
    } catch (err) {
        console.error(err);
    }
};

const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <tr>
            <td> <img src="${character.images.xs}"></img></td>
            <td>${character.name}</td>
            <td>${character.biography.fullName}</td>               
                <td div class="resStats"> 
                ${character.powerstats.speed}
            ${character.powerstats.strength}
            ${character.powerstats.durability}
            ${character.powerstats.power}
            ${character.powerstats.combat}
            ${character.powerstats.intelligence}
            </td> </div> 
            <td>${character.appearance.race}</td>
            <td>${character.appearance.gender}</td>
            <td>${character.appearance.height}</td>
            <td>${character.appearance.weight}</td>
            <td>${character.biography.placeOfBirth}</td>
            <td>${character.biography.alignment}</td>
        </tr>
        `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
};

loadCharacters();