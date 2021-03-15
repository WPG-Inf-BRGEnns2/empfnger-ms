input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
})
radio.onReceivedNumber(function (receivedNumber) {
    vr = Math.map(receivedNumber, -45, 45, 383, 1023)
    vl = Math.map(-1 * receivedNumber, -45, 45, 383, 1023)
})
function schneller () {
    vor()
    vr += 128
    vl += 128
}
function vor () {
    pins.digitalWritePin(DigitalPin.P0, 1)
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P8, 0)
    pins.digitalWritePin(DigitalPin.P12, 1)
}
input.onButtonPressed(Button.A, function () {
    basic.showArrow(ArrowNames.North)
})
function stopp () {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.digitalWritePin(DigitalPin.P12, 1)
}
function zurück () {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 1)
    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.digitalWritePin(DigitalPin.P12, 0)
}
input.onButtonPressed(Button.AB, function () {
    basic.showArrow(ArrowNames.South)
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "schneller") {
        basic.showArrow(ArrowNames.North)
        schneller()
    } else if (receivedString == "langsamer") {
        basic.showArrow(ArrowNames.North)
        langsamer()
    } else if (receivedString == "stopp") {
        stopp()
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
    } else if (receivedString == "zurück") {
        vr = 703
        vl = 703
        zurück()
        basic.showArrow(ArrowNames.South)
    }
})
input.onButtonPressed(Button.B, function () {
    basic.showArrow(ArrowNames.North)
})
function langsamer () {
    vor()
    vr += -128
    vl += -128
}
let vl = 0
let vr = 0
basic.showLeds(`
    . . . . .
    . . . . .
    . . # . .
    . . . . .
    . . . . .
    `)
vr = 703
vl = 703
radio.setGroup(33)
basic.forever(function () {
    vr = Math.constrain(vr, 383, 1023)
    vl = Math.constrain(vl, 383, 1023)
    pins.analogWritePin(AnalogPin.P14, vr)
    pins.analogWritePin(AnalogPin.P13, vl)
})
