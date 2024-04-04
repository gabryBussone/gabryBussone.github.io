class Partita {
    constructor(squadraCasa, squadraOspite) {
        // inizializzazione del punteggio della partita
        this.punteggio = new Punteggio(squadraCasa, squadraOspite);
        // posizione e dimensioni del portiere
        this.xPortiere = larg / 2 - 250;
        this.yPortiere = alt / 2 - 170;
        this.sizePortiere = 500;
        // posizione e dimensioni della palla
        this.xPalla = larg / 2 - 50;
        this.yPalla = alt - 100;
        this.sizePalla = 100;
        this.arrivoPalla = 0;
    }

    // metodo per mostrare la partita
    show(imgTiratore, imgSfondo, imgPortiere, imgPalla, posizionePortiere, arrivoPalla) {
        // aggiornamento della posizione della palla e del portiere
        this.posizionePortiere = posizionePortiere;
        this.arrivoPalla = arrivoPalla;
        this.chosingKeeperAssets();
        this.chosingBallAssets();
        // mostra lo sfondo e gli elementi della partita
        background(255);
        image(imgSfondo, 0, 0, larg, alt);
        image(imgPortiere, this.xPortiere, this.yPortiere, this.sizePortiere, this.sizePortiere);
        image(imgPalla, this.xPalla, this.yPalla, this.sizePalla + 50, this.sizePalla);
        image(imgTiratore, larg - 250, alt - 200, 250, 200);       
        // mostra il punteggio
        this.punteggio.show();
    }

    // metodo per impostare la posizione e le dimensioni della palla
    chosingBallAssets() {
        switch (this.arrivoPalla) {
            case "7":
                this.xPalla = larg / 2 - 50;
                this.yPalla = alt - 100;
                break;
            case 1:
                this.xPalla = 120;
                this.yPalla = 250;
                break;
            case 2:
                this.xPalla = 630;
                this.yPalla = 250;
                break;
            case 3:
                this.xPalla = 1100;
                this.yPalla = 250;
                break;
            case 4:
                this.xPalla = 170;
                this.yPalla = 450;
                break;
            case 5:
                this.xPalla = 630;
                this.yPalla = 450;
                break;
            case 6:
                this.xPalla = larg / 1.3;
                this.yPalla = alt / 2;
                break;
            case 9:
                this.xPalla = 50;
                this.yPalla = 50;
                break;
        }
    }

    // metodo per impostare la posizione e le dimensioni del portiere
    chosingKeeperAssets() {
        switch (this.posizionePortiere) {
            case "aspetta":
                this.xPortiere = larg / 2 - 250;
                this.yPortiere = alt / 2 - 170;
                this.sizePortiere = 500;
                break;
            case "as":
                this.xPortiere = 120;
                this.yPortiere = 250;
                this.sizePortiere = 500;
                break;
            case "ac":
                this.xPortiere = larg / 2 - 250;
                this.yPortiere = alt / 2 - 170;
                this.sizePortiere = 500;
                break;
            case "ad":
                this.xPortiere = larg / 2 - 250;
                this.yPortiere = alt / 2 - 170;
                this.sizePortiere = 500;
                break;
            case "bs":
                this.xPortiere = larg / 2 - 250;
                this.yPortiere = alt / 2 - 170;
                this.sizePortiere = 500;
                break;
            case "bc":
                this.xPortiere = larg / 2 - 250;
                this.yPortiere = alt / 2 - 170;
                this.sizePortiere = 500;
                break;
            case "bd":
                this.xPortiere = larg / 2 - 250;
                this.yPortiere = alt / 2 - 170;
                this.sizePortiere = 500;
                break;
        }
    }
}
