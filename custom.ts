// V1.0.14
// Hinweis: Die Fernsteuer-Befehle wurden entfernt, weil die hierfür nötige "FUNK"
// Bibliothek nicht kompatibel zur "Bluetooth" Bibliothek ist. 
// Dadurch wurde die Möglichkeit, per Bluetooth hochzuladen abgeschaltet.

let KInitialized = 0
let KLedState = 0
let KFunkAktiv = 0


enum KMotor {
    links,
    rechts,
    beide
}

enum KStop {
    //% block="auslaufend"
    Frei,
    //% block="bremsend"
    Bremsen
}

enum KnServo {
    //% block="Nr.1"
    Servo1,
    //% block="Nr.2"
    Servo2
}





enum KDir {
    vorwaerts = 0,
    rueckwaerts = 1
}

enum KState {
    aus,
    an
}



//% color="#FF0000" icon="\uf013" block="Calli:bot"
namespace callibot {

    function KInit() {
        if (KInitialized != 1) {
            KInitialized = 1;
            motorStop(KMotor.beide, KStop.Bremsen);
         
        }
    }

    function writeMotor(nr: KMotor, direction: KDir, speed: number) {
        let buffer = pins.createBuffer(3)
        KInit()
        buffer[1] = direction;
        buffer[2] = speed;
        switch (nr) {
            case KMotor.links:
                buffer[0] = 0x00;
                pins.i2cWriteBuffer(0x20, buffer);
                break;
            case KMotor.beide:
                buffer[0] = 0x00;
                pins.i2cWriteBuffer(0x20, buffer);
            case KMotor.rechts:
                buffer[0] = 0x02;
                pins.i2cWriteBuffer(0x20, buffer);
                break;
        }
    }

    //% speed.min=5 speed.max=100
    //% blockId=K_motor block="Schalte Motor |%KMotor| |%KDir| mit |%number| %"
    export function motor(nr: KMotor, direction: KDir, speed: number) {
        if (speed > 100) {
            speed = 100
        }
        if (speed < 0) {
            speed = 0
        }
        speed = speed * 255 / 100
        writeMotor(nr, direction, speed);
    }

    //="Stoppe Motor $nr"
    //% blockId=K_motorStop block="Stoppe Motor |%nr| |%mode"
    export function motorStop(nr: KMotor, mode: KStop) {
        if (mode == KStop.Frei) {
            writeMotor(nr, 0, 1);
        }
        else {
            writeMotor(nr, 0, 0);
        }
    }
}