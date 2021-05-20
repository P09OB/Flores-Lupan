const bouquetSunflower = document.querySelector('.sunflower');
const bouquetAstromelia = document.querySelector('.astromelia');
const bouquetMargaritas = document.querySelector('.margaritas');
const bouquetStatis = document.querySelector('.statis');
const interaction = document.querySelector('.interaction__bouquet');
let selectStatis, selectMargaritas, selectSunflower, selectAstromelia;


bouquetStatis.addEventListener('click', () => {

    selectStatis = true;
    selectMargaritas = false;

    if (selectSunflower === true && selectStatis === true) {

        interaction.style.backgroundImage = "url('./imag/girasolEstatis.jpg')";
    } else {

        interaction.style.backgroundImage = "url('./imag/estatis.jpg')";
    }
    if (selectAstromelia === true && selectStatis === true) {
        interaction.style.backgroundImage = "url('./imag/atromeliasEstatis.jpg')";
    }

    bouquetStatis.style.border = "2px solid #003548";
    bouquetMargaritas.style.border = "1px solid #CCCCCC";



});

bouquetSunflower.addEventListener('click', () => {

    selectSunflower = true;
    selectAstromelia = false;

    if (selectSunflower === true && selectStatis === true) {
        interaction.style.backgroundImage = "url('./imag/girasolEstatis.jpg')";
    } else {

        interaction.style.backgroundImage = "url('./imag/girasol.jpg')";
    }

    if (selectMargaritas === true && selectSunflower === true) {
        interaction.style.backgroundImage = "url('./imag/girasolMargaritas.jpg')";
    }

    bouquetAstromelia.style.border = "1px solid #CCCCCC";
    bouquetSunflower.style.border = "2px solid #003548";


});

bouquetMargaritas.addEventListener('click', () => {

    selectMargaritas = true;
    selectStatis = false;

    if (selectMargaritas === true && selectSunflower === true) {
        interaction.style.backgroundImage = "url('./imag/girasolMargaritas.jpg')";

    } else{
        interaction.style.backgroundImage = "url('./imag/margaritas.jpg')";

    } if(selectMargaritas === true && selectAstromelia === true){
        interaction.style.backgroundImage = "url('./imag/astromeliasMargaritas.jpg')";
    }

    bouquetMargaritas.style.border = "2px solid #003548";
    bouquetStatis.style.border = "1px solid #CCCCCC";

});

bouquetAstromelia.addEventListener('click', () => {

    selectSunflower = false;
    selectAstromelia = true;

    if (selectAstromelia === true && selectMargaritas === true) {
        interaction.style.backgroundImage = "url('./imag/astromeliasMargaritas.jpg')";
    } else{
        interaction.style.backgroundImage = "url('./imag/astromelias.jpg')";

    }

    if(selectAstromelia === true && selectStatis === true){

        interaction.style.backgroundImage = "url('./imag/atromeliasEstatis.jpg')";        
    }
    bouquetSunflower.style.border = "1px solid #CCCCCC";
    bouquetAstromelia.style.border = "2px solid #003548";

});

var flkty = new Flickity('.main-gallery', {
    // options
    cellAlign: 'left',
    contain: true
});



