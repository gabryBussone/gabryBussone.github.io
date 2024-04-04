const alt = 800;
const larg = 1400;
let video;
let showVideo = true;
let game = null
let secondPage = false
let teamNames = ["atalanta", "bologna", "inter", "juventus", "milan", "roma"];
let immaginiSquadreLogo = [];
let immaginiSquadre = [];
let posizioniPortieri = ["as", "ac", "ad", "bs", "bc", "bd", "aspetta"];
let immaginiPortieri = [];
let imgPalla
let selectedTeam = null;
let sfondoCampo = null
let portiereCentrale = null
let sfondoPartita = null
let squadraCasa = null
let squadraOspite = null
let sceltaOspiti = false
let immagineIniziale = null
let partita = null
let casualePortiere = 6
let arrivoPalla = 7
let contatoreSquadraTiratrice = true
let contTiri = 0
let finePartita = null



function preload() {
    sfondoCampo = loadImage("img/sfondoCampo.png");
    sfondoPartita = loadImage("img/porta.png");
    imgPalla = loadImage('img/palla.png');
    immagineIniziale = loadImage('img/champions1.jpeg');
    immaginiSquadreLogo.push(loadImage("img/stemma/atalanta.png"));
    immaginiSquadreLogo.push(loadImage("img/stemma/bologna.png"));
    immaginiSquadreLogo.push(loadImage("img/stemma/inter.png"));
    immaginiSquadreLogo.push(loadImage("img/stemma/juventus.png"));
    immaginiSquadreLogo.push(loadImage("img/stemma/milan.png"));
    immaginiSquadreLogo.push(loadImage("img/stemma/roma.png"));
    immaginiSquadre.push(loadImage("img/atalanta.png"));
    immaginiSquadre.push(loadImage("img/bologna.png"));
    immaginiSquadre.push(loadImage("img/inter.png"));
    immaginiSquadre.push(loadImage("img/juventus.png"));
    immaginiSquadre.push(loadImage("img/milan.png"));
    immaginiSquadre.push(loadImage("img/roma.png"));

    for (let i = 0; i < posizioniPortieri.length; i++) {
        let imgPath = "img/portiere/" + posizioniPortieri[i] + ".png";
        let img = loadImage(imgPath);
        immaginiPortieri.push(img);

    }

}
function setup() {
    createCanvas(larg, alt);
}

function draw() {
    if (!secondPage) {
        background(immagineIniziale)
    } else if (partita == null) {
        background(0);
        game.show()
    } else if (contTiri >= 10) {
        background(immagineIniziale);
        partita.punteggio.finePartita.show()

    }
    else if (contTiri < 10) {
        background(255)
        if(contatoreSquadraTiratrice){
            partita.show(squadraCasa.player, sfondoPartita, immaginiPortieri[casualePortiere], imgPalla, posizioniPortieri[casualePortiere], arrivoPalla)
        }else{
            partita.show(squadraOspite.player, sfondoPartita, immaginiPortieri[casualePortiere], imgPalla, posizioniPortieri[casualePortiere], arrivoPalla)
        }

    }


}

function generaCasuale() {
    return Math.floor(Math.random() * posizioniPortieri.length)
}

function keyPressed() {
    if (!secondPage) {
        canvas.remove();
        game = new Game();
        game.start();
    } else if (partita != null) {
        casualePortiere = generaCasuale()
        if (keyCode == RIGHT_ARROW) {
        } else if (keyCode == 81) {  // "q"
            arrivoPalla = 1;
        } else if (keyCode == 87) {  // "w"
            arrivoPalla = 2;
        } else if (keyCode == 69) {  // "e"
            arrivoPalla = 3;
        } else if (keyCode == 65) {  // "a"
            arrivoPalla = 4;
        } else if (keyCode == 83) {  // "s"
            arrivoPalla = 5;
        } else if (keyCode == 68) {  // "d"
            arrivoPalla = 6;
        } else {
            arrivoPalla = 9
            posizionePortiere = "aspetta"
        }
        contatoreSquadraTiratrice = !contatoreSquadraTiratrice
        contTiri++

        if (finePartita == null) {
            partita.punteggio.calcoloPunteggio(contTiri, contatoreSquadraTiratrice, posizioniPortieri[casualePortiere], arrivoPalla)
        }
    }
}

function mousePressed() {
    if (game && secondPage && partita == null) {
        for (let i = 0; i < game.squadre.length; i++) {
            let squadra = game.squadre[i];
            let xStart = width / 5 + i % 3 * (3 / 2 * 180);
            let yStart = i >= 3 ? 2 * 180 : 0;
            let xEnd = xStart + 180 + 40;
            let yEnd = yStart + 180;

            if (mouseX > xStart && mouseX < xEnd && mouseY > yStart && mouseY < yEnd) {
                if (squadraCasa) {
                    squadraOspite = squadra;
                    canvas.remove();
                    createCanvas(larg, alt)

                    partita = new Partita(squadraCasa, squadraOspite)
                } else {
                    squadraCasa = squadra
                    sceltaOspiti = true
                }

            }
        }
    }
}


class Game {
    constructor() {
        this.squadre = [];
        this.x = 0;
        this.y = 0;
        this.size = 0;
        createCanvas(larg, alt)
    }

    start() {
        secondPage = true
        for (let i = 0; i < 6; i++) {
            let squadra = new Squadra(teamNames[i], immaginiSquadre[i], immaginiSquadreLogo[i]);
            this.squadre.push(squadra);
        }
    }

    show() {
        let colonne = 3;
        this.size = 180;
        image(sfondoCampo, 0, 0, width, height)
        for (let i = 0; i < this.squadre.length; i++) {
            let colonna = i % colonne;
            let riga = Math.floor(i / colonne);
            let x = colonna * (3 / 2 * this.size)
            let y = riga * this.size * 2;
            this.squadre[i].show(x, y, this.size);
        }
    }
}

class Squadra {
    constructor(name, img, imgLogo) {
        this.logo = imgLogo;
        this.player = img
        this.name = name
        this.shortName = name.substring(0, 3)
    }

    show(x, y, size) {

        image(this.player, x + width / 5, y + 10, size + 40, size);
        textAlign(CENTER, CENTER);
        textSize(80);
        fill(255);
        let string = ""
        if (!sceltaOspiti) {
            string = "scegli la squadra di casa"
        } else {
            string = "scegli la squadra ospite"
        }
        text(string, width / 2, height / 3);
    }
}