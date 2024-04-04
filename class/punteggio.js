class Punteggio {
    constructor(squadraCasa, squadraOspite) {
        this.squadraCasa = squadraCasa;
        this.squadraOspite = squadraOspite;
        this.punteggioCasa = 0;
        this.punteggioOspite = 0;
        this.largRiquadro = 300;
        this.altRiquadro = 50
        this.posizioneX = 10;
        this.posizioneY = 10;
        this.finePartita = null
    }

    segnaGoalCasa() {
        this.punteggioCasa++;
    }

    segnaGoalOspite() {
        this.punteggioOspite++;
    }

    show() {
        this.posizioneX = 10;
        this.posizioneY = 10;
        // sfondo del riquadro
        fill(255);
        rect(this.posizioneX, this.posizioneY, this.largRiquadro, this.altRiquadro);

        // logo e nome della squadra di casa
        image(this.squadraCasa.logo, this.posizioneX, this.posizioneY, this.largRiquadro / 5, this.altRiquadro);
        textAlign(CENTER, CENTER);
        textSize(20);
        fill(0);
        text(this.squadraCasa.shortName, this.posizioneX + this.largRiquadro / 3.5, this.altRiquadro - 15);
        this.posizioneX = this.posizioneX + this.largRiquadro / 2
        // punteggio
        textAlign(CENTER, CENTER);
        textSize(25);
        text(this.punteggioCasa + " - " + this.punteggioOspite, this.posizioneX, this.posizioneY + this.altRiquadro / 2);
        this.posizioneX = this.posizioneX + this.largRiquadro / 10

        // logo e nome della squadra ospite
        textSize(20);
        image(this.squadraOspite.logo, this.posizioneX, this.posizioneY, this.largRiquadro / 5, this.altRiquadro);
        textAlign(CENTER, CENTER);
        text(this.squadraOspite.shortName, this.posizioneX + this.largRiquadro / 3.5, this.altRiquadro - 15);
    }

    calcoloPunteggio(contTiri, contatoreSquadraTiratrice, portiere, palla) {
        if (contTiri == 10) {
            canvas.remove()
            if (this.punteggioCasa > this.punteggioOspite) {
                this.finePartita = new FinePartita(this.squadraCasa)
            } else if (this.punteggioOspite > this.punteggioCasa) {
                this.finePartita = new FinePartita(this.squadraOspite)
            } else if (this.punteggioCasa == this.punteggioOspite) {
                this.finePartita = new FinePartita(null)
            }
        }

        if (contatoreSquadraTiratrice) {
            this.segnaGoalCasa()
        } else {
            this.segnaGoalOspite()
        }
    }
}

class FinePartita {
    constructor(x) {
        this.alt = 590
        this.larg = 1290
        this.vincitore = x;
        createCanvas(this.larg, this.alt)
    }
    show() {
        if (this.vincitore == null) {
            textAlign(CENTER, CENTER);
            textSize(70);
            fill(0);
            text("pareggio", this.larg / 2, this.alt / 2);
        } else {
            image(this.vincitore.player, 0, 0, this.larg, this.alt)
        }
    }
}