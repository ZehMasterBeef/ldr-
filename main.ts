function calc () {
    sens = multi / 1023 + 0.75
    median = Max - Min
    cutOff = median * sens
}
function clampMulti () {
    if (multi <= 0) {
        multi = 1
    } else if (multi > 1023) {
        multi = 1023
    }
}
input.onButtonPressed(Button.A, function () {
    if (OnOff == 0) {
        OnOff = 1
    } else {
        OnOff = 0
    }
})
let light2 = 0
let OnOff = 0
let cutOff = 0
let median = 0
let multi = 0
let Min = 0
let Max = 0
let sens = 0
sens = 1
Max = 710
Min = 200
basic.forever(function () {
    if (OnOff == 1) {
        multi = pins.analogReadPin(AnalogReadWritePin.P2)
        light2 = pins.analogReadPin(AnalogReadWritePin.P1)
        clampMulti()
        calc()
        serial.writeValue("light", light2)
        serial.writeValue("cutOff", cutOff)
        serial.writeValue("sens", sens)
        basic.pause(100)
        if (light2 > cutOff) {
            pins.digitalWritePin(DigitalPin.P0, 1)
            pins.servoWritePin(AnalogPin.P3, 180)
        } else {
            pins.digitalWritePin(DigitalPin.P0, 0)
            pins.servoWritePin(AnalogPin.P3, 0)
        }
    }
})
